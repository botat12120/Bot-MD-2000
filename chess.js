class ChessPiece {
  constructor(type, color) {
    this.type = type;  // P, R, N, B, Q, K
    this.color = color; // 'white' or 'black'
  }
}

class ChessBoard {
  constructor() {
    this.board = this.initializeBoard();
  }

  initializeBoard() {
    // إنشاء مصفوفة 8x8 فارغة
    let board = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // إعداد الصفوف
    let pieces = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
    
    // القطع البيضاء
    for (let i = 0; i < 8; i++) {
      board[0][i] = new ChessPiece(pieces[i], 'white');
      board[1][i] = new ChessPiece('P', 'white');
    }

    // القطع السوداء
    for (let i = 0; i < 8; i++) {
      board[7][i] = new ChessPiece(pieces[i], 'black');
      board[6][i] = new ChessPiece('P', 'black');
    }

    return board;
  }

  // عرض اللوحة بشكل نصي
  printBoard() {
    for (let row of this.board) {
      console.log(row.map(piece => (piece ? piece.type : '.')).join(' '));
    }
  }

  // التحقق من حركة قانونية
  isMoveLegal(from, to) {
    let piece = this.board[from.row][from.col];
    if (!piece) return false; // لا توجد قطعة للتحريك

    let target = this.board[to.row][to.col];
    if (target && target.color === piece.color) return false; // لا يمكنك ضرب قطعة من نفس اللون

    // إضافة قواعد الحركة حسب نوع القطعة
    switch (piece.type) {
      case 'P': // الجندي
        return this.isPawnMoveLegal(piece, from, to);
      case 'R': // القلعة
        return this.isRookMoveLegal(piece, from, to);
      case 'N': // الحصان
        return this.isKnightMoveLegal(piece, from, to);
      case 'B': // الفيل
        return this.isBishopMoveLegal(piece, from, to);
      case 'Q': // الملكة
        return this.isQueenMoveLegal(piece, from, to);
      case 'K': // الملك
        return this.isKingMoveLegal(piece, from, to);
      default:
        return false;
    }
  }

  // حركة الجندي (البيادق)
  isPawnMoveLegal(piece, from, to) {
    let direction = piece.color === 'white' ? -1 : 1;
    let startRow = piece.color === 'white' ? 6 : 1;
    let moveRow = to.row - from.row;
    let moveCol = to.col - from.col;

    if (moveCol === 0 && this.board[to.row][to.col] === null) {
      // خطوة واحدة للأمام
      if (moveRow === direction) return true;
      // خطوتين للأمام من الصف الابتدائي
      if (from.row === startRow && moveRow === 2 * direction) return true;
    } else if (Math.abs(moveCol) === 1 && moveRow === direction) {
      // أسر قطعة قطرًا
      if (this.board[to.row][to.col] !== null) return true;
    }
    return false;
  }

  // القلعة تتحرك بشكل مستقيم
  isRookMoveLegal(piece, from, to) {
    if (from.row !== to.row && from.col !== to.col) return false;

    return this.isPathClear(from, to);
  }

  // الحصان يتحرك على شكل حرف L
  isKnightMoveLegal(piece, from, to) {
    let rowDiff = Math.abs(from.row - to.row);
    let colDiff = Math.abs(from.col - to.col);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  }

  // الفيل يتحرك قطريًا
  isBishopMoveLegal(piece, from, to) {
    if (Math.abs(from.row - to.row) !== Math.abs(from.col - to.col)) return false;

    return this.isPathClear(from, to);
  }

  // الملكة تتحرك في جميع الاتجاهات
  isQueenMoveLegal(piece, from, to) {
    return this.isRookMoveLegal(piece, from, to) || this.isBishopMoveLegal(piece, from, to);
  }

  // الملك يتحرك خطوة واحدة في أي اتجاه
  isKingMoveLegal(piece, from, to) {
    let rowDiff = Math.abs(from.row - to.row);
    let colDiff = Math.abs(from.col - to.col);
    return rowDiff <= 1 && colDiff <= 1;
  }

  // التحقق من أن المسار بين نقطتين واضح
  isPathClear(from, to) {
    let rowStep = from.row < to.row ? 1 : from.row > to.row ? -1 : 0;
    let colStep = from.col < to.col ? 1 : from.col > to.col ? -1 : 0;

    let row = from.row + rowStep;
    let col = from.col + colStep;

    while (row !== to.row || col !== to.col) {
      if (this.board[row][col] !== null) return false;

      row += rowStep;
      col += colStep;
    }

    return true;
  }

  // تحريك القطعة من مربع إلى آخر
  move(from, to) {
    if (!this.isMoveLegal(from, to)) {
      console.log('الحركة غير قانونية');
      return false;
    }

    let piece = this.board[from.row][from.col];
    this.board[to.row][to.col] = piece;
    this.board[from.row][from.col] = null;

    console.log(`تم تحريك القطعة ${piece.type} من (${from.row},${from.col}) إلى (${to.row},${to.col})`);
    return true;
  }
}

// اختبار المكتبة
let chessBoard = new ChessBoard();
chessBoard.printBoard();

chessBoard.move({ row: 6, col: 4 }, { row: 4, col: 4 }); // e2 e4
chessBoard.printBoard();
