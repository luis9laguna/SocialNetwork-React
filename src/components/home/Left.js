import styles from './Left.module.css'

const Left = () => {
    return (
        <div className={styles.leftContainer}>
            <button>Luis Laguna</button>
            <button>Friends</button>
            <button>Saved</button>
        </div>
    )
}

export default Left