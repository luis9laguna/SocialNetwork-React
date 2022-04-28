import { Bookmark, Search } from '@mui/icons-material'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import BounceLoader from "react-spinners/BounceLoader";
import { ToastContainer } from 'react-toastify';
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { Chat } from '@mui/icons-material';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const { isLoggedIn, isLoading, logOut, userImage, userName } = useAuth()

    const [openNav, setOpenNav] = useState(false)

    const navigate = useNavigate()

    const searchForm = (e) => {
        e.preventDefault()
        const searchValue = e.target.search.value
        navigate('/search/all/searchValue')
    }

    if (isLoading) return (
        <div className={styles.containerLoading}>
            <BounceLoader loading={isLoading} size={250} />
        </div>)
    return (
        <>
            {isLoggedIn ?
                <>
                    <header className={styles.headerContainer} >
                        <span>logo</span>
                        <form className={styles.searchContainer} onSubmit={searchForm}>
                            <input type='text' name="search" placeholder="Search" />
                            <button><Search /></button>
                        </form>
                        <div className={styles.links}>
                            <Link to='/#'><Bookmark /></Link>
                            <Link to='/#'><Chat /></Link>
                        </div>
                        <div onClick={() => setOpenNav(prev => !prev)} className={`${styles.profileContainer} ${openNav ? styles.open : ''}`}>
                            <div className={styles.imageNameContainer}>
                                <img alt="profile" src={userImage} />
                                <span>{userName}</span>
                            </div>
                            <div className={styles.dropDown}>
                                <Link to="/profile">Profile</Link>
                                <button onClick={() => logOut()}>LogOut</button>
                            </div>
                        </div>
                    </header >
                    <main>
                        <Outlet />
                    </main>
                    <ToastContainer />
                </>
                : <Navigate to='/login' />}
        </>
    )
}

export default Header