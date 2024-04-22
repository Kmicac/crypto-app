import { useState } from 'react'
import logo from '../assets/MoralisMoneyLogomark.5b65b0d7.svg'
import logo1 from '../assets/MoralisMoneyLogotype.431faf8b.svg'
import { FaChartBar, FaChevronDown, FaSearch, FaBookmark, FaGraduationCap, FaBriefcase, FaCode, FaCog, FaChevronLeft, FaArrowRight } from 'react-icons/fa';
import SearchBar from './SearchBar';
import CirclesGraph from './CryptoDashboard';

export function PageHeader() {
  const [open, setOpen] = useState(true);
  const [showSubsections, setShowSubsections] = useState(false);

  const handleToggleSidebar = () => {
    setOpen(!open);
  }

  const handleToggleSubsections = () => {
    setShowSubsections(!showSubsections);
  }
  return (
    <div className='flex'>
      <div className={`flex flex-col ${open ? "w-64" : "w-18 gap-6"} h-screen bg-sky-950 bg-opacity-50 transition-all duration-300 pt-1 `}>
        <div className='px-6 pt-6 mb-6'>
          <a className='flex gap-3' href="/">
            <img src={logo} className={`h-8 ${!open ? 'absolute pt-0' : 'flex'}`} />
            <img src={logo1} className={`h-6 ${!open && 'hidden'}`} />
          </a>
        </div>
        <div className='flex flex-col justify-content min-h-40 overflow-y-auto py-2 px-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-sky-950'>
          <ul className='flex flex-col justify-content'>
            <button onClick={handleToggleSubsections} className='flex justify-between text-[#f0f8ff]  w-full h-16 px-4 rounded-lg hover:bg-[#0d2035] hover:shadow-md'>
              <li className="flex items-center gap-4 pt-6">
                <FaChartBar className='text-white' />
                <span className={` ${!open && 'hidden'}`}>Market Overview</span>
                <FaChevronDown className={` w-3 h-3 ${!open && 'hidden'}`} />
              </li>
            </button>
            {showSubsections && (
          <>
            <a className='flex justify-between text-[#f0f8ff]  w-full h-16 px-4 rounded-lg hover:bg-[#0d2035] hover:shadow-md' >
              <li className="flex items-center gap-4 pt-6">
                <span className={`${!open && 'hidden'}`}>Top token by market cap</span>
              </li>
            </a>
            <a className='flex justify-between text-[#f0f8ff]  w-full h-16 px-4 rounded-lg hover:bg-[#0d2035] hover:shadow-md' >
              <li className="flex items-center gap-4 pt-6">
                <span className={`${!open && 'hidden'}`}>Top token on the move</span>
              </li>
            </a>
          </>
        )}
            <button className='flex justify-between text-[#f0f8ff]  w-full h-16 px-4 rounded-lg hover:bg-[#0d2035] hover:shadow-md' >
              <li className="flex items-center gap-4 pt-6">
                <FaSearch className='text-white' />
                <span className={`${!open && 'hidden'}`}>Research</span>
                <FaChevronDown className={` w-3 h-3 ml-14 ${!open && 'hidden'}`} />
              </li>
            </button>
            <button className='flex justify-between text-[#f0f8ff]  w-full h-16 px-4 rounded-lg hover:bg-[#0d2035] hover:shadow-md' >
              <li className="flex items-center gap-4 pt-6">
                <FaBookmark className='text-white' />
                <span className={`${!open && 'hidden'}`}>Saved</span>
              </li>
            </button>
            <button className='flex justify-between text-[#f0f8ff]  w-full h-16 px-4 rounded-lg hover:bg-[#0d2035] hover:shadow-md' >
              <li className="flex items-center gap-4 pt-6">
                <FaGraduationCap className='text-white' />
                <span className={`${!open && 'hidden'}`}>Learn</span>
                <FaChevronDown className={` w-3 h-3 ml-20 ${!open && 'hidden'}`} />
              </li>
            </button>
            <button className='flex justify-between text-[#f0f8ff]  w-full h-16 px-4 rounded-lg hover:bg-[#0d2035] hover:shadow-md' >
              <li className="flex items-center gap-4 pt-6">
                <FaBriefcase className='text-white' />
                <span className={`${!open && 'hidden'}`}>Portfolio</span>
              </li>
            </button>
            <button className='flex justify-between text-[#f0f8ff]  w-full h-16 px-4 rounded-lg hover:bg-[#0d2035] hover:shadow-md' >
              <li className="flex items-center gap-4 pt-6">
                <FaCog className='text-white' />
                <span className={`${!open && 'hidden'}`}>Settings</span>
              </li>
            </button>
            <button className='flex justify-between text-[#f0f8ff]  w-full h-16 px-4 rounded-lg hover:bg-[#0d2035] hover:shadow-md' >
              <li className="flex items-center gap-4 pt-6">
                <FaCode className='text-white' />
                <span className={`${!open && 'hidden'}`}>API For Devs</span>
              </li>
            </button>
          </ul>
        </div>
        <div className={`flex flex-col items-center justify-center min-h-24 ${!open && 'hidden'}`}>
          <div className='pt-6 pb-0'>
            <button className={`flex justify-center w-56 px-4 py-3 text-sm font-medium text-gray-400 border-2 border-gray-600 rounded-lg gap-2 outline-none bg-transparent hover:text-gray-200 hover:border-gray-400 transition-colors duration-150 ${!open && 'hidden'}`}>
              <FaArrowRight className="h-4 w-4 text-Teal-800" />
              Start Trial
            </button>
          </div>
        </div>
        <div className="mt-auto px-8 py-4 flex justify-end border-y border-slate-700">
          <button onClick={handleToggleSidebar}>
            <FaChevronLeft className={`${open ? '' : 'rotate-180'} transition-transform duration-300`} />
          </button>
        </div>
      </div>
      <div className='flex-1'>
        <SearchBar />
        <div>
          <CirclesGraph />
        </div>
      </div>
    </div>
  )
}