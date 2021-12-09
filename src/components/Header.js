import styles from "../styles/Header.module.css";
import hamburgerLogo from "../assets/shared/mobile/icon-hamburger.svg";

const Header = (props) => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Product Feedback App</h1>
        <p className={styles.subtitle}>Feedback Board</p>
      </div>
      {props.mobileView && (
        <img src={hamburgerLogo} alt="Hamburger" className={styles.icon} />
      )}
    </div>
  );
};

export default Header;
