import styles from "../styles/Header.module.css";
import bgMobile from "../assets/suggestions/mobile/background-header.png";
import hamburgerLogo from "../assets/shared/mobile/icon-hamburger.svg";

const Header = (props) => {
  return (
    <div
      style={{ backgroundImage: `url("${bgMobile}")` }}
      className={styles.container}
    >
      <div>
        <h1 className={styles.title}>Product Feedback App</h1>
        <p className={styles.subtitle}>Feedback Board</p>
      </div>
      <img src={hamburgerLogo} alt="Hamburger" className={styles.icon} />
    </div>
  );
};

export default Header;
