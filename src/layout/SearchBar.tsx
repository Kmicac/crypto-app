import { useState } from 'react';

const SearchBar = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="fixed top-0 left-0 mt-4 ml-4">
            <div
                className={`flex bg-white rounded-full px-10 py-1.5 transition-all duration-300 ${isHovered ? 'shadow-lg' : ''
                    }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-900 mr-2"
                    fill='none'
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search any token or wallet"
                    className="outline-none bg-transparent text-black placeholder-blue-900 w-72"
                />
            </div>
            <button className="fixed top-0 right-0 h-16 w-16 bg-transparent border border-blue-900 ">Login / Connect</button>

        </div>
    );
};

export default SearchBar;