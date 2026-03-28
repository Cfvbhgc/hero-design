import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// About — крупный текст, reveal по словам при скролле
const aboutText =
  'We are a creative studio obsessed with bold ideas and refined execution. Every project is a chance to push boundaries and craft something unforgettable. Design is not decoration — it is strategy made visible.';

const About: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll('.word');

    // GSAP ScrollTrigger — каждое слово анимируется по мере скролла
    gsap.fromTo(
      words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      }
    );
  }, []);

  // Оборачиваем каждое слово в span
  const renderWords = () =>
    aboutText.split(' ').map((word, i) => (
      <span key={i} className="word">
        {word}
      </span>
    ));

  return (
    <section ref={sectionRef} className="about">
      <div className="about__content">
        <p className="about__label">About Us</p>

        <p ref={textRef} className="about__text">
          {renderWords()}
        </p>

        <div className="about__bottom">
          <div className="about__stat">
            <span className="about__stat-number">50+</span>
            <span className="about__stat-label">Projects Delivered</span>
          </div>
          <div className="about__stat">
            <span className="about__stat-number">7</span>
            <span className="about__stat-label">Years Experience</span>
          </div>
          <div className="about__stat">
            <span className="about__stat-number">12</span>
            <span className="about__stat-label">Awards Won</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
