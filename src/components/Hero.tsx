import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Секция Hero — огромная типографика на весь экран.
 * GSAP-анимация появления при загрузке страницы.
 */
const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Анимация появления заголовка
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(titleRef.current, {
      opacity: 1,
      duration: 1.2,
      delay: 0.3,
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          duration: 0.8,
        },
        '-=0.4'
      )
      .to(
        scrollRef.current,
        {
          opacity: 1,
          duration: 0.6,
        },
        '-=0.2'
      );
  }, []);

  return (
    <section className="hero" id="hero">
      <h1 ref={titleRef} className="hero__title">
        Hero
        <br />
        Design
      </h1>
      <p ref={subtitleRef} className="hero__subtitle">
        Creative Studio
      </p>
      <span ref={scrollRef} className="hero__scroll">
        Scroll to explore
      </span>
    </section>
  );
};

export default Hero;
