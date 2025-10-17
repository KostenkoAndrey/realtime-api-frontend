'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { name: 'audio', path: '/audio' },
  { name: 'stock', path: '/stock' },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div
      className='max-w-[196px] m-auto flex p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400
     rounded-full bg-[#18181b] text-white font-semibold text-lg mt-[70px]'
    >
      {nav.map((el, i, arr) => (
        <React.Fragment key={el.path}>
          <Link
            href={el.path}
            className={`px-6 py-2 bg-[#18181b] hover:bg-[#242424] transition-colors duration-300 
                ${i === 0 ? 'rounded-l-full' : ''}
                ${i === arr.length - 1 ? 'rounded-r-full' : ''}
                ${pathname === el.path ? 'text-[#5ddfff]' : 'text-white'}
              `}
          >
            {el.name}
          </Link>
          {i !== arr.length - 1 && <div className='w-[2px] bg-gradient-to-b from-pink-500 to-cyan-400' />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Navigation;
