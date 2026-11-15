import styles from "./Message.module.css";
import propTypes from "prop-types";

Message.propTypes = {
  message: propTypes.string.isRequired,
};

function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
