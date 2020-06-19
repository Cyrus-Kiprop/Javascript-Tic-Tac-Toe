// using the object oriented way
const game = new TicTacToe()

game.start()

function TicTacToe() {
    // body...
    const board = new Board()
    const firstPlayer = new Player('EXES', board)
    const secondPlayer = new Player('OOZ', board)

    let counter = 0

    this.start = function(argument) {
        const options = {
            childList: true
        }
        const observer = new MutationObserver(() => takeTurns())
        board.cells.forEach(element => observer.observe(element, options));
        takeTurns()
    }

    function takeTurns() {

        if (counter % 2 === 0) {
            console.log(counter)
            firstPlayer.myTurn()

        } else {
            secondPlayer.myTurn()
        }
        counter += 1;
    }
}

function Player(name, board) {
    this.name = name;
    // attribute accessor
    this.getName = () => name

    this.myTurn = function() {
        console.log(board)
        board.cells.forEach(cell => {
            console.log(cell)
            cell.addEventListener('click', makeMove)
        })
    }
    const makeMove = (event) => {
        const { target } = event.target;
        target.innerText = 'X';
        board.cells.forEach(element => element.removeEventListener('click', makeMove))
    }

}

function Board() {
    this.cells = Array.from(document.querySelectorAll('div.block'));
    console.log(this.cells)
}