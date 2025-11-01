import styles from "./styles/alert.module.css";

function Alert({message}: {message: string}) {
  return (
    <div className={styles.alert}>{message}</div>
  )
}

export default Alert;