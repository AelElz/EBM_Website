'use client'

import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState, type ComponentProps, type FormEvent, type KeyboardEvent } from 'react'

import { Button } from '@/components/ui/button'
import { prepareAuthRequest, type AuthErrors, type AuthField, type AuthMode, type AuthValues } from '@/features/auth-test/contract'
import { previewAuthRequest, type PreviewReceipt } from '@/features/auth-test/preview'

import styles from './test-access.module.css'

const initialValues: AuthValues = { firstName: '', lastName: '', campus: '', email: '', password: '' }
const example: AuthValues = { firstName: 'Samira', lastName: 'Exemple', campus: 'casablanca', email: 'parent.test@example.com', password: 'EBM-essai-2026!' }

function Field({ label, error, ...input }: ComponentProps<'input'> & { label: string; error?: string }) {
  return <div className={styles.field}>
    <label htmlFor={input.id}>{label}</label>
    <input {...input} aria-invalid={error ? true : undefined} aria-describedby={error ? `${input.id}-error` : input['aria-describedby']} />
    {error && <p id={`${input.id}-error`} className={styles.error}>{error}</p>}
  </div>
}

export function TestAccessForm() {
  const [ready, setReady] = useState(false)
  const [mode, setMode] = useState<AuthMode>('login')
  const [values, setValues] = useState<AuthValues>(initialValues)
  const [errors, setErrors] = useState<AuthErrors>({})
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [receipt, setReceipt] = useState<PreviewReceipt | null>(null)
  const [systemError, setSystemError] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => setReady(true), [])
  useEffect(() => { if (receipt) resultRef.current?.focus() }, [receipt])

  function changeMode(next: AuthMode) {
    setMode(next)
    setValues(previous => ({ ...previous, password: '' }))
    setVisiblePassword(false)
    setErrors({})
    setReceipt(null)
    setSystemError('')
  }

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index
    changeMode(next === 0 ? 'login' : 'register')
    tabs.current[next]?.focus()
  }

  function update(field: AuthField, value: string) {
    setValues(previous => ({ ...previous, [field]: value }))
    setErrors(previous => ({ ...previous, [field]: undefined }))
    setReceipt(null)
    setSystemError('')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReceipt(null)
    setSystemError('')
    const prepared = prepareAuthRequest(mode, values)
    if (!prepared.ok) {
      setErrors(prepared.errors)
      const first = Object.keys(prepared.errors)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setErrors({})
    setPending(true)
    try {
      const result = await previewAuthRequest(prepared.request)
      setValues(previous => ({ ...previous, password: '' }))
      setVisiblePassword(false)
      setReceipt(result)
    } catch {
      setSystemError('Le test n’a pas pu aboutir. Réessayez le formulaire.')
    } finally { setPending(false) }
  }

  return <div className={styles.access}>
    <div role="tablist" aria-label="Choisir le formulaire" className={styles.tabs}>
      {(['login', 'register'] as const).map((value, index) => <button key={value} type="button" role="tab" id={`access-tab-${value}`} aria-controls="access-panel" aria-selected={mode === value} tabIndex={mode === value ? 0 : -1} disabled={!ready || pending} ref={node => { tabs.current[index] = node }} onClick={() => changeMode(value)} onKeyDown={event => moveTab(event, index)}>{value === 'login' ? 'Connexion' : 'Créer un compte'}</button>)}
    </div>
    <div id="access-panel" role="tabpanel" aria-labelledby={`access-tab-${mode}`}>
      <form ref={formRef} noValidate method="post" action="/connexion-test" onSubmit={submit} aria-busy={pending}>
        <fieldset disabled={!ready || pending} className={styles.fields}>
          <legend className="sr-only">{mode === 'login' ? 'Tester le formulaire de connexion' : 'Tester le formulaire de création de compte'}</legend>
          {mode === 'register' && <>
            <div className={styles.names}>
              <Field id="access-first-name" name="firstName" label="Prénom" autoComplete="given-name" maxLength={100} value={values.firstName} onChange={event => update('firstName', event.target.value)} error={errors.firstName} required />
              <Field id="access-last-name" name="lastName" label="Nom" autoComplete="family-name" maxLength={100} value={values.lastName} onChange={event => update('lastName', event.target.value)} error={errors.lastName} required />
            </div>
            <div className={styles.field}><label htmlFor="access-campus">Campus</label><select id="access-campus" name="campus" autoComplete="off" value={values.campus} onChange={event => update('campus', event.target.value)} aria-invalid={errors.campus ? true : undefined} aria-describedby={errors.campus ? 'access-campus-error' : undefined} required><option value="">Choisir un campus</option><option value="casablanca">Casablanca · Dar Bouazza</option><option value="rabat">Rabat · Hay Riad</option></select>{errors.campus && <p id="access-campus-error" className={styles.error}>{errors.campus}</p>}</div>
          </>}
          <Field id="access-email" name="email" type="email" label="Adresse e-mail" autoComplete="username" autoCapitalize="none" spellCheck={false} inputMode="email" maxLength={254} placeholder="parent.test@example.com" value={values.email} onChange={event => update('email', event.target.value)} error={errors.email} required />
          <div className={styles.field}>
            <label htmlFor="access-password">Mot de passe fictif</label>
            <div className={styles.password}><input id="access-password" name="password" type={visiblePassword ? 'text' : 'password'} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} maxLength={256} value={values.password} onChange={event => update('password', event.target.value)} aria-invalid={errors.password ? true : undefined} aria-describedby={errors.password ? 'access-password-error' : mode === 'register' ? 'access-password-help' : undefined} required /><button type="button" onClick={() => setVisiblePassword(previous => !previous)} aria-label={visiblePassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} aria-pressed={visiblePassword}>{visiblePassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}</button></div>
            {errors.password ? <p id="access-password-error" className={styles.error}>{errors.password}</p> : mode === 'register' ? <p id="access-password-help" className={styles.hint}>15 caractères minimum pour ce test.</p> : null}
          </div>
          <Button type="submit" size="lg" className={styles.submit}>{pending ? 'Vérification…' : mode === 'login' ? 'Tester la connexion' : 'Tester la création du compte'}<ArrowRight size={18} aria-hidden="true" /></Button>
          <button type="button" className={styles.example} onClick={() => { setValues(example); setErrors({}); setReceipt(null); setSystemError(''); setVisiblePassword(false) }}>Utiliser un exemple fictif</button>
        </fieldset>
        {systemError && <p role="alert" className={styles.error}>{systemError}</p>}
      </form>
      {receipt && <div ref={resultRef} tabIndex={-1} role="status" className={styles.result}><h2>Le formulaire est prêt.</h2><p>{receipt.intent === 'register' ? 'Les informations de création de compte' : 'Les informations de connexion'} pour <strong>{receipt.email}</strong> ont été vérifiées dans ce prototype.</p><p>Aucune donnée n’a été envoyée. Aucun compte ni session n’a été créé.</p></div>}
    </div>
    <noscript><p className={styles.testNotice}>Activez JavaScript pour essayer ce prototype. Le lien vers votre vrai compte Eduka reste disponible ci-dessous.</p></noscript>
  </div>
}
