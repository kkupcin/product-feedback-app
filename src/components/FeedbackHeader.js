import styles from "../styles/FeedbackHeader.module.css"
import Button from "./Button";

const FeedbackHeader = () => {
    return <div className={styles.container}>
        <div className={styles.textContainer}>
            <p>Sort by:</p>
            <h4>Most Upvotes</h4>
        </div>
        <Button color="#ad1fea" title="Add Feedback"></Button>
    </div>
};

export default FeedbackHeader;
