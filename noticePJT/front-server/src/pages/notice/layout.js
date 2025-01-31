import { useState } from 'react';

export default function NoticeLayout() {
  const [noticeNavs, setNoticeNavs] = useState([
    '게시판 카테고리',
    '자유게시판',
    '리뷰게시판',
    '네이버 동영상 게시판',
    '자료실 게시판',
  ]);

  return (
    <nav className="grid grid-cols-6 auto-rows-auto gap-4">
      {noticeNavs.map((nav, idx) => (
        <div key={idx}>nav</div>
      ))}
    </nav>
  );
}
