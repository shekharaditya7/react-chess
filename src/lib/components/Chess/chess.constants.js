const whiteRook =
  "https://this-is-me-74cbf.web.app/images/chess/white-rook.webp";
const whiteKnight =
  "https://this-is-me-74cbf.web.app/images/chess/white-knight.webp";
const whiteBishop =
  "https://this-is-me-74cbf.web.app/images/chess/white-bishop.webp";
const whiteKing =
  "https://this-is-me-74cbf.web.app/images/chess/white-king.webp";
const whiteQueen =
  "https://this-is-me-74cbf.web.app/images/chess/white-queen.webp";
const whitePawn =
  "https://this-is-me-74cbf.web.app/images/chess/white-pawn.webp";

const blackRook =
  "https://this-is-me-74cbf.web.app/images/chess/black-rook.webp";
const blackKnight =
  "https://this-is-me-74cbf.web.app/images/chess/black-knight.webp";
const blackBishop =
  "https://this-is-me-74cbf.web.app/images/chess/black-bishop.webp";
const blackKing =
  "https://this-is-me-74cbf.web.app/images/chess/black-king.webp";
const blackQueen =
  "https://this-is-me-74cbf.web.app/images/chess/black-queen.webp";
const blackPawn =
  "https://this-is-me-74cbf.web.app/images/chess/black-pawn.webp";

export const LOCAL_CONFIG_KEY = "chess-config";
export const REDO_KEY = "redo-list";

const BLACK = "black";
const WHITE = "white";

export const COLORS = {
  BLACK,
  WHITE,
};

const KING = "king";
const QUEEN = "queen";
const PAWN = "pawn";
const BISHOP = "bishop";
const ROOK = "rook";
const KNIGHT = "knight";

export const TYPES = {
  KING,
  QUEEN,
  PAWN,
  BISHOP,
  ROOK,
  KNIGHT,
};

const PIECES = [
  {
    id: 1,
    color: COLORS.WHITE,
    type: TYPES.ROOK,
    logoSrc: whiteRook,
  },
  {
    id: 2,
    color: COLORS.WHITE,
    type: TYPES.KNIGHT,
    logoSrc: whiteKnight,
  },
  {
    id: 3,
    color: COLORS.WHITE,
    type: TYPES.BISHOP,
    logoSrc: whiteBishop,
  },
  {
    id: 4,
    color: COLORS.WHITE,
    type: TYPES.QUEEN,
    logoSrc: whiteQueen,
  },
  {
    id: 5,
    color: COLORS.WHITE,
    type: TYPES.KING,
    logoSrc: whiteKing,
  },

  {
    id: 6,
    color: COLORS.WHITE,
    type: TYPES.BISHOP,
    logoSrc: whiteBishop,
  },
  {
    id: 7,
    color: COLORS.WHITE,
    type: TYPES.KNIGHT,
    logoSrc: whiteKnight,
  },
  {
    id: 8,
    color: COLORS.WHITE,
    type: TYPES.ROOK,
    logoSrc: whiteRook,
  },
  {
    id: 9,
    color: COLORS.WHITE,
    type: TYPES.PAWN,
    logoSrc: whitePawn,
  },
  {
    id: 10,
    color: COLORS.WHITE,
    type: TYPES.PAWN,
    logoSrc: whitePawn,
  },
  {
    id: 11,
    color: COLORS.WHITE,
    type: TYPES.PAWN,
    logoSrc: whitePawn,
  },
  {
    id: 12,
    color: COLORS.WHITE,
    type: TYPES.PAWN,
    logoSrc: whitePawn,
  },
  {
    id: 13,
    color: COLORS.WHITE,
    type: TYPES.PAWN,
    logoSrc: whitePawn,
  },
  {
    id: 14,
    color: COLORS.WHITE,
    type: TYPES.PAWN,
    logoSrc: whitePawn,
  },
  {
    id: 15,
    color: COLORS.WHITE,
    type: TYPES.PAWN,
    logoSrc: whitePawn,
  },
  {
    id: 16,
    color: COLORS.WHITE,
    type: TYPES.PAWN,
    logoSrc: whitePawn,
  },
  {
    id: 17,
    color: COLORS.BLACK,
    type: TYPES.ROOK,
    logoSrc: blackRook,
  },
  {
    id: 18,
    color: COLORS.BLACK,
    type: TYPES.KNIGHT,
    logoSrc: blackKnight,
  },
  {
    id: 19,
    color: COLORS.BLACK,
    type: TYPES.BISHOP,
    logoSrc: blackBishop,
  },
  {
    id: 20,
    color: COLORS.BLACK,
    type: TYPES.QUEEN,
    logoSrc: blackQueen,
  },
  {
    id: 21,
    color: COLORS.BLACK,
    type: TYPES.KING,
    logoSrc: blackKing,
  },

  {
    id: 22,
    color: COLORS.BLACK,
    type: TYPES.BISHOP,
    logoSrc: blackBishop,
  },
  {
    id: 23,
    color: COLORS.BLACK,
    type: TYPES.KNIGHT,
    logoSrc: blackKnight,
  },
  {
    id: 24,
    color: COLORS.BLACK,
    type: TYPES.ROOK,
    logoSrc: blackRook,
  },
  {
    id: 25,
    color: COLORS.BLACK,
    type: TYPES.PAWN,
    logoSrc: blackPawn,
  },
  {
    id: 26,
    color: COLORS.BLACK,
    type: TYPES.PAWN,
    logoSrc: blackPawn,
  },
  {
    id: 27,
    color: COLORS.BLACK,
    type: TYPES.PAWN,
    logoSrc: blackPawn,
  },
  {
    id: 28,
    color: COLORS.BLACK,
    type: TYPES.PAWN,
    logoSrc: blackPawn,
  },
  {
    id: 29,
    color: COLORS.BLACK,
    type: TYPES.PAWN,
    logoSrc: blackPawn,
  },
  {
    id: 30,
    color: COLORS.BLACK,
    type: TYPES.PAWN,
    logoSrc: blackPawn,
  },
  {
    id: 31,
    color: COLORS.BLACK,
    type: TYPES.PAWN,
    logoSrc: blackPawn,
  },
  {
    id: 32,
    color: COLORS.BLACK,
    type: TYPES.PAWN,
    logoSrc: blackPawn,
  },
];

const BOARD = [
  [
    { piece: PIECES[16], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[17], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[18], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[19], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[20], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[21], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[22], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[23], color: COLORS.BLACK, isActive: false },
  ],
  [
    { piece: PIECES[24], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[25], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[26], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[27], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[28], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[29], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[30], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[31], color: COLORS.WHITE, isActive: false },
  ],
  [
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
  ],
  [
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
  ],

  [
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
  ],
  [
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
    { color: COLORS.BLACK, isActive: false },
    { color: COLORS.WHITE, isActive: false },
  ],

  [
    { piece: PIECES[8], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[9], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[10], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[11], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[12], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[13], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[14], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[15], color: COLORS.BLACK, isActive: false },
  ],
  [
    { piece: PIECES[0], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[1], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[2], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[3], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[4], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[5], color: COLORS.WHITE, isActive: false },
    { piece: PIECES[6], color: COLORS.BLACK, isActive: false },
    { piece: PIECES[7], color: COLORS.WHITE, isActive: false },
  ],
];

export const KNOCKED_OUT_BOARD = {
  [COLORS.WHITE]: [
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
  ],
  [COLORS.BLACK]: [
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
  ],
};

export default BOARD;
