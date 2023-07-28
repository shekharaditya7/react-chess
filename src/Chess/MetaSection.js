import cx from "classnames";
import styles from "./index.module.scss";

export default function MetaSection({
  isUndoAvailable,
  isRedoAvailable,
  handleUndo,
  handleRedo,
  handleReset,
}) {
  return (
    <div className={styles.metaSection}>
      <div
        className={cx(styles.metaItem, {
          [styles.diabledMetaItem]: !isUndoAvailable,
        })}
        onClick={isUndoAvailable ? handleUndo : null}
      >
        Undo
      </div>
      <div
        className={cx(styles.metaItem, {
          [styles.diabledMetaItem]: !isRedoAvailable,
        })}
        onClick={handleRedo}
      >
        Redo
      </div>
      <div
        className={cx(styles.metaItem, {
          [styles.diabledMetaItem]: !isUndoAvailable,
        })}
        onClick={isUndoAvailable ? handleReset : null}
      >
        Reset
      </div>
    </div>
  );
}
