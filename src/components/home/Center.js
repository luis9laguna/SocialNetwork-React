import styles from './Center.module.css'


const Center = () => {
    return (
        <div className={styles.centerContainer}>
            <div className={styles.inputContainer}>
                <div className={styles.imageText}>
                    <div>Image</div>
                    <input type='text' placeholder='What are you thinking right now?' />
                </div>
                <div className={styles.postOptions}>
                    <button>Photo</button>
                    <button>Post</button>
                </div>
            </div>
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