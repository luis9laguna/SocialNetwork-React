import styles from './LayoutSearch.module.css'
import { Outlet } from 'react-router-dom'
import { DynamicFeed, Group, Wysiwyg } from '@mui/icons-material'

const LayoutSearch = () => {
    return (
        <div className={styles.containerLayout}>
            <div>
                <h1>Search Result of "ASDAD"</h1>
                <div className={styles.filterContainer}>
                    <h2>Filters</h2>
                    <ul>
                        <li><DynamicFeed /> All</li>
                        <li><Group /> Users</li>
                        <li><Wysiwyg /> Posts</li>
                    </ul>
                </div>
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default LayoutSearch