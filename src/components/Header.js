import styles from "../styles/Header.module.css";
import hamburgerLogo from "../assets/shared/mobile/icon-hamburger.svg";
import closeLogo from "../assets/shared/mobile/icon-close.svg";

const Header = (props) => {
  // Set if sidebar is shown when clicking on the hamburger button
  const hamburgerHandler = () => {
    props.onShowSidebar(!props.showCloseIcon);
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Product Feedback App</h1>
        <p className={styles.subtitle}>Feedback Board</p>
      </div>
      {props.showCloseIcon ? (
        <button onClick={hamburgerHandler} id="close" className={styles.hamBtn}>
          <img src={closeLogo} alt="Close" className={styles.icon} />
        </button>
      ) : (
        <button
          onClick={hamburgerHandler}
          id="hamburger"
          className={styles.hamBtn}
        >
          <img
            src={hamburgerLogo}
            alt="Hamburger button"
            className={styles.icon}
          />
        </button>
      )}
    </div>
  );
};

export default Header;
