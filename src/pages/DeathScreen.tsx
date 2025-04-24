
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const DeathScreen = () => {
  const [userName, setUserName] = useState('Игрок');
  const [raindrops, setRaindrops] = useState<{id: number, left: number, delay: number, duration: number}[]>([]);
  const navigate = useNavigate();

  // Создаем капли дождя
  useEffect(() => {
    const newRaindrops = Array.from({ length: 100 }).map((_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 0.8 + Math.random() * 0.6
    }));
    setRaindrops(newRaindrops);
    
    // Перенаправляем, если пользователь не "умер"
    if (localStorage.getItem('russianRouletteDead') !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  // Проверяем сохраненное имя пользователя
  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Фон дождливой улицы */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
        {/* Улица */}
        <div className="absolute bottom-0 w-full h-40 bg-gray-800"></div>
        
        {/* Здания на фоне */}
        <div className="absolute bottom-40 left-10 w-40 h-80 bg-gray-900"></div>
        <div className="absolute bottom-40 left-60 w-60 h-100 bg-gray-900"></div>
        <div className="absolute bottom-40 right-20 w-50 h-90 bg-gray-900"></div>
        
        {/* Лужи */}
        <div className="absolute bottom-10 left-1/4 w-20 h-4 bg-gray-700 rounded-full opacity-30"></div>
        <div className="absolute bottom-5 right-1/3 w-30 h-5 bg-gray-700 rounded-full opacity-30"></div>
        
        {/* Уличный фонарь */}
        <div className="absolute bottom-40 right-80 w-4 h-60 bg-gray-800">
          <div className="absolute -top-10 -left-6 w-16 h-16 rounded-full bg-yellow-200 opacity-20 blur-xl"></div>
        </div>
      </div>
      
      {/* Дождь */}
      <div className="absolute inset-0 pointer-events-none">
        {raindrops.map(drop => (
          <div 
            key={drop.id} 
            className="absolute w-[1px] bg-blue-200 opacity-70"
            style={{
              left: `${drop.left}%`,
              top: '-20px',
              height: '20px',
              animation: `raindrop ${drop.duration}s linear ${drop.delay}s infinite`
            }}
          ></div>
        ))}
      </div>
      
      {/* Гроб */}
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-80 h-120">
        <div className="relative w-full h-full">
          {/* Гроб */}
          <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-b from-[#3A2A1A] to-[#1A0A00] rounded-t-lg shadow-2xl border border-amber-950">
            {/* Крышка гроба */}
            <div className="absolute -top-4 left-0 w-full h-10 bg-[#3A2A1A] rounded-t-lg border-t border-x border-amber-950"></div>
            
            {/* Табличка с именем */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-[#B69F7E] flex items-center justify-center rounded border border-amber-800">
              <span className="text-black font-semibold">{userName}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Текст смерти */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-4xl text-red-600 font-bold mb-4 animate-pulse">ВЫ ПОГИБЛИ</h1>
        <p className="text-gray-400 text-center max-w-md mb-8">
          Русская рулетка оказалась беспощадной. Ваша душа теперь навеки будет скитаться в этом дождливом мире...
        </p>
        
        <Button 
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 pointer-events-auto"
          onClick={() => navigate('/')}
        >
          Вернуться в главное меню
        </Button>
      </div>
      
      {/* Стили для анимации дождя */}
      <style jsx>{`
        @keyframes raindrop {
          0% { transform: translateY(-20px) translateX(0); }
          100% { transform: translateY(100vh) translateX(20px); }
        }
      `}</style>
    </div>
  );
};

export default DeathScreen;
