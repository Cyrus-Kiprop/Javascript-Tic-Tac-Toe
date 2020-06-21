// using the object oriented way

const boardUtils = (function boardUtils() {
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return {
    WINNING_COMBINATIONS,
  };
}());

const gameUtils = (function gameUtils() {
  const container = document.getElementById('container');

  const winningMessage = (player) => winDrawUI(`Congratulation ${player} is the winner!!`);

  const drawMessage = () => winDrawUI("It's a draw ");

  const handleGameReset = () => window.location.reload();

  const winDrawUI = (message) => {
    // container.innerHTML = '';
    const div = document.createElement('div');
    div.setAttribute('class', 'bg-dark');
    const hide = document.getElementById('hide');
    hide.style.display = 'none';

    // banner
    const h1 = document.createElement('h1');
    h1.innerHTML = 'Tic-Tac-Toe';
    h1.setAttribute('class', 'banner');
    div.appendChild(h1);

    // the congratulation message
    const h2 = document.createElement('h2');
    h2.innerHTML = message;
    h2.setAttribute('class', 'winner');
    div.appendChild(h2);

    // reset the game
    const btn = document.createElement('btn');
    btn.setAttribute('class', 'btn btn-warning reset-btn');
    btn.innerHTML = 'Reset';
    btn.addEventListener('click', () => handleGameReset());
    div.appendChild(btn);

    // restart the game
    const btnRestart = document.createElement('btn');
    btnRestart.setAttribute('class', 'btn btn-success reset-btn');
    btnRestart.innerHTML = 'Restart the Game';
    btnRestart.addEventListener('click', () => handleGameRestart(div, hide));
    div.appendChild(btnRestart);

    container.appendChild(div);
    return container;
  };
  const handleGameRestart = (node, hide) => {
    node.style.display = 'none';
    hide.style.display = 'block';
    // counter = 0;
    // return counter;
  };

  return {
    winningMessage,
    drawMessage,
  };
}());

const form = document.getElementById('welcome-form');
form.addEventListener('submit', (event) => {
  const player1 = document.getElementById('player-one-name').value || 'player1';
  const player2 = document.getElementById('player-two-name').value || 'player2';
  const board = document.getElementById('play-area');
  event.preventDefault();
  form.classList.toggle('none');
  board.classList.toggle('none');

  const game = new TicTacToe(player1, player2);
  game.start();
});

function TicTacToe(player1, player2) {
  // body...
  const board = new Board();
  const firstPlayer = new Player(player1, board, 'X');
  const secondPlayer = new Player(player2, board, 'O');

  let counter = 0;

  this.start = function start() {
    const options = {
      childList: true,
    };
    const observer = new MutationObserver(() => takeTurns());
    board.cells.forEach((element) => observer.observe(element, options));
    takeTurns();
  };

  function gameReset() {
    board.reset();
    counter = 0;
    return counter;
  }

  function isWinOrDraw() {
    // check for a win / draw before next turn
    let decide = false;

    const player = counter % 2 === 0 ? secondPlayer : firstPlayer;
    if (board.isWinner()) {
      // congratulations
      gameUtils.winningMessage(player.name);

      decide = true;
    }

    if (board.isDraw()) {
      gameUtils.drawMessage(player.name);
      decide = true;
    }

    return decide;
  }

  function takeTurns() {
    if (isWinOrDraw()) {
      return gameReset();
    }

    if (counter % 2 === 0) {
      firstPlayer.myTurn();
    } else {
      secondPlayer.myTurn();
    }
    counter += 1;
    return counter;
  }
}

function Player(name, board, signature) {
  this.name = name;
  this.signature = signature;
  // attribute accessor
  this.getName = () => name;

  this.myTurn = function myTurn() {
    board.cells.forEach((cell) => {
      if (cell.innerHTML === '') {
        cell.addEventListener('click', makeMove);
      }
    });
  };
  const makeMove = (event) => {
    const { target } = event;
    target.innerText = this.signature;
    board.cells.forEach((element) => {
      element.removeEventListener('click', makeMove, { useCapture: true });
    });
  };
}

function Board() {
  this.cells = Array.from(document.querySelectorAll('div.block'));

  // check for a winner
  this.isWinner = function isWinner() {
    let winner = false;

    const positions = this.cells;

    boardUtils.WINNING_COMBINATIONS.forEach((combination) => {
      // combinatins are made up of three cells
      const firstCell = positions[combination[0]].innerText;
      const secondCell = positions[combination[1]].innerText;
      const thirdCell = positions[combination[2]].innerText;

      const confirmWin = firstCell !== ''
        && secondCell === firstCell
        && thirdCell === secondCell;

      if (confirmWin) {
        winner = true;
      }
    });

    return winner;
  };

  this.isDraw = function isDraw() {
    return this.cells.every((cell) => ['X', 'O'].includes(cell.innerText));
  };

  this.reset = function reset() {
    return this.cells.forEach((cell) => {
      cell.innerText = '';
    });
  };
}
