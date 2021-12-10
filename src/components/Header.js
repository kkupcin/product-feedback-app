import styles from "../styles/Header.module.css";
import hamburgerLogo from "../assets/shared/mobile/icon-hamburger.svg";
import closeLogo from "../assets/shared/mobile/icon-close.svg";

const Header = (props) => {
  const hamburgerHandler = () => {
    props.onShowSidebar(!props.showCloseIcon)
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Product Feedback App</h1>
        <p className={styles.subtitle}>Feedback Board</p>
      </div>
      {props.showCloseIcon ? (
        <img
          src={closeLogo}
          alt="Close"
          className={styles.icon}
          onClick={hamburgerHandler}
          id="close"
        />
      ) : (
        <img
          src={hamburgerLogo}
          alt="Hamburger"
          className={styles.icon}
          onClick={hamburgerHandler}
          id="hamburger"
        />
      )}
    </div>
  );
};

export default Header;
