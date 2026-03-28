import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Hero секция — split-screen layout
// LEFT: "HERO" вертикально, RIGHT: фото в нестандартной форме
const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Входная анимация — появление элементов
    tl.fromTo(
      titleRef.current,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1, clipPath: 'polygon(15% 0%, 100% 0%, 100% 0%, 85% 0%, 0% 0%, 0% 15%)' },
        {
          opacity: 1,
          scale: 1,
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)',
          duration: 1.4,
          ease: 'power3.inOut',
        },
        '-=0.8'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );
  }, []);

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero__left">
        <h1 ref={titleRef} className="hero__title">
          HERO
        </h1>
      </div>

      <div className="hero__right">
        <div ref={imageRef} className="hero__image-wrapper">
          <img
            src="/images/hero.jpg"
            alt="Hero Design Studio"
            className="hero__image"
          />
        </div>
      </div>

      <p ref={subtitleRef} className="hero__subtitle">
        Creative Design Studio &mdash; Est. 2019
      </p>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
