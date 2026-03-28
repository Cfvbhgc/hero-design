import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 6 проектов — названия крупным текстом
const projects = [
  { name: 'Lumiere Branding', category: 'Brand Identity', image: '/images/work-1.jpg' },
  { name: 'Oasis Resort', category: 'Hospitality', image: '/images/work-2.jpg' },
  { name: 'Nova Architecture', category: 'Architecture', image: '/images/work-3.jpg' },
  { name: 'Pulse Magazine', category: 'Editorial', image: '/images/service-3.jpg' },
  { name: 'Zen Gardens', category: 'Landscape', image: '/images/work-4.jpg' },
  { name: 'Metro Gallery', category: 'Art & Culture', image: '/images/work-6.jpg' },
];

const Work: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Image follows cursor — GSAP quickSetter для плавности
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: e.clientX - 175,
        y: e.clientY - 125,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, []);

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
    <section
      ref={sectionRef}
      className="work"
      onMouseMove={handleMouseMove}
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
        className={`work__hover-image ${hoveredIdx !== null ? 'is-visible' : ''}`}
      />
    </section>
  );
};

export default Work;
