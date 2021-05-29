import styles from "./LoadMore.module.scss";

export interface LoadMoreProps {
  loading: boolean;
}

const LoadMore: React.FC<LoadMoreProps> = ({ loading }) => (
  <div className={styles.loadMore}>
    <button className={loading ? "active" : undefined}>
      <span className={styles.icon} />
      <span className={styles.text}>Load more</span>
    </button>
  </div>
);

export default LoadMore;
