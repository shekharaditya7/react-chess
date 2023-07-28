import styles from "./index.module.scss";

export default function KnockedOutPieces({ pieces = [], wrapperClassName }) {
  return (
    <div className={wrapperClassName}>
      {pieces?.map((blackPiecesArr, row) => {
        return (
          <div className={styles.whiteCol} key={row}>
            {blackPiecesArr.map((item, col) => {
              return (
                <div className={styles.deadBox} key={`${row}-${col}`}>
                  {item?.logoSrc ? (
                    <img
                      src={item.logoSrc}
                      className={styles.blackPieceImg}
                      alt="piece"
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
