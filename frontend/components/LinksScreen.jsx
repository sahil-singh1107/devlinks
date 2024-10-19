import React, { memo, useEffect, useState } from 'react';
import phonemockup from "../public/images/illustration-phone-mockup.svg";
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import gitlab from "../public/images/icon-gitlab.svg"
import Link from 'next/link';
import { uniqueNamesGenerator, adjectives, colors, animals, starWars, NumberDictionary } from 'unique-names-generator';

const url = "http://localhost:5000/api/v1/linkTree/createLinkTree"

const LinkForm = () => {
    const [links, setLinks] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);
    let linkTreeName = localStorage.getItem("linkTreeName")
    const { user, isSignedIn } = useUser();
    let clerkId;
    let imageUrl;
    if (isSignedIn) {
        clerkId = user?.id;
        imageUrl = user?.imageUrl
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

    const handleOnClick = () => {
        const shortName = uniqueNamesGenerator({
            dictionaries: [animals, colors, adjectives]
        });

        try {
            if (!linkTreeName) {
                axios.post(url, { imageUrl, links, username: shortName });
                localStorage.setItem("linkTreeName", shortName);
                linkTreeName = shortName
            }
        } catch (error) {
            console.log(error);
        } finally {
            // Redirect after ensuring linkTreeName has been set correctly
            window.open(`/linktree/${linkTreeName || shortName}`, '_blank');
        }
    }
    console.log(linkTreeName)

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDrop = (index) => {
        if (draggedIndex === null || draggedIndex === index) return;

        // Swap positions of dragged link and the target link
        const updatedLinks = [...links];
        const draggedLink = updatedLinks[draggedIndex];
        updatedLinks[draggedIndex] = updatedLinks[index];
        updatedLinks[index] = draggedLink;

        setLinks(updatedLinks);
        setDraggedIndex(null); // Reset draggedIndex after drop
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
                    {links.map((ele, index) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => e.preventDefault()} // Allow drop
                            onDrop={() => handleDrop(index)}
                            className='cursor-move mb-5'
                        >
                            <Link href={`//${ele.link}`}>
                                <Image src={gitlab} alt='ffs' className='mb-12' />
                            </Link>
                        </div>

                    ))}
                </div>
            </div>
            <button className='absolute text-sm p-2 border border-red-200 rounded-md' onClick={handleOnClick}>{!linkTreeName ? "Create" : "Link Tree"}</button>
        </div>
    );
};

export default LinkForm;
