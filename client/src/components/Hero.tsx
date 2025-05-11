import { useState } from "react";
import { Button } from "@/lib/ui-components";
import { ChevronRight, Wallet, Clock, Users, Smartphone, Zap, ArrowRight } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

// Оптимизированный компонент для фоновых элементов
function BackgroundElements({ isMobile }: { isMobile: boolean }) {
  // На мобильных устройствах показываем меньше фоновых элементов или более легкие версии
  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 right-[5%] w-36 h-36 bg-primary/20 rounded-full"></div>
        <div className="absolute bottom-[15%] right-[15%] w-48 h-48 bg-pink-500/10 rounded-full"></div>
      </div>
    );
  }

  // Полная версия для десктопа
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute top-10 right-[5%] w-48 h-48 bg-primary/30 rounded-full filter blur-[60px]"></div>
      <div className="absolute top-[30%] left-[10%] w-56 h-56 bg-secondary/30 rounded-full filter blur-[50px]"></div>
      <div className="absolute bottom-[15%] right-[15%] w-64 h-64 bg-pink-500/20 rounded-full filter blur-[70px]"></div>
      <div className="absolute top-[15%] left-[30%] w-40 h-40 bg-indigo-500/15 rounded-full filter blur-[80px]"></div>
    </div>
  );
}

export default function Hero() {
  const isMobile = useMobile();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <section className="relative pt-14 pb-16 overflow-hidden">
      {/* Условный рендеринг оптимизированных фоновых элементов */}
      <BackgroundElements isMobile={isMobile} />

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 z-10">
            <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              <Zap size={14} className="mr-2" />
              <span>Начни зарабатывать быстро и легко</span>
            </div>
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-5 leading-tight tracking-tight">
              Твой <span className="animated-gradient-text">быстрый старт</span> в доставке
            </h1>
            <p className="text-lg text-foreground/70 mb-6 max-w-xl">
              Стань курьером с частыми выплатами и гибким графиком.
              Доступно с 16 лет на любой платформе (iOS/Android)
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a href="#apply">
                <Button size="lg" className="primary-gradient w-full sm:w-auto text-white px-6 py-6 text-base">
                  Начать работу <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#calculator">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 px-6 py-6 text-base hover:bg-accent">
                  Рассчитать доход
                </Button>
              </a>
            </div>
            <div className="mt-4 bg-white/80 p-4 rounded-xl border border-primary/10 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Clock className="text-secondary h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">Гибкий график</span>
                  <p className="text-sm text-foreground/70">Ты сам выбираешь сколько работать</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="text-primary h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">Стабильный доход</span>
                  <p className="text-sm text-foreground/70">До 5000 BYN/мес при полной занятости</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative max-w-md mx-auto lg:ml-auto">
              {/* Упрощенная версия для мобильных - без размытия */}
              {isMobile ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl transform rotate-2 scale-105"></div>
                  <div className="relative z-10 overflow-hidden rounded-2xl shadow-md">
                    <picture>
                      <source srcSet="/man3.webp" type="image/webp" />
                      <source srcSet="/man3.png" type="image/png" />
                      <img
                        src="/man3.png"
                        alt="Счастливый курьер с доставкой"
                        className="w-full h-auto object-cover"
                        loading="eager" // Приоритетная загрузка главного изображения
                      />
                    </picture>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl blur-xl transform rotate-3 scale-105"></div>
                  <div className="relative z-10 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]">
                    <picture>
                      <source srcSet="/man3.webp" type="image/webp" />
                      <source srcSet="/man3.png" type="image/png" />
                      <img
                        src="/man3.png"
                        alt="Счастливый курьер с доставкой"
                        className="w-full h-auto object-cover"
                        loading="eager" // Приоритетная загрузка главного изображения
                      />
                    </picture>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
