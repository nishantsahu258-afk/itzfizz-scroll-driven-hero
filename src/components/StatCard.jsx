import React from 'react';

const StatCard = ({ stat }) => {
  return (
    <div className="flex items-start">
      {/* Left divider line with dot */}
      <div className="flex flex-col items-center mr-4 pt-[6px]">
        <div className="w-1.5 h-1.5 rounded-full bg-black mb-0"></div>
        <div className="w-[1px] h-[65px] md:h-[80px] bg-black"></div>
      </div>

      <div className="flex flex-col">
        <div className="text-4xl md:text-[50px] font-bold text-black leading-none tracking-tight">
          {stat.value}<span className="text-2xl md:text-[34px]">%</span>
        </div>
        <div className="mt-2 text-xs md:text-[14px] text-black/70 leading-snug font-medium">
          {stat.label} <br /> {stat.subLabel}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
