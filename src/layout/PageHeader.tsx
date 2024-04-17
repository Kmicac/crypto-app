import { useState } from 'react'
import logo from '../assets/MoralisMoneyLogomark.5b65b0d7.svg'
import logo1 from '../assets/MoralisMoneyLogotype.431faf8b.svg'
import { FaChartBar, FaChevronDown, FaSearch, FaBookmark, FaGraduationCap, FaBriefcase, FaCode, FaCog, FaChevronLeft } from 'react-icons/fa';
import SearchBar from './SearchBar';

export function PageHeader() {
  const [open, setOpen] = useState(true);

  const handleToggleSidebar = () => {
    setOpen(!open);
  }

  return (
    <div className='flex'>
      <div className={`flex flex-col ${open ? "w-64" : "w-18"} h-screen bg-sky-950 bg-opacity-50 transition-all duration-300 pt-1`}>
        <div className='px-6 pt-6 mb-6'>
          <a className='flex gap-3' href="/">
            <img src={logo} className={`h-8 ${!open ? 'absolute pt-0' : 'flex'}`} />
            <img src={logo1} className={`h-6 ${!open && 'hidden'}`} />
          </a>
        </div>
        <ul className={`flex flex-col gap-4 px-8 ${!open && 'hidden'}`}>
          <li className="flex items-center gap-4 pt-6">
            <FaChartBar className="text-white" />
            <span className={`${!open && 'hidden'}`}>Market Overview</span>
            <FaChevronDown className="text-white" />
          </li>
          <li className="flex items-center gap-4 pt-6">
            <FaSearch className="text-white" />
            <span className={`${!open && 'hidden'}`}>Research</span>
            <FaChevronDown className="text-white" />
          </li>
          <li className="flex items-center gap-4 pt-6">
            <FaBookmark className="text-white" />
            <span className={`${!open && 'hidden'}`}>Saved</span>
          </li>
          <li className="flex items-center gap-4 pt-6">
            <FaGraduationCap className="text-white" />
            <span className={`${!open && 'hidden'}`}>Learn</span>
            <FaChevronDown className="text-white" />
          </li>
          <li className="flex items-center gap-4 pt-6">
            <FaBriefcase className="text-white" />
            <span className={`${!open && 'hidden'}`}>Portfolio</span>
          </li>
          <li className="flex items-center gap-4 pt-6">
            <FaCog className="text-white" />
            <span className={`${!open && 'hidden'}`}>Settings</span>
          </li>
          <li className="flex items-center gap-4 pt-6">
            <FaCode className="text-white" />
            <span className={`${!open && 'hidden'}`}>API For Devs</span>
          </li>
        </ul>
        <div className="mt-auto px-8 py-4 flex justify-center border-y border-slate-700">
          <button onClick={handleToggleSidebar}>
            <FaChevronLeft className={`${open ? '' : 'rotate-180'} transition-transform duration-300`} />
          </button>
        </div>
      </div>
      <div className='flex-1'>
        <SearchBar />
      </div>
    </div>
  )
}