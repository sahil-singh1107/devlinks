import React, { useEffect, useState } from 'react';
import phonemockup from "../public/images/illustration-phone-mockup.svg";
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import gitlab from "../public/images/icon-gitlab.svg"
import Link from 'next/link';


const LinkForm = () => {
    const [links, setLinks] = useState([]);
    const { user, isSignedIn } = useUser();
    let clerkId;

    if (isSignedIn) {
        clerkId = user?.id;
    }

    useEffect(() => {
        const postData = async () => {
            if (clerkId) {
                try {
                   
                    const response = await axios.post(process.env.NEXT_PUBLIC_GET_LINKS, { clerkId });
                    
                    // Check if response.data is an array
                    
                        // Create a unique set of links
                        const newLinks = response.data.map(ele => ({
                            platform: ele.platform,
                            link: ele.link,
                            imageUrl: gitlab
                        }));

                        // Filter out duplicates based on platfor   

                        setLinks(prevLinks => [...prevLinks, ...newLinks]);
                    
                } catch (error) {
                    console.error('Error making POST request:', error);
                }
            }
        };
        postData();
    }, [clerkId]);

    const userButtonAppearance = {
        elements: {
            userButtonAvatarBox: "w-20 h-20", // Custom width and height
        },
    };

    return (
        <div className='relative flex justify-center'>
            <Image src={phonemockup} alt="Phone Mockup" />
            <div className='absolute top-[115px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                <UserButton appearance={userButtonAppearance} />
                <p className='absolute top-[112px] left-[27%] text-red-800 font-bold text-xs'>
                    {user?.firstName?.toUpperCase() || "User"} {/* Fallback if firstName is not available */}
                </p>
                <div className='absolute top-[217px] left-[29%]'>
                    {links.map((ele, _) => (
                        <Link href={`//${ele.link}`}>
                             <Image src={gitlab} alt='ffs' className='mb-12' />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LinkForm;
