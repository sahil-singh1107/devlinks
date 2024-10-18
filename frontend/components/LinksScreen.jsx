import React from 'react';
import phonemockup from "../public/images/illustration-phone-mockup.svg";
import Image from 'next/image';
import { UserButton, useUser } from '@clerk/nextjs';

const LinkForm = () => {
    // Handler for adding a new link

    const {user} = useUser()

    const userButtonAppearance = {
        elements: {
          userButtonAvatarBox: "w-20 h-20", // Custom width and height
        },
      };

    return (
        <>
            <div className='relative flex justify-center'>
                <Image src={phonemockup} alt="Phone Mockup" />
                <div className='absolute top-[115px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                    <UserButton appearance={userButtonAppearance} />
                    <p className='absolute top-[107px] left-[27%] text-red-800 font-bold'>{user?.firstName.toUpperCase()}</p>
                </div>
            </div>

        </>
    );
};

export default LinkForm;
