/** Browser-safe contract for a future Node.js service. No database credentials belong here. */
export const AUTH_TEST_PATH = '/connexion-test'
export const AUTH_ENDPOINTS = {
  login: '/api/v1/auth/login',
  register: '/api/v1/auth/register',
  session: '/api/v1/auth/session',
  logout: '/api/v1/auth/logout',
} as const

export type AuthMode = 'login' | 'register'
export type Campus = 'casablanca' | 'rabat'
export type AuthValues = { firstName: string; lastName: string; campus: string; email: string; password: string }
export type AuthField = keyof AuthValues
export type AuthErrors = Partial<Record<AuthField, string>>
export type LoginPayload = { email: string; password: string }
export type RegisterPayload = LoginPayload & { firstName: string; lastName: string; campus: Campus }
export type AuthRequest =
  | { method: 'POST'; path: typeof AUTH_ENDPOINTS.login; body: LoginPayload }
  | { method: 'POST'; path: typeof AUTH_ENDPOINTS.register; body: RegisterPayload }

/** UX validation only. The future Node.js API must validate every request again. */
export function prepareAuthRequest(mode: AuthMode, values: AuthValues): { ok: true; request: AuthRequest } | { ok: false; errors: AuthErrors } {
  const errors: AuthErrors = {}
  const email = values.email.trim().toLowerCase()
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Saisissez une adresse e-mail valide.'
  if (!values.password) errors.password = 'Saisissez un mot de passe fictif.'
  else if (Array.from(values.password).length > 128) errors.password = 'Utilisez 128 caractères maximum.'
  else if (mode === 'register' && Array.from(values.password).length < 15) errors.password = 'Utilisez au moins 15 caractères pour ce test.'

  if (mode === 'register') {
    if (!values.firstName.trim() || values.firstName.trim().length > 100) errors.firstName = 'Indiquez un prénom, de 1 à 100 caractères.'
    if (!values.lastName.trim() || values.lastName.trim().length > 100) errors.lastName = 'Indiquez un nom, de 1 à 100 caractères.'
    if (!['casablanca', 'rabat'].includes(values.campus)) errors.campus = 'Choisissez un campus.'
  }
  if (Object.keys(errors).length) return { ok: false, errors }
  if (mode === 'login') return { ok: true, request: { method: 'POST', path: AUTH_ENDPOINTS.login, body: { email, password: values.password } } }
  return { ok: true, request: { method: 'POST', path: AUTH_ENDPOINTS.register, body: { firstName: values.firstName.trim(), lastName: values.lastName.trim(), campus: values.campus as Campus, email, password: values.password } } }
}
