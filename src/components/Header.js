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
        <h1>Product Feedback App</h1>
        <p>Feedback Board</p>
      </div>
      <img src={hamburgerLogo} alt="Hamburger" />
    </div>
  );
};

export default Header;
