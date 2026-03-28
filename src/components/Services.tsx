import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Услуги — нумерованный список с фоновыми картинками
const services = [
  { num: '01', name: 'Concepting', image: '/images/service-1.jpg' },
  { num: '02', name: 'Branding', image: '/images/service-2.jpg' },
  { num: '03', name: 'Digital', image: '/images/service-3.jpg' },
  { num: '04', name: 'Motion', image: '/images/service-4.jpg' },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    // Reveal-анимация каждого пункта при скролле
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="services"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Фоновые изображения — crossfade */}
      {services.map((s, i) => (
        <img
          key={s.num}
          src={s.image}
          alt=""
          loading="lazy"
          className={`services__bg-image ${activeIdx === i ? 'is-active' : ''}`}
        />
      ))}

      <p className="services__header">What We Do</p>

      <ul className="services__list">
        {services.map((s, i) => (
          <li
            key={s.num}
            ref={(el) => { itemsRef.current[i] = el; }}
            className="services__item"
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <span className="services__number">{s.num}</span>
            <span className="services__name">{s.name}</span>
            {/* Мобильное изображение — всегда видимо */}
            <img
              src={s.image}
              alt={s.name}
              loading="lazy"
              className="services__item-image"
            />
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default Services;
