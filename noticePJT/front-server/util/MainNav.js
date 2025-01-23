import Link from 'next/link';
import styles from './nav.module.css';
import { useState } from 'react';
import { poor_story } from '@/ui/font';

export default function MainNav() {
  const [userName, setUserName] = useState('EZ');
  return (
    <header className={`${poor_story.className} pt-2`}>
      <nav className="w-full flex justify-between items-center px-4">
        <div className="flex justify-start grow space-x-12">
          <div className={`${styles.someClass}`}>
            <Link href={'/'}>
              <img id="logo" alt="logo" src="/img/cloud.png" />
            </Link>
          </div>
          <div className="flex justify-evenly items-center gap-10">
            <div>
              <Link href={'/'}>
                <span>위젯</span>
              </Link>
            </div>
            <div>
              <Link href={'/'}>
                <span>레이아웃과 색션</span>
              </Link>
            </div>
            <div>
              <Link href={'/'}>
                <span>CODE</span>
              </Link>
            </div>
            <div>
              <Link href={'/'}>
                <span>EXTRA</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-40 flex justify-evenly items-center gap-10">
          <div>
            <Link href={'/'}>
              <span>마이페이지</span>
            </Link>
          </div>
          <div>
            <Link href={'/'}>
              <span>{userName}</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
