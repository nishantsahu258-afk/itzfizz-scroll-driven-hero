import React, { forwardRef } from 'react';

const Car = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="absolute z-20 will-change-transform top-1/2 -translate-y-1/2 flex items-center justify-center" style={{ width: '280px', height: '120px', left: '0' }}>
      
      {/* Light Trail Effect */}
      <div className="absolute right-[90%] w-[200px] h-[30px] flex pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#22c55e40] to-[#4ade8090] blur-[4px] rounded-l-full"></div>
        <div className="absolute top-[8px] w-full h-[2px] bg-gradient-to-r from-transparent to-[#4ade80] shadow-[0_0_8px_#4ade80]"></div>
        <div className="absolute bottom-[8px] w-full h-[2px] bg-gradient-to-r from-transparent to-[#4ade80] shadow-[0_0_8px_#4ade80]"></div>
      </div>

      {/* High-quality UI Car Image */}
      <img 
        src="/car-image.png" 
        alt="Orange Sports Car" 
        className="w-[110%] h-auto relative z-10 drop-shadow-2xl" 
        style={{ objectFit: 'contain', transform: 'scale(1.15)' }} 
      />
    </div>
  );
});

export default Car;
