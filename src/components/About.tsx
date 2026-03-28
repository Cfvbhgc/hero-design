import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// About — крупный текст, reveal по словам при скролле
const aboutText =
  'We are a creative studio obsessed with bold ideas and refined execution. Every project is a chance to push boundaries and craft something unforgettable. Design is not decoration — it is strategy made visible.';

const About: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
    []
  );

  useEffect(() => {
    if (!textRef.current) return;

    if (isMobile) {
      // Мобильные: Framer Motion handles animation
      return;
    }

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
  }, [isMobile]);

  // Оборачиваем каждое слово в span
  const renderWords = () =>
    aboutText.split(' ').map((word, i) => (
      <span key={i} className="word">
        {word}
      </span>
    ));

  return (
    <motion.section
      ref={sectionRef}
      className="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="about__content">
        <p className="about__label">About Us</p>

        <motion.p
          ref={textRef}
          className="about__text"
          initial={isMobile ? { opacity: 0, y: 30 } : undefined}
          whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
          viewport={isMobile ? { once: true, amount: 0.3 } : undefined}
          transition={isMobile ? { duration: 0.8, ease: 'easeOut' } : undefined}
        >
          {renderWords()}
        </motion.p>

        <motion.div
          className="about__bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
