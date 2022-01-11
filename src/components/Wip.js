import React, { useState } from "react";
import styles from "../styles/Wip.module.css";

const Wip = () => {
  const [closeWip, setCloseWip] = useState(false);

  // Close the work in progress notice
  const onCloseWip = () => {
    setCloseWip(true);
  };

  return (
    <React.Fragment>
      {!closeWip && (
        <div className={styles.wipBox} onClick={onCloseWip}>
          <div className={styles.wip}>
            <h1 className={styles.close}>X</h1>
            <h3>This website is a work in progress!</h3>
            <p>Editing of data is disabled.</p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Wip;
