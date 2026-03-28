import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Секция About — асимметричная раскладка с текстом и изображением.
 * Анимация появления при скролле.
 */
const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация текста — появление снизу
      gsap.from(textRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // Анимация изображения — появление с задержкой
      gsap.from(imageRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__text" ref={textRef}>
        <p className="about__label">About Us</p>
        <h2 className="about__heading">
          Designing brands that resonate
        </h2>
        <p className="about__description">
          We create brand identities, digital experiences, and visual stories
          that move people. Our approach blends strategy with aesthetics,
          delivering work that is both meaningful and memorable.
        </p>
      </div>
      <div className="about__image" ref={imageRef}>
        <img
          src={process.env.PUBLIC_URL + '/images/about.jpg'}
          alt="Creative studio workspace"
        />
      </div>
    </section>
  );
};

export default About;
