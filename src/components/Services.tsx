import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Данные услуг — название, количество проектов, описание */
const services = [
  {
    name: 'Brand Identity',
    count: 40,
    suffix: '+',
    desc: 'Crafting visual identities that capture the essence of your brand and connect with your audience.',
  },
  {
    name: 'Web Design',
    count: 25,
    suffix: '+',
    desc: 'Designing immersive digital experiences that blend form and function seamlessly.',
  },
  {
    name: 'Art Direction',
    count: 15,
    suffix: '+',
    desc: 'Guiding the visual narrative across campaigns, shoots, and creative productions.',
  },
];

/**
 * Секция Services — три услуги с анимированными счётчиками.
 * Числа увеличиваются при попадании в зону видимости.
 */
const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Появление блоков услуг
      gsap.from('.services__item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      });

      // Анимация счётчиков — запускаем один раз при скролле
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          services.forEach((service, index) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: service.count,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts((prev) => {
                  const next = [...prev];
                  next[index] = Math.round(obj.val);
                  return next;
                });
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services" id="services" ref={sectionRef}>
      <p className="services__label">Services</p>
      <div className="services__grid">
        {services.map((service, index) => (
          <div key={service.name} className="services__item">
            <div className="services__number">
              {counts[index]}
              {service.suffix}
            </div>
            <h3 className="services__name">{service.name}</h3>
            <p className="services__desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
