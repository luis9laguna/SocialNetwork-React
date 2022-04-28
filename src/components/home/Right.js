import styles from './Right.module.css'
import leftImage from '../../public/img/leftImage.png'
import { useAuth } from '../../context/authContext'


const Right = () => {

    const { userImage } = useAuth()

    return (
        <div className={styles.rightContainer}>
            <div className={styles.rightContent}>
                <img src={leftImage} alt="info" />
                <div>
                    <h3>Friends</h3>
                    <ul className={styles.friendContainer}>
                        <li>
                            <img src={userImage} alt="profileFriend" />
                            <span>Pedro Catar</span>
                        </li>
                        <li>
                            <img src={userImage} alt="profileFriend" />
                            <span>Maria Laguna</span>
                        </li>
                        <li>
                            <img src={userImage} alt="profileFriend" />
                            <span>Belkis Rodriguez</span>
                        </li>
                        <li>
                            <img src={userImage} alt="profileFriend" />
                            <span>Juan Garcia</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Right