import { InsertPhoto } from '@mui/icons-material'
import { useAuth } from '../../context/authContext'
import styles from './Center.module.css'
import PostForm from './PostForm'


const Center = () => {

    const { userImage } = useAuth()

    return (
        <div className={styles.centerContainer}>
            <PostForm userImage={userImage} />
            <div className={styles.postContainer}>
                <div>Profile</div>
                <div>Description</div>
                <div>PHOTO</div>
                <div className={styles.postOptions}>
                    <button>Like</button>
                    <button>Comment</button>
                </div>
            </div>
        </div>
    )
}

export default Center