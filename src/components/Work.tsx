import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// 6 проектов — названия крупным текстом
const projects = [
  { name: 'Lumiere Branding', category: 'Brand Identity', image: '/images/work-1.jpg' },
  { name: 'Oasis Resort', category: 'Hospitality', image: '/images/work-2.jpg' },
  { name: 'Nova Architecture', category: 'Architecture', image: '/images/work-3.jpg' },
  { name: 'Pulse Magazine', category: 'Editorial', image: '/images/work-4.jpg' },
  { name: 'Zen Gardens', category: 'Landscape', image: '/images/work-5.jpg' },
  { name: 'Metro Gallery', category: 'Art & Culture', image: '/images/work-6.jpg' },
];

const Work: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches,
    []
  );

  // Image follows cursor — GSAP quickSetter для плавности
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: e.clientX - 175,
        y: e.clientY - 125,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isMobile]);

  useEffect(() => {
    // Scroll reveal для каждого проекта
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.08,
        }
      );
    });
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="work"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="work__header">Selected Work</p>

      <ul className="work__list">
        {projects.map((p, i) => (
          <li
            key={p.name}
            ref={(el) => { itemsRef.current[i] = el; }}
            className="work__item"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Статичное изображение для мобильных — СВЕРХУ */}
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="work__item-static-image"
            />
            <div className="work__item-inner">
              <span className="work__item-number">0{i + 1}</span>
              <span className="work__item-name">{p.name}</span>
              <span className="work__item-category">{p.category}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Hover image — следует за курсором */}
      <img
        ref={imageRef}
        src={hoveredIdx !== null ? projects[hoveredIdx].image : ''}
        alt=""
        loading="lazy"
        className={`work__hover-image ${hoveredIdx !== null ? 'is-visible' : ''}`}
      />
    </motion.section>
  );
};

export default Work;
