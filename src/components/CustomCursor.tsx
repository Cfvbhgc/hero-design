import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Custom cursor — кружок, mix-blend-mode: difference
// Растёт при hover на интерактивные элементы
const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Не инициализировать на тач-устройствах
    if (isTouchDevice()) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Быстрое следование за мышью через GSAP
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    // Hover state для интерактивных элементов
    const handleMouseEnter = () => cursor.classList.add('is-hovering');
    const handleMouseLeave = () => cursor.classList.remove('is-hovering');

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, .services__item, .work__item, .contact__title'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Даем DOM подгрузиться
    const timer = setTimeout(addHoverListeners, 500);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearTimeout(timer);
    };
  }, []);

  // Не рендерим на тач-устройствах
  if (typeof window !== 'undefined' && isTouchDevice()) return null;

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
