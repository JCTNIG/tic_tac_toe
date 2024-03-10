const ticTacToeGame = (() => {
  const Player = (name, symbol) => {
    let score = 0;
    const updateScore = () => {
      score++;
    }
    const getScore = () => {
      return score
    }

    return {name, symbol, updateScore, getScore};
  }




  const GameBoard = () => {

    let board = [ '', '', '', '', '', '', '', '', ''];

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
    const player1 = Player( 'Player X', 'X');
    
    const player2 = Player('Player O', 'O');

    let currentPlayer;
    let gameStatus = true; 
    const gameBoard = GameBoard();
    const resetWinCell = () =>{   gameBoard.setWinCells();
    };
 
    const play = () => {

      const playerX = document.getElementById('playerX').value;
      
      const playerO = document.getElementById('playerO').value;

      player1.name = playerX || 'Player X';
      player2.name = playerO || 'Player O';

      gameBoard.boardReset();
      gameStatus = true;
      
      changePlayer();

      display()
      //cellDisplay();
    }

    const playStatus = document.querySelector('.gameStatus');
    
    const cells = document.querySelectorAll('.gameCell');

    const xScore = document.querySelector('.playerXScore');
    const oScore = document.querySelector('.playerOScore');

    const refreshCells = () => {
      cells.forEach((cell) => {cell.textContent = ''})
    }

    const refreshPlayStatus = () => {
      playStatus.textContent = `${currentPlayer.name}'s turn`;
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
          currentPlayer.updateScore();
          xScore.textContent =+ player1.getScore();
          oScore.textContent =+ player2.getScore();
          gameStatus = false;
        } else if (gameBoard.checkTie()) {
          console.log(`It's a Tie!`);
          playStatus.textContent = "It's a Tie!";
          gameStatus = false;
        } else {
          changePlayer();
          playStatus.textContent = `${currentPlayer.name}'s turn`;
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
    game.play();
    const playStatusStart = document.querySelector('.gameStatus')
    playStatusStart.textContent = 'Player X to start';

  cell.forEach((item) => { 
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
  
    game.play();

    game.refreshCells();
    game.refreshPlayStatus();
  
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