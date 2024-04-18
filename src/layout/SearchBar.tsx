import { useState } from 'react';

const SearchBar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleSearchClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: any) => {
        e.preventDefault();
        handleModalClose();
    };

    return (
        <div className='flex-1'>
            <div className="flex justify-between items-center border-b border-sky-200 bg-sky-950 opacity-45 w-full h-16 px-4 brightness-125">
                <div
                    className={`flex items-center bg-gray-950 border border-sky-200 hover:border-sky-600 rounded-full px-4 py-2 transition-all duration-300 ${isHovered ? 'shadow-lg' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleSearchClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-6 bg-gray-950 text-blue-900 mr-2"
                        fill="none"
                        viewBox="0 2 20 20"
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
                        placeholder="Search for any token or wallet"
                        className="outline-none bg-gray-950 text-white placeholder-blue-600 w-80"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        readOnly
                    />
                </div>
                <button className="bg-gray-950 border-2 border-cyan-200 hover:border-cyan-600 hover:text-cyan-600 py-2 px-4 flex items-center space-x-2 rounded-md">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-right-to-arc" className="h-4 w-4 text-Teal-800" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M464 256c0-114.9-93.1-208-208-208c-13.3 0-24-10.7-24-24s10.7-24 24-24C397.4 0 512 114.6 512 256s-114.6 256-256 256c-13.3 0-24-10.7-24-24s10.7-24 24-24c114.9 0 208-93.1 208-208zM232.3 134.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6s-2.8 13-7.7 17.6l-112 104c-9.7 9-24.9 8.5-33.9-1.3s-8.5-24.9 1.3-33.9L266.9 280H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H266.9l-67.2-62.4c-9.7-9-10.3-24.2-1.3-33.9s24.2-10.3 33.9-1.3z"></path>
                    </svg>
                    <span className="text-Teal-400">Login / Connect</span>
                </button>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-50">
                    <div className="mt-20 flex flex-col gap-1 p-3 w-full max-w-3xl bg-gray-800 bg-opacity-80 rounded-lg shadow-[0_.875rem_1.875rem_0_rgba(4,24,54,0.1)]">
                        <div className="relative">
                            <form onSubmit={handleSearchSubmit} className="flex">
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg bg-sky-950 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                    placeholder="Search any token or wallet"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="far"
                                        data-icon="xmark"
                                        className="svg-inline--fa fa-xmark text-blue-400 h-4 w-4 cursor-pointer focus:outline-none"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                        onClick={handleModalClose}
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"
                                        />
                                    </svg>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;