'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedFadeInProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
};

export default function AnimatedFadeIn({
  children,
  className = '',
  threshold = 0.1,
}: AnimatedFadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`fade-in-section ${
        isVisible ? 'is-visible' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
