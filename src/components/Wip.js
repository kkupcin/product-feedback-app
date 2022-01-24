import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Wip.module.css";

const Wip = (props) => {
  const [closeWip, setCloseWip] = useState(false);

  let navigate = useNavigate();

  // Close the work in progress notice
  const onCloseWip = () => {
    setCloseWip(true);
  };

  // Navigate to the login page
  const navigationHandler = () => {
    navigate("/login");
  };

  return (
    <React.Fragment>
      {!closeWip && (
        <div className={styles.wipBox} onClick={onCloseWip}>
          <div className={styles.wip}>
            <h1 className={styles.close}>X</h1>
            <h3>You have been logged in to a Demo account!</h3>
            <p>
              Editing of data is disabled. <br />
              To log in to a different account, please go <br />
              <span onClick={navigationHandler} className={styles.styledLink}>
                here
              </span>
            </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Wip;
