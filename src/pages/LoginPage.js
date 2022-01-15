import ButtonPrimary from "../components/ButtonPrimary";
import { useState } from "react";
import styles from "../styles/LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

const LoginPage = () => {
  const [enteredLoginDetails, setEnteredLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [showMessage, setShowMessage] = useState({
    show: false,
    message: "",
  });
  let navigate = useNavigate();

  const loginHandler = async () => {
    await login();
  };

  const onEnteredUsername = (e) => {
    setEnteredLoginDetails((prevState) => {
      let prevStateCopy = { ...prevState };
      prevStateCopy.username = e.target.value;
      return prevStateCopy;
    });
  };

  const onEnteredPassword = (e) => {
    setEnteredLoginDetails((prevState) => {
      let prevStateCopy = { ...prevState };
      prevStateCopy.password = e.target.value;
      return prevStateCopy;
    });
  };

  const login = async () => {
    try {
      await Parse.User.logIn(
        enteredLoginDetails.username,
        enteredLoginDetails.password
      );
      setShowMessage({
        show: true,
        message: "Login successful!",
      });
      navigate("/");
    } catch (err) {
      setShowMessage({
        show: true,
        message: `Login failed: ${err}`,
      });
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.accent}>
          <h1>Log In</h1>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.inputBox}>
            <label className={styles.inputTitle}>Username</label>
            <input
              type="text"
              className={styles.input}
              value={enteredLoginDetails.username}
              onChange={onEnteredUsername}
            ></input>
          </div>
          <div className={styles.inputBox}>
            <label className={styles.inputTitle}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={enteredLoginDetails.password}
              onChange={onEnteredPassword}
            ></input>
          </div>
          <ButtonPrimary
            color="purple"
            onBtnClick={loginHandler}
            title="Log In"
          />
          {showMessage.show && (
            <div className={styles.message}>{showMessage.message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
