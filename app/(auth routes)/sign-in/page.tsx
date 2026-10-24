'use client'
import { useRouter } from 'next/navigation'
import css from './SignInPage.module.css'
import { useState } from 'react'
import { login } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'

const Authentification = () => {
    const router = useRouter()
      const [error, setError] = useState('')

      const setUser = useAuthStore((state)=>state.setUser)
      const isAuthenticated = useAuthStore((state)=>state.isAuthenticated)
      const user = useAuthStore((state)=>state.user)
      
      const handleSubmit = async (formData:FormData) =>{
        setError('')
        const values = {
          email: String(formData.get('email') ?? ''),
          password: String(formData.get('password') ?? '')
        }
        try {
          const user = await login(values)
          setUser(user)
          router.push('/profile')
        } catch (error) {
          setError('Registration failed')
        }
      }
  return (
    <>
    <main className={css.mainContent}>
 <form action={handleSubmit} className={css.form}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>

    <p className={css.error}>{error}</p>
  </form>
</main>

    </>
  )
}

export default Authentification