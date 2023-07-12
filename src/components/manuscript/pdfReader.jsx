import React from 'react';
import css from './product.module.css'
import { useEffect, useRef, useState } from 'react';



export default function PDFReader({pdfUrl, setIsTimerRunning}) {
  const iframeRef = useRef(null);
  function handleIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Функція, яку ви хочете виконати при прокрутці до <iframe>
        setIsTimerRunning(true);
        
        // Зупинити спостереження, якщо вам більше не потрібно відслідковувати
        observer.unobserve(entry.target);
      }
    });
  }

  
  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      const observer = new IntersectionObserver(handleIntersect, { threshold: 0 });
      observer.observe(iframe);

      return () => {
        observer.unobserve(iframe);
      };
    }
  }, []);

  return (
    <div className={css.frameWrap}>
      <iframe
        src={pdfUrl}
       className={css.frameStyle}
        ref={iframeRef}
        frameBorder="0"
      />
    </div>
  );
}
