import Center from '../components/home/Center'
import Left from '../components/home/Left'
import Right from '../components/home/Right'
import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.indexContainer}>
            <Left />
            <Center />
            <Right />
        </div>
    )
}

export default Home