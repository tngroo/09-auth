'use client'
import { useAuthStore } from '@/lib/store/authStore'
import css from './EditProfilePage.module.css'
import Image from 'next/image'
import { updateMe } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Edit = () => {
    const router = useRouter()
    const setUser = useAuthStore((state)=> state.setUser)
    const user = useAuthStore((state)=> state.user)
    const [error, setError] = useState('')
    const  handleSubmit = async(formData: FormData) =>{
      setError('')
        const username = String(formData.get('username') ?? '')
    
    try{
        const updateUser = await updateMe( {username })
        setUser(updateUser)
        router.push('/profile')
    } catch (error){
        setError(`Error: ${error}. Failed save`)
    }
}
    const handleCancel = () => router.back()

  return (
   <>
   <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    {user?.avatar && (
      <Image src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    )}

    <form action={handleSubmit} className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username</label>
        <input id="username"
        defaultValue={user?.username}
        name='username'
          type="text"
          className={css.input}
        />
      </div>

      <p>Email: {user?.email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button onClick={handleCancel} type="button" className={css.cancelButton}>
          Cancel
        </button>
      </div>
      {error && <p className={css.error}>{error}</p>}
    </form>
  </div>
</main>

   </>
  )
}

export default Edit