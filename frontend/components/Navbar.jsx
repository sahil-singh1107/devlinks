import React from 'react';
import Image from 'next/image';
import logo from "../public/images/logo-devlinks-large.svg"
import linkImage from '../public/images/icon-link.svg';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <div className="mt-4 mb-4 pl-3 pr-3 bg-[#fefeff]">
      <div className="flex justify-between items-center">
        <Image src={logo} alt="Devlinks logo" width={150} height={100} />
        <nav className="flex space-x-6">
          <button className="flex items-center bg-[#eeeaff] text-[#7550fe] px-4 py-2 rounded">
            <Image src={linkImage} alt="Link Icon" width={20} height={20} className="mr-2" />
            Link
          </button>
          <button className="flex items-center text-[#7550fe] hover:bg-[#eeeaff] rounded px-4 py-2">
              <UserButton showName />
          </button>
        </nav>

        <button className="px-4 py-2 bg-white text-[#7550fe] border border-[#7550fe] rounded hover:bg-[#eeeaff]">
          Preview
        </button>
      </div>  
    </div>
  );
};

export default Navbar;
