import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import Button from "@material-ui/core/Button";
import { boardMove, randomAdd } from "./boardChange";
import Square from "./Square";

const initialBoard = [[0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 0, 0]];
// const colorBoard = [
//   [0 * 2, 4, 8, 16],
//   [0 * 32, 64, 128, 256],
//   [0 * 512, 1024, 2048, 4096],
//   [0 * 32 * 256, 64 * 256, 128 * 256, 256 * 256]
// ];
let valid = true;

function Interface() {
  const [board, setBoard] = React.useState(initialBoard);

  function move(key) {
    if (valid) {
      valid = false;
      let direction = key.code;
      //console.log(key.code);
      if (
        direction === "ArrowUp" ||
        direction === "ArrowDown" ||
        direction === "ArrowLeft" ||
        direction === "ArrowRight"
      ) {
        setBoard(prevBoard => {
          var isGameOver = true;
          var directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
          for (var i = 0; i < 4; ++i) {
            let nextStep = randomAdd(boardMove(prevBoard, directions[i]));
            if (JSON.stringify(prevBoard) !== JSON.stringify(nextStep)) {
              isGameOver = false;
              break;
            }
          }
          if (isGameOver) {
            console.log(prevBoard);
            window.alert("Game Over");
            return [...prevBoard];
          }

          //window.alert(JSON.stringify(prevBoard));
          let newBoard1 = boardMove(prevBoard, direction);
          //window.alert(JSON.stringify(prevBoard));
          if (JSON.stringify(prevBoard) === JSON.stringify(newBoard1)) {
            //window.alert("no change");
            return [...newBoard1];
          }
          let newBoard2 = randomAdd(newBoard1);
          return [...newBoard2];
        });
      }
      setTimeout(() => (valid = true), 500);
    }
  }

  function restart() {
    //setBoard(randomAdd(boardMove(board, "ArrowUp")));
    setBoard(() => [[0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 0, 0]]);
    //console.log(board);
  }
  document.addEventListener("keyup", move);

  return (
    <div>
      <div style={{ marginTop: "30px" }}>
        {board.map((row, rIndex) => (
          <div key={rIndex} className="row">
            {row.map((square, sIndex) => (
              <Square key={rIndex * 4 + sIndex} number={square} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <p style={{ display: "inline", marginRight: "10px" }}>
          Press →/←/↑/↓ to start or
        </p>
        <Button variant="contained" onClick={restart}>
          Restart
          <ReplayIcon />
        </Button>
        <p style={{ display: "inline", marginLeft: "10px" }}> to restart</p>
      </div>
    </div>
  );
}

export default Interface;
