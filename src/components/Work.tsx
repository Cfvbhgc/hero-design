import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Данные проектов — имя, категория, путь к изображению */
const projects = [
  { name: 'Lumiere Branding', category: 'Brand Identity', image: '/images/project-1.jpg' },
  { name: 'Oasis Resort', category: 'Digital Design', image: '/images/project-2.jpg' },
  { name: 'Nova Architecture', category: 'Art Direction', image: '/images/project-3.jpg' },
  { name: 'Pulse Magazine', category: 'Editorial', image: '/images/project-4.jpg' },
  { name: 'Zen Gardens', category: 'Brand Identity', image: '/images/project-5.jpg' },
  { name: 'Metro Gallery', category: 'Web Design', image: '/images/project-6.jpg' },
];

/**
 * Секция Work — список проектов с превью-изображением,
 * которое следует за курсором при наведении.
 */
const Work: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Поочерёдное появление элементов списка
      gsap.from('.work__item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Отслеживание курсора для превью изображения
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (previewRef.current) {
      previewRef.current.style.left = `${e.clientX}px`;
      previewRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    setActiveProject(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <section className="work" id="work" ref={sectionRef} onMouseMove={handleMouseMove}>
      <p className="work__label">Selected Work</p>
      <div className="work__list">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="work__item hoverable"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="work__item-name">{project.name}</span>
            <span className="work__item-category">{project.category}</span>
          </div>
        ))}
      </div>

      {/* Превью — изображение, следующее за курсором */}
      <div
        ref={previewRef}
        className={`work__preview ${activeProject !== null ? 'visible' : ''}`}
      >
        {activeProject !== null && (
          <img
            src={process.env.PUBLIC_URL + projects[activeProject].image}
            alt={projects[activeProject].name}
          />
        )}
      </div>
    </section>
  );
};

export default Work;
