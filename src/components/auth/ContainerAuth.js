import styles from './ContainerAuth.module.css'
import FormLogin from './FormLogin'

const ContainerAuth = () => {
  return (
    <div className={styles.containerAuth}>
      <FormLogin />
    </div>
  )
}

export default ContainerAuth