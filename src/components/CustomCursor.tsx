import React, { useEffect, useRef } from 'react';

/**
 * Кастомный курсор — кружок, который увеличивается при наведении
 * на интерактивные элементы. Только для десктопа.
 */
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Проверяем, есть ли тач-устройство
    const isTouchDevice = window.matchMedia('(max-width: 768px)').matches;
    if (isTouchDevice) return;

    document.body.classList.add('custom-cursor-active');
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Отслеживаем позицию мыши
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    // Увеличиваем курсор при наведении на ссылки и кнопки
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hoverable')
      ) {
        cursor.classList.add('hover');
      }
    };

    const onMouseOut = () => {
      cursor.classList.remove('hover');
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
