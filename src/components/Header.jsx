import React from 'react';

const Header = () => {
  return (
    <header className="w-full px-6 md:px-12 lg:px-20 pt-6 md:pt-8 pb-4 flex justify-between items-center text-black z-50">
      <div className="text-2xl md:text-[28px] font-bold tracking-tight flex items-start">
        itzfizz<span className="text-black text-[8px] ml-0.5 pt-1.5">&#9679;</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        <nav className="flex gap-8 text-[13px] font-medium tracking-wide">
          <a href="#" className="hover:opacity-70 transition-opacity">Work</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Services</a>
          <a href="#" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Careers</a>
        </nav>
        <button className="bg-black text-white px-5 py-2.5 rounded-full text-[13px] font-medium flex items-center gap-2 hover:bg-neutral-800 transition-colors">
          Let's Talk <span className="text-lg leading-none">&rarr;</span>
        </button>
      </div>
      
      {/* Mobile Menu Icon */}
      <div className="md:hidden flex flex-col gap-1.5 justify-center items-center w-8 h-8 cursor-pointer">
        <div className="w-6 h-[2px] bg-black"></div>
        <div className="w-6 h-[2px] bg-black"></div>
        <div className="w-6 h-[2px] bg-black"></div>
      </div>
    </header>
  );
};

export default Header;
