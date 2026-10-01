import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatCard from './StatCard';
import Header from './Header';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const carRef = useRef(null);
  
  const welcomeWord = "WELCOME".split('');
  const itzfizzWord = "ITZFIZZ".split('');

  const stats = [
    { value: '58', label: 'Increase in', subLabel: 'pick up point use' },
    { value: '23', label: 'Decreased in', subLabel: 'customer phone calls' },
    { value: '27', label: 'Increase in', subLabel: 'pick up point use' },
    { value: '40', label: 'Decreased in', subLabel: 'customer phone calls' }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Setup initial CSS states to avoid flash of unstyled content
      gsap.set('.outline-char', { WebkitTextStroke: '2px #000', color: 'transparent' });
      gsap.set('.solid-char', { color: '#000', opacity: 0, scale: 1 });
      gsap.set('.intro-fade', { opacity: 0, y: 20 });
      gsap.set('.car-intro-wrapper', { opacity: 0, x: '-5vw' });

      // 1. INTRO ANIMATION (Plays once on load)
      const tlIntro = gsap.timeline();
      tlIntro.to('.hero-header', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0)
             .to('.stat-top', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, 0.2)
             .to('.char-wrapper.welcome', { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: 'power3.out' }, 0.4)
             .to('.car-intro-wrapper', { x: '0vw', opacity: 1, duration: 1.5, ease: 'power3.out' }, 0.5)
             .to('.char-wrapper.itzfizz', { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: 'power3.out' }, 0.6)
             .to('.stat-bottom', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, 0.8)
             .to('.scroll-indicator', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.0);

      // 2. SCROLL ANIMATION (Driven entirely by user scroll)
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // Defines how long the hero stays pinned
          scrub: 1,      // Smoothly scrubs timeline
          pin: true,     // Pins the container perfectly
          anticipatePin: 1
        }
      });

        // Move car completely across the road safely
      // Start exactly at left edge (0vw), end exactly at right edge (100vw minus its own width via xPercent)
      tlScroll.fromTo(carRef.current, 
        { x: '0vw', xPercent: 0 }, 
        { x: '100vw', xPercent: -100, ease: 'none', duration: 1 }, 
      0);

      // Micro-animations for car (subtle suspension, no bouncing)
      tlScroll.to(carRef.current, { rotation: 0.2, y: -1, duration: 0.25, ease: 'sine.inOut' }, 0)
              .to(carRef.current, { rotation: -0.2, y: 1, duration: 0.25, ease: 'sine.inOut' }, 0.25)
              .to(carRef.current, { rotation: 0.2, y: -1, duration: 0.25, ease: 'sine.inOut' }, 0.5)
              .to(carRef.current, { rotation: 0, y: 0, duration: 0.25, ease: 'sine.inOut' }, 0.75);

      // Smooth Letter Reveal: use fromTo to guarantee GSAP state doesn't conflict with intro
      const allSolidChars = gsap.utils.toArray('.solid-char');
      const charWrappers = gsap.utils.toArray('.char-wrapper');
      
      charWrappers.forEach((wrapper, i) => {
        // Calculate relative position of each character across the screen (0 to 1)
        const charCenterRatio = (i + 0.5) / charWrappers.length; 
        // Trigger reveal slightly before the car reaches the letter
        const triggerProgress = charCenterRatio; 
        
        if (triggerProgress >= 0 && triggerProgress <= 1) {
          const startTime = Math.max(0, triggerProgress - 0.15); 
          const solidChar = allSolidChars[i];
          const outlineChar = wrapper.querySelector('.outline-char');
          
          // Phase 1: Car approaches -> fill letter with solid black
          tlScroll.fromTo(solidChar, { opacity: 0, scale: 1 }, { opacity: 1, scale: 1.05, duration: 0.15, ease: 'power1.inOut' }, startTime)
                  .fromTo(outlineChar, { opacity: 1 }, { opacity: 0, duration: 0.15, ease: 'power1.inOut' }, startTime);
                  
          // Phase 2: Car passes -> revert back to outline
          tlScroll.fromTo(solidChar, { opacity: 1, scale: 1.05 }, { opacity: 0, scale: 1, duration: 0.15, ease: 'power1.inOut' }, startTime + 0.15)
                  .fromTo(outlineChar, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power1.inOut' }, startTime + 0.15);
        }
      });

      // Fade out scroll indicator immediately on scroll start
      tlScroll.to('.scroll-indicator', { opacity: 0, duration: 0.05 }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white text-black flex flex-col justify-between pt-[70px] md:pt-[90px] pb-[30px] md:pb-[50px]">
      <div className="hero-header intro-fade absolute top-0 left-0 w-full z-50"><Header /></div>

      {/* Top Stats */}
      <div className="w-full max-w-[1440px] mx-auto px-[8%] md:px-[20%] flex flex-row justify-between z-10 stat-top-container shrink-0">
        <div className="stat-top intro-fade"><StatCard stat={stats[0]} /></div>
        <div className="stat-top intro-fade"><StatCard stat={stats[1]} /></div>
      </div>

      {/* CORE CENTER BLOCK (Tight Spacing, Full Width Road) */}
      <div className="w-full flex flex-col items-center justify-center gap-1 md:gap-3 shrink-0">
        
        {/* WELCOME */}
        <div className="w-full max-w-[1440px] mx-auto flex justify-between px-[8%] md:px-[10%] z-10 pointer-events-none">
          {welcomeWord.map((char, i) => (
            <div key={i} className="char-wrapper welcome intro-fade relative inline-block text-[min(15vw,9vh)] md:text-[min(9.5vw,13vh)] font-black leading-none font-sans tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="outline-char block">{char}</span>
              <span className="solid-char absolute top-0 left-0 w-full text-center">{char}</span>
            </div>
          ))}
        </div>

        {/* ROAD & CAR */}
        {/* Road is a direct w-full child, naturally spanning edge-to-edge without hacks */}
        <div className="relative w-full h-[8vh] min-h-[60px] max-h-[150px] md:h-[15vh] md:min-h-[100px] md:max-h-[150px] bg-[#1a1a1a] shadow-2xl z-20 flex flex-col justify-between">
          <div className="w-full h-[1px] md:h-[2px] bg-white opacity-40"></div>
          
          {/* Dashed Lane Markings */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] md:h-[3px] opacity-70" style={{
            backgroundImage: 'linear-gradient(90deg, #fff 0%, #fff 40%, transparent 40%, transparent 100%)',
            backgroundSize: '120px 100%'
          }}></div>
          
          <div className="w-full h-[1px] md:h-[2px] bg-white opacity-40"></div>

          {/* Car Intro Wrapper */}
          <div className="car-intro-wrapper absolute top-1/2 -translate-y-1/2 left-0 w-full">
            {/* Car Scroll Wrapper */}
            <div ref={carRef} className="flex items-center will-change-transform w-[120px] h-[50px] md:w-[260px] md:h-[110px]">
              {/* Smooth Green Motion Trail (Reference Match) */}
              <div className="absolute right-[80%] w-[150px] md:w-[350px] h-[10px] md:h-[18px] flex pointer-events-none opacity-90 z-0">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#22c55e80] to-[#4ade80] blur-[4px] md:blur-[8px] rounded-full scale-y-150"></div>
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4ade80] to-[#ffffff] shadow-[0_0_15px_#4ade80]"></div>
              </div>
              {/* Car Image */}
              <img 
                src="/car-image.png?v=2" 
                alt="Car" 
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] md:drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" 
              />
            </div>
          </div>
        </div>

        {/* ITZFIZZ */}
        <div className="w-full max-w-[1440px] mx-auto flex justify-between px-[12%] md:px-[20%] z-10 pointer-events-none">
          {itzfizzWord.map((char, i) => (
            <div key={i + 7} className="char-wrapper itzfizz intro-fade relative inline-block text-[min(15vw,9vh)] md:text-[min(9.5vw,13vh)] font-black leading-none font-sans tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="outline-char block">{char}</span>
              <span className="solid-char absolute top-0 left-0 w-full text-center">{char}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Stats */}
      <div className="w-full max-w-[1440px] mx-auto px-[8%] md:px-[25%] flex flex-row justify-between z-10 stat-bottom-container shrink-0">
        <div className="stat-bottom intro-fade"><StatCard stat={stats[2]} /></div>
        <div className="stat-bottom intro-fade"><StatCard stat={stats[3]} /></div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator intro-fade absolute bottom-[2vh] md:bottom-[3vh] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <div className="w-[1px] h-6 md:h-10 bg-black mb-1 md:mb-2"></div>
        <span className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-bold text-black mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Scroll Down</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>

    </section>
  );
};

export default Hero;

