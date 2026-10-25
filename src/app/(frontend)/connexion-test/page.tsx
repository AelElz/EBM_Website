import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { TestAccessForm } from '@/components/auth-test/test-access-form'
import { AUTH_TEST_PATH } from '@/features/auth-test/contract'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/metadata'

import styles from '@/components/auth-test/test-access.module.css'

export const metadata = pageMetadata({ title: 'Connexion EBM — test', description: 'Prototype du futur espace EBM. Essai du formulaire avec des informations fictives, sans connexion à Eduka.', path: AUTH_TEST_PATH, index: false })

export default function TestLoginPage() {
  return <section className={styles.layout} aria-labelledby="test-access-title">
    <div className={styles.formSide}>
      <div className={styles.formFrame}>
        <Link href="/espace-eduka" className={styles.back}><ArrowLeft size={17} aria-hidden="true" />Retour à l’Espace Eduka</Link>
        <h1 id="test-access-title" className={styles.title}>Votre espace EBM.</h1>
        <p className={styles.intro}>Un premier aperçu de votre futur espace famille.</p>
        <p className={styles.testNotice}><strong>Version test.</strong> Utilisez des informations fictives, différentes de votre compte Eduka.</p>
        <TestAccessForm />
        <p className={styles.official}>Vous souhaitez accéder à votre vrai compte ? <a href={site.eduka.loginUrl}>Ouvrir Eduka<ArrowUpRight aria-hidden="true" size={15} /></a></p>
      </div>
    </div>
    <figure className={styles.campus}>
      <div className={styles.photo}><Image src="/images/hero-casablanca-entree.jpg" alt="L’entrée du campus de Casablanca, à Dar Bouazza." fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" preload /></div>
      <figcaption><span>Écoles Belges au Maroc</span><span>Casablanca · Dar Bouazza</span></figcaption>
    </figure>
  </section>
}
