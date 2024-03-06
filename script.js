const ticTacToeGame = (() => {
  const Player = (name, symbol) => {
    return {name, symbol};
  }

  const GameBoard = () => {

    let board = ['', '', '', '', '', '', '', '', ''];

    const markCel = (index, symbol) => {
      if (board[index] === '') {
        board[index] = symbol;
        return true;
      } 
      return false;
    }

    let winCells;
    const setWinCells = () => {
      winCells = [];
    };
    const getWinCells = () => {
      return winCells;
    };

    const checkWin = () => {
      const winConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ]

      for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]){
          winCells = condition;
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

    return {getBoard, markCel, boardReset, checkWin, checkTie, getWinCells, setWinCells};
    
  };


  const gameControl = () => {
    let player1;
    let player2;
    let currentPlayer;
    let gameStatus = true; 
    const gameBoard = GameBoard()
    const resetWinCell = () =>{   gameBoard.setWinCells();
    }
 
    const play = (name1, name2) => {
      player1 = Player(name1 = 'Player 1', 'X');
      player2 = Player(name2 = 'Player 2', 'O');

      currentPlayer = player1;
      gameBoard.boardReset();
      gameStatus = true;

      display()
      //cellDisplay();
    }

    const playStatus = document.querySelector('.gameStatus');
    
    const cells = document.querySelectorAll('.gameCell');

    const refreshCells = () => {
      cells.forEach((cell) => {cell.textContent = ''})
    }

    const refreshPlayStatus = () => {
      playStatus.textContent = '';
    }

    const setPlay = (index) => {
      
      if (!gameStatus) {
        console.log(`Game Over! Play Again`);
        return;
      }
      if (gameBoard.markCel(index, currentPlayer.symbol)) {
        display();
        cellDisplay
        (index);
        if (gameBoard.checkWin()) {
          console.log(`${currentPlayer.name} Wins!`);
          playStatus.textContent = `${currentPlayer.name} Wins!`;
          gameStatus = false;
        } else if (gameBoard.checkTie()) {
          console.log(`It's a Tie!`);
          playStatus.textContent = "It's a Tie!";
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
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    const cellDisplay = (num) => {
      cells.forEach((cell) => {
        const cellId = parseInt(cell.id)
        if (cellId === num)
        cell.textContent = currentPlayer.symbol;
      })
    }

    const showWin = () => {
      const winBoxes = gameBoard.getWinCells();
      
      cells.forEach((cell) => {
        const cellId = parseInt(cell.id)
          if (winBoxes && (cellId === winBoxes[0] || cellId === winBoxes[1] || cellId === winBoxes[2])) {
            cell.style.color = 'white';
            cell.style.backgroundColor = 'red';
          } 
      });

      if (winBoxes) {
        resetWinCell();
      }

      

    }



    return {play, setPlay, refreshCells, refreshPlayStatus, changePlayer, showWin, resetWinCell}
  }

  return {gameControl}

})();


const game = ticTacToeGame.gameControl();


//
//game.setPlay(3);
//game.setPlay(4);
//game.setPlay(5);
//game.setPlay(8);


//DOM UI design



const domDisplay = () => {
  const dialog = document.querySelector('#nameDialog');
  const enter = document.querySelector('.enterButton');
  const start = document.querySelector('.startButton');
  const restartRefresh = document.querySelector('.restartRefresh');
  const playerX = document.getElementById('playerX');
  const playerO = document.getElementById('playerO');
  const refresh = document.querySelector('.refreshButton');
  const restart = document.querySelector('.restartButton');
  const cell = document.querySelectorAll('.gameCell');

  function hideElement(element) {
    element.style.display = 'none';
  }

  function showElement(element) {
    element.style.display = 'block';
  }

  function preventModal(event) {
      event.preventDefault();
      hideElement(enter);
      showElement(restartRefresh)
      dialog.close();
  }

  const startFunction = () => {
    const playerValueX = playerX.value;
  const playerValueO = playerO.value;
    game.play(playerValueX, playerValueO);

  cell.forEach((item, index) => { 
    const itemId = parseInt(item.id);
    item.addEventListener('click', () => {
      game.setPlay(itemId);
      game.showWin();
    })
  })
  }

  function preventStart(event) {
    preventModal(event);
    startFunction();
  }

  function restartFunction() {
    //game.showWin()
    cell.forEach((cell) => {
      cell.style.color = '';
      cell.style.backgroundColor = '';
    })
    document.querySelector('.startButton').removeEventListener('click', preventStart);
    const playerValueX = playerX.value;
  const playerValueO = playerO.value;
    game.play(playerValueX,playerValueO);

    game.refreshCells();
    game.refreshPlayStatus();
    game.changePlayer();
  }

  enter.addEventListener('click', () => {
    dialog.show()
  });
    
  start.addEventListener('click', preventStart);

  refresh.addEventListener('click', () => {
    location.reload();
  })

  restart.addEventListener('click', restartFunction)

};

domDisplay();