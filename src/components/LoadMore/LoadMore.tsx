import styles from "./LoadMore.module.scss";

export interface LoadMoreProps {
  loading: boolean;
  onClick: () => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({ loading, onClick }) => (
  <div className={styles.loadMore} onClick={onClick}>
    <button className={loading ? styles.active : undefined}>
      <span className={styles.icon} />
      <span className={styles.text}>Load more</span>
    </button>
  </div>
);

export default LoadMore;
