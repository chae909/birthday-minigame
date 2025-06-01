import React from 'react';
import styles from '../styles/ProgressBar.module.css';

const ProgressBar = ({ progress }) => {
    return (
        <div className={styles.progressBarContainer}>
            <div
                className={styles.progressBarFill}
                style={{ width: `${progress}%` }}
            ></div>
            <span className={styles.progressText}>{Math.floor(progress)}%</span>
        </div>
    );
};

export default ProgressBar;