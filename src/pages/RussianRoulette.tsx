
import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { XCircle } from "lucide-react";

const RussianRoulette = () => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'yourTurn' | 'opponentTurn' | 'won'>('intro');
  const [bulletPosition, setBulletPosition] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [opponentName] = useState<string>("Иван");
  const [gameCount, setGameCount] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  
  const navigate = useNavigate();
  const roomRef = useRef<HTMLDivElement>(null);
  
  // Проверяем, не умер ли уже игрок ранее
  useEffect(() => {
    const isDead = localStorage.getItem('russianRouletteDead') === 'true';
    if (isDead) {
      navigate('/death');
    }
  }, [navigate]);

  // Инициализация игры
  const startGame = () => {
    // Размещаем пулю в случайной позиции барабана (1-6)
    const randomPosition = Math.floor(Math.random() * 6) + 1;
    setBulletPosition(randomPosition);
    setCurrentPosition(1);
    setGameState('yourTurn');
  };

  // Обработка выстрела игрока
  const handlePlayerShot = () => {
    // Анимация выстрела
    if (roomRef.current) {
      roomRef.current.classList.add('shake-animation');
      setTimeout(() => {
        roomRef.current?.classList.remove('shake-animation');
      }, 500);
    }
    
    // Проверяем, попала ли пуля
    if (currentPosition === bulletPosition) {
      // Игрок проиграл
      localStorage.setItem('russianRouletteDead', 'true');
      setTimeout(() => {
        navigate('/death');
      }, 1000);
    } else {
      // Игрок выжил, передаем ход противнику
      setCurrentPosition(prev => prev + 1);
      setGameState('opponentTurn');
      
      // Ход противника происходит через 2 секунды
      setTimeout(() => {
        handleOpponentTurn();
      }, 2000);
    }
  };

  // Обработка хода противника
  const handleOpponentTurn = () => {
    // Анимация выстрела
    if (roomRef.current) {
      roomRef.current.classList.add('shake-animation');
      setTimeout(() => {
        roomRef.current?.classList.remove('shake-animation');
      }, 500);
    }
    
    // Проверяем, попала ли пуля в противника
    if (currentPosition === bulletPosition) {
      // Противник проиграл
      setGameState('won');
    } else {
      // Противник выжил, передаем ход игроку
      setCurrentPosition(prev => prev + 1);
      setGameState('yourTurn');
    }
  };

  // Проверка секретного кода
  const checkSecretCode = () => {
    if (code === "1111") {
      localStorage.removeItem('russianRouletteDead');
      setIsDialogOpen(false);
      setGameState('intro');
    }
  };

  return (
    <div className="h-screen relative overflow-hidden perspective-1000" ref={roomRef}>
      {/* 3D комната */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1511] to-[#0A0806] room-3d">
        {/* Декор комнаты */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#231B15] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-20 bg-[#241B14] opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-[#1A1511] opacity-80"></div>
          <div className="absolute top-0 left-0 h-full w-20 bg-[#1A1511] opacity-40"></div>
          <div className="absolute top-0 right-0 h-full w-20 bg-[#1A1511] opacity-40"></div>
          
          {/* Стол */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-40 bg-[#3A2E20] rounded-t-lg shadow-2xl"></div>
          
          {/* Лампа */}
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-40 bg-[#2C2217]"></div>
            <div className="w-40 h-20 bg-[#4A3A20] rounded-full -mt-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[#F9D777] opacity-20 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Игровой интерфейс */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          
          {gameState === 'intro' && (
            <Card className="w-96 p-6 bg-black/70 backdrop-blur-md border-amber-900/40 text-white">
              <h2 className="text-2xl font-bold mb-4 text-amber-500">Русская рулетка</h2>
              <p className="mb-6 text-gray-300">Вы находитесь в старой комнате с противником. Перед вами револьвер с одним патроном. Испытайте удачу.</p>
              <div className="text-center">
                <Button 
                  className="bg-amber-700 hover:bg-amber-600 text-white"
                  onClick={startGame}
                >
                  Начать игру
                </Button>
              </div>
            </Card>
          )}
          
          {(gameState === 'yourTurn' || gameState === 'opponentTurn') && (
            <div className="text-center">
              {gameState === 'yourTurn' ? (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-amber-500">Ваш ход</h2>
                  <div className="relative w-64 h-64 mx-auto mb-8">
                    <img src="/placeholder.svg" alt="Револьвер" className="w-full h-full object-contain revolver-image" />
                  </div>
                  <Button 
                    className="bg-red-700 hover:bg-red-600 text-white text-xl py-6 px-8 rounded-full shadow-lg shadow-red-900/50"
                    onClick={handlePlayerShot}
                  >
                    Нажать на курок
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-amber-500">Ход противника</h2>
                  <div className="relative w-64 h-64 mx-auto mb-8 transform rotate-180">
                    <img src="/placeholder.svg" alt="Револьвер" className="w-full h-full object-contain revolver-image" />
                  </div>
                  <p className="text-xl text-white">{opponentName} целится...</p>
                </>
              )}
              
              <div className="mt-10 flex justify-center space-x-4">
                {Array.from({length: 6}).map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-6 h-6 rounded-full 
                      ${index + 1 < currentPosition ? 'bg-gray-700' : 'bg-amber-700'} 
                      ${index + 1 === currentPosition ? 'ring-2 ring-white' : ''}
                    `}
                  ></div>
                ))}
              </div>
            </div>
          )}
          
          {gameState === 'won' && (
            <Card className="w-96 p-6 bg-black/70 backdrop-blur-md border-amber-900/40 text-white">
              <h2 className="text-2xl font-bold mb-4 text-green-500">Победа!</h2>
              <p className="mb-6 text-gray-300">Вы выжили! Противник проиграл в этой смертельной игре.</p>
              <div className="text-center">
                <Button 
                  className="bg-amber-700 hover:bg-amber-600 text-white"
                  onClick={() => navigate('/')}
                >
                  Вернуться в меню
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
      
      {/* Кнопка секретного кода */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-300">
            <XCircle size={24} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Секретный код</DialogTitle>
            <DialogDescription>
              Введите код для сброса игры
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded-md"
              placeholder="Введите код"
            />
            <Button onClick={checkSecretCode} className="bg-amber-700 hover:bg-amber-600">
              Ввести
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Стили для анимации */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .room-3d {
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }
        .revolver-image {
          filter: drop-shadow(0 0 10px rgba(255, 200, 50, 0.3));
        }
        @keyframes shake {
          0% { transform: translateX(0) rotateY(0); }
          25% { transform: translateX(-10px) rotateY(-5deg); }
          50% { transform: translateX(10px) rotateY(5deg); }
          75% { transform: translateX(-5px) rotateY(-2deg); }
          100% { transform: translateX(0) rotateY(0); }
        }
      `}</style>
    </div>
  );
};

export default RussianRoulette;
