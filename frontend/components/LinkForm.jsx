import React, { useState } from 'react';
import empty from "../public/images/illustration-empty.svg";
import Image from 'next/image';

const LinkForm = () => {
    // Handler for adding a new link

    const [forms, setForms] = useState([])

    const handleAddLink = () => {
        
    };

    return (
        <>
            <div className='relative h-[91vh] ml-3 mr-3 border p-4 bg-[#fafafa]'>
                <div className='h-full overflow-y-auto pb-16'>
                    <div className='pt-10 space-y-3'>
                        <h1 className='font-bold text-3xl'>Customize Your Links</h1>
                        <p className='text-[#737372]'>
                            Add/edit/remove links below and then share all your profiles with the world.
                        </p>
                        <button
                            onClick={handleAddLink}
                            className='text-[#7550fe] border border-[#7550fe] rounded w-full pt-3 pb-3 font-semibold hover:bg-[#eeeaff]'
                        >
                            + Add New Link
                        </button>

                        {forms.length === 0 && (
                            <div className='flex flex-col items-center justify-center border mt-4 p-4 ml-4 mr-4 h-96'>
                            <Image className='' src={empty} alt='Illustration depicting empty state for links' />
                            <p className='text-center text-[#737372]'>
                                Use the "Add new link" button to get started.<br />
                                Once you have more than one link, you can reorder and edit them. We're here to help<br />
                                you share your profiles with everyone.
                            </p>
                        </div>
                        )}

                        
                    </div>
                </div>

                {/* Save button positioned in the right bottom */}
                <div className='absolute bottom-4 right-4'>
                    <button className='bg-[#633bff] pl-5 pr-5 pt-2 pb-2 rounded-md text-white'>
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default LinkForm;
