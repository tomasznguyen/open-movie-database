import styles from "./ErrorMessage.module.scss";

export interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className={styles.error}>
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
