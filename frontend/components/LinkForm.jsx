import React, { useContext, useState } from 'react';
import empty from "../public/images/illustration-empty.svg";
import Image from 'next/image';
import 'react-dropdown/style.css';
import Dropdown from './DropdownMenu';
import linkIcon from "../public/images/icon-link.svg"
import linkHeader from "../public/images/icon-links-header.svg"
import github from "../public/images/icon-github.svg"
import axios from 'axios';
import { useUser } from '@clerk/clerk-react'

const url = "http://localhost:5000/api/v1/link/createLink"

const LinkForm = () => {
    // Handler for adding a new link
    const [fields, setFields] = useState(0)
    const [link, setLink] = useState(null)
    const [selectedOption, setSelectedOption] = useState("GitHub");
    const [currUrl, setCurrUrl] = useState(github)

    const {user, isSignedIn} = useUser()
    let clerkId;
    if (isSignedIn) {
        clerkId = user?.id
    }

    const handleAddNewLink = () => {
        setFields(prev => prev + 1);
    }


    const handleRemove = () => {
        if (fields > 0) setFields(prev => prev - 1)
    }

    const handleSave = async () => {
        const res = await axios.post(url, {
            platform: selectedOption,
            link: link,
            clerkId: clerkId
        });
        console.log(res);
    }

    return (
        <>
            <div className='relative h-[91vh] ml-3 mr-3 border p-4'>
                <div className='h-full overflow-y-auto pb-16'>
                    <div className='pt-10 space-y-3'>
                        <h1 className='font-bold text-3xl'>Customize Your Links</h1>
                        <p className='text-[#737372]'>
                            Add/edit/remove links below and then share all your profiles with the world.
                        </p>
                        <button
                            onClick={handleAddNewLink}
                            className='text-[#7550fe] border border-[#7550fe] rounded w-full pt-3 pb-3 font-semibold hover:bg-[#eeeaff]'
                        >
                            + Add New Link
                        </button>

                        {fields === 0 && (
                            <div className='flex flex-col items-center justify-center border mt-4 p-4 ml-4 mr-4 h-96'>
                                <Image className='' src={empty} alt='Illustration depicting empty state for links' />
                                <p className='text-center text-[#737372]'>
                                    Use the "Add new link" button to get started.<br />
                                    Once you have more than one link, you can reorder and edit them. We're here to help<br />
                                    you share your profiles with everyone.
                                </p>
                            </div>
                        )}

                        {fields && (
                            <div className='bg-[#fafafa] mt-4 p-3'>
                                <div className='flex justify-between text-[#737372] text-xl mb-2'>
                                    <div className='flex space-x-3'>
                                        <Image src={linkHeader} />
                                        <p>Link #1</p>
                                    </div>
                                    <button onClick={handleRemove} className='text-sm'>Remove</button>
                                </div>
                                <form className='bg-[#fafafa]'>
                                    <div className='flex flex-col'>
                                        <label className='text-[#737372] mb-2'>Platform</label>
                                        <Dropdown selectedOption={selectedOption} setSelectedOption={setSelectedOption} currUrl={currUrl} setCurrUrl={setCurrUrl} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-[#737372] mt-2'>Link</label>
                                        <div className='flex mt-3'>
                                            <Image src={linkIcon} />
                                            <input type='text' placeholder={link ? link : "Add Link"} className='h-10 rounded-sm p-3 w-full hover:border hover:border-[#7550fe] focus-visible:border-[#7550fe]' value={link} onChange={(e) => setLink(e.target.value)} />
                                        </div>

                                    </div>

                                </form>
                            </div>
                        )}

                    </div>
                </div>

                <div className='absolute bottom-4 right-4'>
                    <button onClick={handleSave} className='bg-[#633bff] pl-5 pr-5 pt-2 pb-2 rounded-md text-white'>
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default LinkForm;
