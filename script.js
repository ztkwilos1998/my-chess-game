
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

    selectedPiece = pieceElem;
    selectedSquare = square;
    console.log('Selected piece: ${pieceElem.innerHTML} at index ${index}');
}

function movePiece(square, index) {
    if (selectedPiece && selectedSquare !== square) {
        square.innerHTML = '';
        square.appendChild(selectedPiece);
        selectedPiece = null;
        selectedSquare = null;
        console.log('Moved piece to index ${index}');
    }
}
