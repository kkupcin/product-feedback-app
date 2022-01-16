import ButtonPrimary from "../components/ButtonPrimary";
import { useState } from "react";
import styles from "../styles/LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const loginHandler = async () => {
    await login();
  };

  const onUsernameChange = (e) => {
    setLoginDetails((prevState) => {
      let prevStateCopy = { ...prevState };
      prevStateCopy.username = e.target.value;
      return prevStateCopy;
    });
  };

  const onPasswordChange = (e) => {
    setLoginDetails((prevState) => {
      let prevStateCopy = { ...prevState };
      prevStateCopy.password = e.target.value;
      return prevStateCopy;
    });
  };

  const login = async () => {
    try {
      await Parse.User.logIn(loginDetails.username, loginDetails.password);
      setMessage("Login successful!");
      navigate("/");
    } catch (err) {
      setMessage(`Login failed: ${err}`);
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
              value={loginDetails.username}
              onChange={onUsernameChange}
            ></input>
          </div>
          <div className={styles.inputBox}>
            <label className={styles.inputTitle}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={loginDetails.password}
              onChange={onPasswordChange}
            ></input>
          </div>
          <ButtonPrimary
            color="purple"
            onBtnClick={loginHandler}
            title="Log In"
          />
          {message && <div className={styles.message}>{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
