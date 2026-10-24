import Link from 'next/link'
import css from './ProfilePage.module.css'
import { getMe } from '@/lib/api/serverApi'
import { Metadata } from 'next'

export const metadata: Metadata ={
  title: 'Profile',
  description: 'Own Profile',
  openGraph : {
    title: 'Profile', 
    description: 'Here you can change username',
    url: 'https://notehub.com/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 300,
        height: 300,
      alt: 'NoteHub',      
    }
    ]
  }
}

const Profile = async() => {
    const user = await getMe()
  return (
    <>
    <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
       <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <img
        src={user.data.avatar}
        alt={user.data.avatar}
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user.data.username}
      </p>
      <p>
        Email: {user.data.email}
      </p>
    </div>
  </div>
</main>
</>
  )
}

export default Profile