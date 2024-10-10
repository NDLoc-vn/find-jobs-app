'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';

const Button = ({ children, isActive }: { children: React.ReactNode, isActive: boolean }) => {
  return (
    // <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
    <button className={clsx(isActive ? 'bg-xanhduong-600 text-white' : 'bg-white text-black', 'px-4 py-2 rounded-lg')}>
      {children}
    </button >
  );
}

const UserMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <ul className="flex items-center p-4">
      <li className="mr-4">
        <Link href="/">
          <Button isActive={pathname === '/'}>Tìm việc</Button>
        </Link>
      </li>
      <li className="mr-4">
        <Link href="#">
          <Button isActive={pathname === '#'}>Công việc</Button>
        </Link>
      </li>
      <li className="mr-4">
        <Link href="#">
          <Button isActive={pathname === '#'}>Nhắn tin</Button>
        </Link>
      </li>
      <li className="mr-4">
        <Link href="/profile">
          <Button isActive={pathname === '/profile'}>Cá nhân</Button>
        </Link>
      </li>
      <li className="ml-auto">
        <Link className='rounded-full overflow-hidden h-10 w-10' href="#">
          <Image
            src="/avatar_temp.jpg"
            alt="Profile Picture"
            width={42}
            height={42}
            className="object-cover"
            onClick={handleAvatarClick}
          />
        </Link>
        <div className={clsx(
          isDropdownOpen ? 'block' : 'hidden',
          'absolute right-0 mt-1 mr-2 bg-white border-gray-200 border-2 shadow-md p-4 w-48 rounded-lg z-10'
        )}>
          <ul>
            <li className='pb-2'>
              <Link href="#">Cài đặt</Link>
            </li>
            <li className=''>
              <Link href="#">Đăng xuất</Link>
            </li>
          </ul>
        </div>
      </li>
    </ul >
  );
};

export default UserMenu;
