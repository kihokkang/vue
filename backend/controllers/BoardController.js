const Board = require('../models/Board');

// 게시판 리스트 가져오기
exports.getBoardList = async (req, res) => {
    try {
      const boards = await Board.find();

      const formattedBoards = boards.map(board => ({
        ...board._doc, // 기존 필드 유지
        createdAt: formatDate(board.createdAt), // 날짜 형식 변환
        updatedAt: formatDate(board.updatedAt), // 날짜 형식 변환
    }));

      res.status(200).json(formattedBoards);
    } catch (error) {
      console.error('Error fetching board list:', error);
      res.status(500).json({ message: '서버 오류' });
    }
};

// 게시글 상세 내용 가져오기
exports.getBoardDetail = async (req, res) => {
  try {
    const boardNumber = req.params.boardNumber;
    console.log('res ::', boardNumber);

    // 게시글 조회 및 조회수 증가
    const board = await Board.findOneAndUpdate(
      { boardNumber: boardNumber },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!board) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    res.status(200).json(board);

  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ message: '서버 오류' });
  }
}


// 게시판 작성하기
exports.writeBoard = async (req, res) => {
  try {
    console.log('탔냐');
      // 자동으로 게시판 번호 생성
      const lastBoard = await Board.findOne().sort({ boardNumber: -1 });
      const boardNumber = lastBoard ? lastBoard.boardNumber + 1 : 1;

      const { title, content, userId, category } = req.body;
      const newBoard = new Board({
          boardNumber,
          title,
          content,
          userId,
          category,
      });

      const savedBoard = await newBoard.save();
      res.status(201).json(savedBoard);
  } catch (error) {
      console.error('Error creating new board:', error);
      res.status(500).json({ message: '서버 오류' });
  }
};

// 날짜 형식을 YYYYMMDD로 변환하는 함수
function formatDate(date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}${month}${day}`;
}