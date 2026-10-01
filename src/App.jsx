import React from 'react';
import Hero from './components/Hero';

function App() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-black selection:text-white text-black overflow-x-hidden">
      <Hero />
      
      {/* Below the fold content to allow scrolling */}
      <section className="relative min-h-[50vh] flex flex-col items-start justify-center bg-[#0a0a0a] overflow-hidden px-6 md:px-24 py-24 text-white z-10" style={{ clipPath: 'polygon(0 0, 100% 8vw, 100% 100%, 0% 100%)' }}>
        
        {/* Blurred background foliage for footer */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[url('https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover opacity-30 filter blur-[40px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[url('https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover opacity-20 filter blur-[40px] mix-blend-screen pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between w-full max-w-[1400px] mx-auto items-start md:items-end gap-12 relative z-10 pt-16">
          
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6 text-[#4ade80] text-[11px] font-bold tracking-[0.2em] uppercase">
              <span className="w-[6px] h-[6px] rounded-full bg-[#4ade80]"></span>
              Our Approach
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium text-white leading-[1.1] tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              Turning ideas into <br/> real world experiences.
            </h2>
          </div>
          
          <div className="max-w-sm text-[15px] text-white/50 leading-relaxed font-sans border-t border-white/20 pt-8 md:border-t-0 md:pt-0 md:pb-2">
            <div className="w-12 h-[1px] bg-white/20 mb-6 hidden md:block"></div>
            <p>
              We craft digital products, websites and experiences that help brands grow and connect with their users.
            </p>
          </div>
          
        </div>
      </section>
    </div>
  );
}

export default App;
