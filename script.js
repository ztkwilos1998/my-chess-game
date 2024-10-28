
// Define Unicode characters for chess pieces
const pieces = {
    'pawn': '\u2659',
    'rook': '\u2656',
    'knight': '\u2658',
    'bishop': '\u2657',
    'queen': '\u2655',
    'king': '\u2654',
    'pawnBlack': '\u265F',
    'rookBlack': '\u265C',
    'knightBlack': '\u265E',
    'bishopBlack': '\u265D',
    'queenBlack': '\u265B',
    'kingBlack': '\u265A'
};

// Define initial setup of chessboard
const initialSetup = [
    pieces.rookBlack, pieces.knightBlack, pieces.bishopBlack, pieces.queenBlack, pieces.kingBlack, pieces.bishopBlack, pieces.knightBlack, pieces.rookBlack,
    pieces.pawnBlack, pieces.pawnBlack, pieces.pawnBlack, pieces.pawnBlack, pieces.pawnBlack, pieces.pawnBlack, pieces.pawnBlack, pieces.pawnBlack,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pieces.pawn, pieces.pawn, pieces.pawn, pieces.pawn, pieces.pawn, pieces.pawn, pieces.pawn, pieces.pawn,
    pieces.rook, pieces.knight, pieces.bishop, pieces.queen, pieces.king, pieces.bishop, pieces.knight, pieces.rook
];

let selectedPiece = null;
let selectedSquare = null;




document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard'); 
   
    for (let i = 0; i < 64; i++) { 
        const square = document.createElement('div'); 
        square.classList.add('square');

        
        const row = Math.floor(i / 8); 
        const col = i % 8; 

        if ((row + col) % 2 === 0) {
            square.classList.add('white');
        } else {
            square.classList.add('black');
        }

        const piece = initialSetup[i];
        if (piece) {
            const pieceElem = document.createElement('div');
            pieceElem.classList.add('piece');
            pieceElem.innerHTML = piece;
            pieceElem.addEventListener('click', () => selectPiece(pieceElem, square, i)); //adds an event listener
            square.appendChild(pieceElem);
        }

        square.addEventListener('click', () => movePiece(square, i)); //add event listener
        chessboard.appendChild(square);

     
    }

});

function selectPiece(pieceElem, square, index) {

    if (selectedPiece) {
        selectedPiece.classList.remove('selected');
    }
    selectedPiece = pieceElem;
    selectedSquare = square;
    pieceElem.classList.add('selected');
    console.log(`Selected piece: ${pieceElem.innerHTML} at index ${index}`);
}

function movePiece(square, toIndex) {
    const fromIndex = Array.from(selectedSquare.parentElement.children).indexOf(selectedSquare);
    if (selectedPiece && selectedSquare !== square) {
        const piece = selectedPiece.innerHTML;
        if (isValidMove(piece, fromIndex, toIndex)) {
            // Clear the initial square
            selectedSquare.innerHTML = '';
            // Move the piece to the new square
            square.innerHTML = '';
            square.appendChild(selectedPiece);
            // Deselect the piece
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
            selectedSquare = null;
            console.log(`Moved piece to index ${toIndex}`);
            checkForCapture(square);
        } else {
            console.log("Invalid move");
        }
    }
}

function isValidMove(piece, fromIndex, toIndex, board) {
    const rowFrom = Math.floor(fromIndex / 8);
    const colFrom = fromIndex % 8;
    const rowTo = Math.floor(toIndex / 8);
    const colTo = toIndex % 8;

    switch (piece) {
        case '\u2659': // white pawn
            return (colFrom === colTo && rowTo === rowFrom - 1);
        case '\u265F': // black pawn
            return (colFrom === colTo && rowTo === rowFrom + 1);
        case '\u2656': // white rook
        case '\u265C': // black rook
            return (colFrom === colTo || rowFrom === rowTo);
        case '\u2658': // white knight
        case '\u265E': // black knight
            return (Math.abs(rowFrom - rowTo) === 2 && Math.abs(colFrom - colTo) === 1) ||
                (Math.abs(rowFrom - rowTo) === 1 && Math.abs(colFrom - colTo) === 2);
        case '\u2657': // white bishop
        case '\u265D': // black bishop
            return Math.abs(rowFrom - rowTo) === Math.abs(colFrom - colTo);
        case '\u2655': // white queen
        case '\u265B': // black queen
            return (colFrom === colTo || rowFrom === rowTo) ||
                (Math.abs(rowFrom - rowTo) === Math.abs(colFrom - colTo));
        case '\u2654': // white king
        case '\u265A': // black king
            return Math.abs(rowFrom - rowTo) <= 1 && Math.abs(colFrom - colTo) <= 1;
        default:
            return false;
    }
}

function checkForCapture(square) {
    // Check if the square contains an opponent's piece and remove it
    if (square.children.length > 1) {
        const newPiece = square.children[square.children.length - 1];
        const opponentPiece = square.children[square.children.length - 2];

        if (isOpponentPiece(newPiece, opponentPiece)) {
            square.removeChild(opponentPiece);
            console.log("Piece captured");
        }
    }
}

function isOpponentPiece(pieceElem, opponentElem) {
    const whitePieces = ['\u2659', '\u2656', '\u2658', '\u2657', '\u2655', '\u2654'];
    const blackPieces = ['\u265F', '\u265C', '\u265E', '\u265D', '\u265B', '\u265A'];

    const piece = pieceElem.innerHTML;
    const opponent = opponentElem.innerHTML;

    if (whitePieces.includes(piece) && blackPieces.includes(opponent)) {
        return true;
    } else if (blackPieces.includes(piece) && whitePieces.includes(opponent)) {
        return true;
    }
    return false;
}

