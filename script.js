const ticTacToeGame = (() => {
  const Player = (name, symbol) => {
    return {name, symbol};
  }

  const Gameboard = () => {

    let board = ['', '', '', '', '', '', '', '', ''];

    const markCel = (index, symbol) => {
      if (board[index] === '') {
        board[index] = symbol;
        return true;
      } 
      return false;
    }

    const checkWin = () => {
      const winConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ]

      for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]){
          return true;
        }
      }
      return false;
    }

    const checkTie = () => {
      return board.every(cell => cell !== '');
  
    }

    const getBoard = () => {
      return board
    }

    const boardReset = () => {
      board = ['', '', '', '', '', '', '', '', ''];
    }

    return {getBoard, markCel, boardReset, checkWin, checkTie};
    
  };


  const gameControl = () => {
    let player1;
    let player2;
    let currentPlayer;
    let gameStatus = true; 
    const gameBoard = Gameboard()

    const play = (name1, name2) => {
      player1 = Player(name1, 'X');
      player2 = Player(name2, 'O');

      currentPlayer = player1;
      gameBoard.boardReset();
      gameStatus = true;

      display()
    }

    const setPlay = (index) => {
      if (!gameStatus) {
        console.log(`Game Over! Play Again`)
        return;
      }
      if (gameBoard.markCel(index, currentPlayer.symbol)) {
        display();
        if (gameBoard.checkWin()) {
          console.log(`${currentPlayer.name} Wins!`);
          gameStatus = false;
        } else if (gameBoard.checkTie()) {
          console.log(`It's a Tie! Try Again!`);
          gameStatus = false;
        } else {
          changePlayer();
        }
      } else {
        console.log("This cell is already marked. Try again.");
      }
    }

    const display = () => {
      const board = gameBoard.getBoard()
      console.log(`
      ${board[0]} | ${board[1]} | ${board[2]}
      -----------
      ${board[3]} | ${board[4]} | ${board[5]}
      -----------
      ${board[6]} | ${board[7]} | ${board[8]}`);
    };

    const changePlayer = () => {
      currentPlayer = (currentPlayer === player1) ? player2 : player1
    }
    return {play, setPlay}
  }

  return {gameControl}

})();


const game = ticTacToeGame.gameControl();

game.play('Oge', 'Justice');
game.setPlay(0);
game.setPlay(3);
game.setPlay(4);
game.setPlay(5);
game.setPlay(8);