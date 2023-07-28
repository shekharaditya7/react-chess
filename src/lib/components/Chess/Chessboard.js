import cx from "classnames";
import { COLORS } from "./chess.constants";
import styles from "./index.module.scss";

export default function Chessboard({
  chessBoard = [],
  handleBoxClick,
  checkedKingPos,
}) {
  return (
    <div className={styles.board}>
      {chessBoard.map((rowItems, row) => {
        return (
          <div className={styles.row} key={row}>
            {rowItems.map(({ piece, color, isActive, isMovedBox }, col) => {
              return (
                <div
                  className={cx(styles.box, {
                    [styles.active]: isActive,
                    [styles.checkedKing]:
                      checkedKingPos?.current?.row === row &&
                      checkedKingPos?.current?.col === col,
                    [styles.pointer]: !!piece,
                    [styles.dark]: color === COLORS.BLACK,
                    [styles.movedBox]: isMovedBox === true,
                  })}
                  key={`${row}-${col}`}
                  onClick={() => handleBoxClick(row, col)}
                >
                  {piece?.logoSrc ? (
                    <img
                      src={piece?.logoSrc}
                      alt="chess-piece"
                      className={cx(styles.pieceImg, {
                        [styles.whitePieceImg]: piece?.color === COLORS.WHITE,
                      })}
                    ></img>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
