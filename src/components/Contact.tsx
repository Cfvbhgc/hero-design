import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Contact — "LET'S TALK" огромными буквами
const Contact: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="contact">
      <p className="contact__label">Get In Touch</p>

      <a href="mailto:hello@herodesign.studio">
        <h2 ref={titleRef} className="contact__title">
          LET'S
          <br />
          TALK
        </h2>
      </a>

      <a href="mailto:hello@herodesign.studio" className="contact__email">
        hello@herodesign.studio
      </a>

      <footer className="contact__footer">
        <span>&copy; 2024 Hero Design Studio</span>
        <div className="contact__footer-links">
          <a href="#top">Instagram</a>
          <a href="#top">Behance</a>
          <a href="#top">Dribbble</a>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
