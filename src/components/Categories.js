import styles from "../styles/Categories.module.css";

const Categories = (props) => {
  return (
    <div
      className={`${styles.container} ${props.sidebar ? styles.sidebar : ""}`}
    >
      <ul className={styles.list}>
        <li className={`${styles.category} ${styles.selected}`}>All</li>
        <li className={styles.category}>UI</li>
        <li className={styles.category}>UX</li>
        <li className={styles.category}>Enhancement</li>
        <li className={styles.category}>Bug</li>
        <li className={styles.category}>Feature</li>
      </ul>
    </div>
  );
};

export default Categories;
