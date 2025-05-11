import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  width?: string;
  height?: string;
}

const AnimatedLogo = ({ width = "40px", height = "40px" }: AnimatedLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>(0);

  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Устанавливаем размеры canvas
    canvas.width = parseInt(width);
    canvas.height = parseInt(height);

    // Предварительно вычисляем некоторые значения
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    // Максимальная частота кадров
    const targetFps = isMobile ? 15 : 30;
    const frameInterval = 1000 / targetFps;

    const drawGradient = (timestamp: number) => {
      // Ограничиваем FPS
      const elapsed = timestamp - previousTimeRef.current;
      if (elapsed < frameInterval) {
        requestRef.current = requestAnimationFrame(drawGradient);
        return;
      }

      previousTimeRef.current = timestamp - (elapsed % frameInterval);

      // Расчет времени и замедление для мобильных
      const time = (timestamp * 0.001) * (isMobile ? 0.3 : 1);

      // Очистка холста
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Рассчитываем позицию градиента с меньшей амплитудой для мобильных
      const oscillationScale = isMobile ? 0.05 : 0.1;
      const gradientCenterX = centerX + Math.sin(time) * centerX * oscillationScale;
      const gradientCenterY = centerY + Math.cos(time) * centerY * oscillationScale;

      // Создаем градиент с меньшим количеством цветовых переходов для мобильных
      const gradient = ctx.createRadialGradient(
        gradientCenterX,
        gradientCenterY,
        0,
        centerX,
        centerY,
        canvas.width * 0.8
      );

      // Упрощенные цвета для мобильных устройств
      if (isMobile) {
        gradient.addColorStop(0, 'rgba(110, 50, 255, 0.9)');
        gradient.addColorStop(0.5, 'rgba(40, 90, 255, 0.7)');
        gradient.addColorStop(1, 'rgba(30, 30, 120, 0.8)');
      } else {
        // Для десктопов используем более сложный градиент с анимацией
        gradient.addColorStop(0, `rgba(110, 50, 255, ${0.8 + Math.sin(time) * 0.1})`);
        gradient.addColorStop(0.3, `rgba(60, 80, 255, ${0.7 + Math.cos(time) * 0.05})`);
        gradient.addColorStop(0.6, `rgba(20, 120, 255, ${0.8 + Math.sin(time * 0.5) * 0.05})`);
        gradient.addColorStop(1, 'rgba(30, 30, 120, 0.8)');
      }

      // Рисуем градиентный фон
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Добавляем эффект свечения только на десктопе или с меньшей интенсивностью на мобильных
      if (!isMobile || (isMobile && Math.floor(time) % 3 === 0)) {
        // Создаем радиальный градиент для свечения
        const glowGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, canvas.width * 0.5
        );

        if (isMobile) {
          // Упрощенный градиент свечения для мобильных
          glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
          glowGradient.addColorStop(1, 'rgba(50, 50, 200, 0)');
        } else {
          // Полноценный градиент для десктопов
          glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          glowGradient.addColorStop(0.2, 'rgba(200, 200, 255, 0.3)');
          glowGradient.addColorStop(0.5, 'rgba(100, 100, 255, 0.1)');
          glowGradient.addColorStop(1, 'rgba(50, 50, 200, 0)');
        }

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      // Запрашиваем следующий кадр
      requestRef.current = requestAnimationFrame(drawGradient);
    };

    // Запускаем анимацию
    requestRef.current = requestAnimationFrame(drawGradient);

    // Очистка при размонтировании
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [width, height, isMobile]);

  return (
    <motion.div
      style={{ width, height, borderRadius: '50%', overflow: 'hidden' }}
      // Уменьшаем сложность анимации для мобильных
      animate={isMobile ? { rotate: [0, 3, 0] } : { rotate: [0, 5, 0, -5, 0] }}
      transition={{
        duration: isMobile ? 7 : 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          willChange: 'transform'  // Улучшает производительность анимаций
        }}
      />
    </motion.div>
  );
};

export default AnimatedLogo;
