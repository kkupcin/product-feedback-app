import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Wip.module.css";

const Wip = (props) => {
  const [closeWip, setCloseWip] = useState(false);

  // Close the work in progress notice
  const onCloseWip = () => {
    setCloseWip(true);
  };

  return (
    <React.Fragment>
      {!closeWip && (
        <aside className={styles.wipBox} onClick={onCloseWip}>
          <div className={styles.wip}>
            <button className={styles.close}>X</button>
            <h2>You have been logged in to a Demo account!</h2>
            <p>
              Editing of data is disabled. <br />
              To log in to a different account, please go <br />
              <Link to="/login" className={styles.styledLink}>
                here
              </Link>
            </p>
          </div>
        </aside>
      )}
    </React.Fragment>
  );
};

export default Wip;
