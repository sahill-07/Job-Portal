import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect'
const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="flex flex-col-reverse md:flex-row w-full min-h-screen items-center justify-between p-5 lg:px-10">
            {/* Text Content */}
            <div className="max-w-xl space-y-5 text-center md:text-left pl-10">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    <Typewriter
                        options={{
                            autoStart:true ,
                            loop: true ,
                            delay:90 ,
                            strings:["Connecting Talent with the Best Opportunities."]
                        }} />
                </h1>
                <p className="text-gray-600 text-lg md:text-xl">
                    Don't just search for jobs; find the right one. Our system provides recommendations based on your strengths and preferences, bringing the best opportunities directly to you.
                </p>
                {/* Search Bar */}
                <div className="flex w-full md:w-3/4 lg:w-2/3 shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 mx-auto md:mx-0">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full p-2 text-gray-800"
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] text-white">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Image and Background SVG */}
            <div className="relative w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <img
                    src="https://res.cloudinary.com/ddcg0rzlo/image/upload/v1651252781/Hero_mcnozf.png"
                    loading="lazy"
                    alt="Hero"
                    className="w-3/4 max-w-md"
                />
                <div className="absolute inset-0 flex justify-center items-center -z-10">
                    <svg
                        width="900"
                        height="700"
                        viewBox="0 0 900 700"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="100" width="700" height="700" rx="60" fill="#3E3FD8" fillOpacity="0.75" />
                        <rect y="100" width="400" height="500" rx="60" fill="#EF8B8D" fillOpacity="0.75" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
