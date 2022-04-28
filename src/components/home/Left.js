import { AccountCircle, Bookmark, Group } from '@mui/icons-material'
import styles from './Left.module.css'

const Left = () => {
    return (
        <div className={styles.leftContainer}>
            <button><AccountCircle /> Luis Laguna</button>
            <button><Group /> Friends</button>
            <button><Bookmark /> Saved Posts</button>
        </div>
    )
}

export default Left