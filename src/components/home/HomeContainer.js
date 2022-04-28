import Center from './Center'
import Left from './Left'
import Right from './Right'
import styles from './HomeContainer.module.css'
import { useAuth } from '../../context/authContext'

const HomeContainer = () => {

    const { userImage, userName } = useAuth()

    return (
        <div className={styles.indexContainer}>
            <Left userName={userName} />
            <Center userImage={userImage} userName={userName} />
            <Right />
        </div>
    )
}

export default HomeContainer