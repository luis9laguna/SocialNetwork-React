import { Search } from '@mui/icons-material'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import styles from './Header.module.css'

const Header = () => {

    const { isLoggedIn } = useAuth()
    const loading = false
    console.log(isLoggedIn)

    if (loading) return 'asd'
    return (
        <>
            {isLoggedIn ?
                <>
                    <header header className={styles.headerContainer} >
                        <span>logo</span>
                        <form className={styles.searchContainer}>
                            <input type='text' />
                            <button><Search /></button>
                        </form>
                        <span>chat</span>
                        <span>Profile</span>
                    </header >
                    <main>
                        <Outlet />
                    </main>
                </>
                : <Navigate to='/login' />}
        </>
    )
}

export default Header