import React from 'react'
import { useState } from 'react';
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
export default function CreateProfile() {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('Choose image');
    function handlePictureChange(event) {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
            setFileName(event.target.files[0].name);
        }
    }
    function handleChooseImageClick() {
        document.getElementById('fileInput').click();
    }
    return (
        <>
            <Navbar />
            <div className="px-[10vw] sm:pl-[18vw] md:pl-[20vw] lg:pl-[30vw] sm:pt-[6vh] lg:pt-[2vh]">
                <div className=" pt-7">
                    <h1 className="font-inter font-extrabold text-2xl md:text-3xl">Welcome! Let's create your profile</h1>
                    <p className="mt-5 font-inter">Let others get to know you better! You can do these later</p>
                </div>
                <div className="mt-10 font-inter">
                    <p className="font-bold font-inter text-lg mb-4">Add an avatar</p>
                    <div className="flex flex-row gap-8">
                        {image ? <img src={URL.createObjectURL(image)} alt="profilePhoto" className="rounded-full object-fit w-32 h-34" /> : <div className="border-dashed border-2 border-slate-300 p-12 rounded-full"><FontAwesomeIcon icon={faCamera} /></div>}
                        <div className="pt-3">
                            <div className="border-2 px-2 py-2 rounded-md font-bold text-xs w-28 cursor-pointer text-center" onClick={handleChooseImageClick}><input id="fileInput" type="file" hidden onChange={handlePictureChange} />Choose Image</div>
                            <div className="text-slate-400 font-bold text-xs sm:text-sm mt-5">&gt; Or choose one of our defaults</div>
                        </div>
                    </div>
                </div>
                <div className="mt-16">
                    <p className="font-bold font-inter text-lg mb-4">Add your location</p>
                    <div className="mt-6">
                        <input type="text" placeholder="Enter a location" className="w-[80%] lg:w-[60%] border-b-2 focus:outline-none font-medium" />
                    </div>
                </div>
                <div className="mt-8 sm:mt-14 pb-8">
                    <button className="bg-[#EA4B8B] px-10 py-1 w-40 rounded-md text-white hover:bg-[#ea4b8bc4]">Next</button>
                </div>
            </div>
        </>
    )
}
