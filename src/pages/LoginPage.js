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

  // Log user in
  const loginHandler = async (e) => {
    e.preventDefault();
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
      let token = await Parse.Cloud.run("login", {
        username: loginDetails.username,
        password: loginDetails.password,
      });

      await Parse.User.become(token);

      setMessage("Login successful!");
      navigate("/");
    } catch (err) {
      setMessage(`Login failed: ${err}`);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <section className={styles.container}>
        <div className={styles.accent}>
          <h1>Log In</h1>
        </div>
        <form className={styles.infoContainer} aria-describedby="err-message">
          <div className={styles.inputBox}>
            <label className={styles.inputTitle} for="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className={styles.input}
              value={loginDetails.username}
              onChange={onUsernameChange}
            ></input>
          </div>
          <div className={styles.inputBox}>
            <label className={styles.inputTitle} for="password">
              Password
            </label>
            <input
              id="password"
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
          {message && (
            <div className={styles.message} id="err-message">
              {message}
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
