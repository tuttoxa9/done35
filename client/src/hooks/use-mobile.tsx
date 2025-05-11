import { useState, useEffect } from 'react';

/**
 * Хук для определения мобильных устройств с кэшированием результата
 * @param mobileWidth Ширина экрана, ниже которой устройство считается мобильным (по умолчанию 768px)
 * @returns Булево значение, указывающее, является ли устройство мобильным
 */
export function useMobile(mobileWidth = 768): boolean {
  // Используем состояние для хранения информации о типе устройства
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Изначально проверяем User Agent и ширину окна при монтировании
    if (typeof window === 'undefined') return false;

    return window.innerWidth < mobileWidth ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  });

  useEffect(() => {
    // Функция для определения мобильного устройства
    const checkMobile = () => {
      const mobile = window.innerWidth < mobileWidth;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };

    // Подписываемся на событие изменения размера окна, но с дебаунсингом
    let resizeTimer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100); // дебаунсинг 100мс
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isMobile, mobileWidth]);

  return isMobile;
}

export default useMobile;
