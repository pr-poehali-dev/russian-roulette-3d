
import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { XCircle, Skull, Target, Menu } from "lucide-react";

const RussianRoulette = () => {
  const [gameState, setGameState] = useState<'intro' | 'targeting' | 'opponentTurn' | 'won' | 'oppDead'>('intro');
  const [bulletPosition, setBulletPosition] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [opponentName] = useState<string>("Ivan");
  const [gameCount, setGameCount] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [bloodEffect, setBloodEffect] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  
  const navigate = useNavigate();
  const roomRef = useRef<HTMLDivElement>(null);
  const revolverRef = useRef<HTMLDivElement>(null);
  
  // Check if player is already dead
  useEffect(() => {
    const isDead = localStorage.getItem('russianRouletteDead') === 'true';
    if (isDead) {
      navigate('/death');
    }
  }, [navigate]);

  // Initialize game
  const startGame = () => {
    // Place bullet in random position (1-6)
    const randomPosition = Math.floor(Math.random() * 6) + 1;
    setBulletPosition(randomPosition);
    setCurrentPosition(1);
    setGameState('targeting');
  };

  // Handle targeting choice
  const handleTargetChoice = (targetSelf: boolean) => {
    if (revolverRef.current) {
      revolverRef.current.classList.add('target-animation');
      setTimeout(() => {
        revolverRef.current?.classList.remove('target-animation');
        handleShot(targetSelf);
      }, 800);
    }
  };

  // Handle shot mechanics
  const handleShot = (targetSelf: boolean) => {
    // Shot animation
    if (roomRef.current) {
      roomRef.current.classList.add('shake-animation');
      setTimeout(() => {
        roomRef.current?.classList.remove('shake-animation');
      }, 500);
    }
    
    // Check if bullet fired
    const bulletFired = currentPosition === bulletPosition;
    
    if (targetSelf) {
      // Player targeted self
      if (bulletFired) {
        // Player died
        setBloodEffect(true);
        setTimeout(() => {
          localStorage.setItem('russianRouletteDead', 'true');
          navigate('/death');
        }, 2000);
      } else {
        // Player survived and gets extra turn
        setCurrentPosition(prev => prev + 1);
        setGameState('targeting'); // Player gets another turn
      }
    } else {
      // Player targeted opponent
      if (bulletFired) {
        // Opponent died
        setBloodEffect(true);
        setTimeout(() => {
          setBloodEffect(false);
          setGameState('oppDead');
        }, 2000);
      } else {
        // Opponent survived, now opponent's turn
        setCurrentPosition(prev => prev + 1);
        setGameState('opponentTurn');
        
        // Opponent's turn happens after 2 seconds
        setTimeout(() => {
          handleOpponentTurn();
        }, 2000);
      }
    }
  };

  // Handle opponent's turn
  const handleOpponentTurn = () => {
    // Shot animation
    if (roomRef.current) {
      roomRef.current.classList.add('shake-animation');
      setTimeout(() => {
        roomRef.current?.classList.remove('shake-animation');
      }, 500);
    }
    
    // Check if bullet hit opponent
    if (currentPosition === bulletPosition) {
      // Opponent died
      setBloodEffect(true);
      setTimeout(() => {
        setBloodEffect(false);
        setGameState('won');
      }, 2000);
    } else {
      // Opponent survived, player's turn
      setCurrentPosition(prev => prev + 1);
      setGameState('targeting');
    }
  };

  // Check secret code
  const checkSecretCode = () => {
    if (code === "1111") {
      localStorage.removeItem('russianRouletteDead');
      setIsDialogOpen(false);
      setGameState('intro');
    }
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  // Text content based on language
  const text = {
    intro: {
      title: language === 'en' ? 'Russian Roulette' : 'Русская рулетка',
      description: language === 'en' 
        ? 'You are in an old room with an opponent. There is a revolver with one bullet in front of you. Test your luck in this deadly game.' 
        : 'Вы находитесь в старой комнате с противником. Перед вами револьвер с одним патроном. Испытайте удачу.',
      startButton: language === 'en' ? 'Start Game' : 'Начать игру'
    },
    targeting: {
      title: language === 'en' ? 'Your Turn' : 'Ваш ход',
      targetSelf: language === 'en' ? 'Target Yourself' : 'Целиться в себя',
      targetOpponent: language === 'en' ? 'Target Opponent' : 'Целиться в противника'
    },
    opponentTurn: {
      title: language === 'en' ? 'Opponent\'s Turn' : 'Ход противника',
      aiming: language === 'en' ? 'is aiming...' : 'целится...'
    },
    won: {
      title: language === 'en' ? 'Victory!' : 'Победа!',
      description: language === 'en' 
        ? 'You survived! The opponent lost in this deadly game.' 
        : 'Вы выжили! Противник проиграл в этой смертельной игре.',
      menuButton: language === 'en' ? 'Return to Menu' : 'Вернуться в меню'
    },
    oppDead: {
      title: language === 'en' ? 'Opponent Eliminated!' : 'Противник уничтожен!',
      description: language === 'en' 
        ? 'Your shot was fatal. A new challenger approaches.' 
        : 'Ваш выстрел был смертельным. Новый противник приближается.',
      nextButton: language === 'en' ? 'Continue' : 'Продолжить'
    },
    secretCode: {
      title: language === 'en' ? 'Secret Code' : 'Секретный код',
      description: language === 'en' ? 'Enter code to reset game' : 'Введите код для сброса игры',
      placeholder: language === 'en' ? 'Enter code' : 'Введите код',
      submitButton: language === 'en' ? 'Submit' : 'Ввести'
    }
  };

  return (
    <div className="h-screen relative overflow-hidden perspective-1000" ref={roomRef}>
      {/* 3D Room Environment */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1511] to-[#0A0806] room-3d">
        {/* Room decor with enhanced graphics */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#231B15] opacity-20 rounded-full blur-3xl"></div>
        
        {/* Wooden floor */}
        <div className="absolute bottom-0 w-full h-40 bg-[#3A2A1A] bg-opacity-70 grid grid-cols-8">
          {Array.from({length: 32}).map((_, i) => (
            <div key={i} className="border-t border-r border-[#4A3A2A] h-full"></div>
          ))}
        </div>
        
        {/* Walls texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} className="absolute border-b border-[#2A2016] w-full h-[5%]" style={{top: `${i * 5}%`}}></div>
            ))}
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} className="absolute border-r border-[#2A2016] h-full w-[5%]" style={{left: `${i * 5}%`}}></div>
            ))}
          </div>
        </div>
        
        {/* Room edges */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#0A0806] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0A0806] to-transparent"></div>
          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#0A0806] to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#0A0806] to-transparent"></div>
        </div>
        
        {/* Table */}
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-[28rem] h-4 bg-[#3A2E20] rounded-t-md"></div>
        <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2 w-[26rem] h-10 bg-[#2A1E10] shadow-xl rounded">
          <div className="absolute inset-0 bg-[#4A3A20] bg-opacity-20 rounded"></div>
        </div>
        
        {/* Lamp */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-40 bg-[#2C2217]"></div>
          <div className="w-40 h-20 bg-[#4A3A20] rounded-full -mt-2 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-[#F9D777] opacity-20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#F9D777] opacity-80 rounded-full blur-md"></div>
          </div>
          <div className="absolute top-60 left-1/2 transform -translate-x-1/2 w-40 h-[300px] bg-[#F9D777] opacity-10 blur-xl" style={{clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)'}}></div>
        </div>
        
        {/* Smoke effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({length: 10}).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-[#AAAAAA] opacity-5 blur-xl"
              style={{
                width: `${20 + Math.random() * 50}px`,
                height: `${20 + Math.random() * 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floating ${10 + Math.random() * 10}s infinite ease-in-out`
              }}
            ></div>
          ))}
        </div>
        
        {/* Opponent silhouette */}
        {(gameState === 'targeting' || gameState === 'opponentTurn') && (
          <div className="absolute bottom-64 left-1/2 transform -translate-x-1/2 w-60 h-80">
            <div className="w-full h-full bg-black opacity-80 rounded-lg blur-sm" style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'}}></div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-black opacity-80 blur-sm"></div>
          </div>
        )}
        
        {/* Game Interface */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          
          {gameState === 'intro' && (
            <Card className="w-96 p-6 bg-black/70 backdrop-blur-md border-amber-900/40 text-white animate-fade-in shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-amber-500">{text.intro.title}</h2>
              <p className="mb-6 text-gray-300">{text.intro.description}</p>
              <div className="text-center">
                <Button 
                  className="bg-amber-700 hover:bg-amber-600 text-white shadow-lg shadow-amber-900/30"
                  onClick={startGame}
                >
                  {text.intro.startButton}
                </Button>
              </div>
            </Card>
          )}
          
          {gameState === 'targeting' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-amber-500 animate-pulse">{text.targeting.title}</h2>
              
              {/* Revolver in first person view */}
              <div className="relative w-80 h-80 mx-auto mb-8" ref={revolverRef}>
                <div className="absolute w-full h-full" style={{
                  background: "url('/placeholder.svg')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: "drop-shadow(0 0 15px rgba(255, 180, 0, 0.3))"
                }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full blur-sm animate-pulse"></div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  className="bg-red-700 hover:bg-red-600 text-white py-4 px-6 rounded-full shadow-lg shadow-red-900/50 flex items-center gap-2"
                  onClick={() => handleTargetChoice(true)}
                >
                  <Target size={18} />
                  {text.targeting.targetSelf}
                </Button>
                <Button 
                  className="bg-amber-700 hover:bg-amber-600 text-white py-4 px-6 rounded-full shadow-lg shadow-amber-900/50 flex items-center gap-2"
                  onClick={() => handleTargetChoice(false)}
                >
                  <Target size={18} />
                  {text.targeting.targetOpponent}
                </Button>
              </div>
              
              <div className="mt-10 flex justify-center space-x-4">
                {Array.from({length: 6}).map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-6 h-6 rounded-full 
                      ${index + 1 < currentPosition ? 'bg-gray-700' : 'bg-amber-700'} 
                      ${index + 1 === currentPosition ? 'ring-2 ring-white animate-pulse' : ''}
                    `}
                  ></div>
                ))}
              </div>
            </div>
          )}
          
          {gameState === 'opponentTurn' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-amber-500 animate-pulse">{text.opponentTurn.title}</h2>
              
              {/* Reversed revolver pointed at player */}
              <div className="relative w-80 h-80 mx-auto mb-8 transform rotate-180">
                <div className="absolute w-full h-full" style={{
                  background: "url('/placeholder.svg')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  filter: "drop-shadow(0 0 15px rgba(255, 180, 0, 0.3))"
                }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full blur-sm animate-pulse"></div>
              </div>
              
              <p className="text-xl text-white">{opponentName} {text.opponentTurn.aiming}</p>
              
              <div className="mt-10 flex justify-center space-x-4">
                {Array.from({length: 6}).map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-6 h-6 rounded-full 
                      ${index + 1 < currentPosition ? 'bg-gray-700' : 'bg-amber-700'} 
                      ${index + 1 === currentPosition ? 'ring-2 ring-white animate-pulse' : ''}
                    `}
                  ></div>
                ))}
              </div>
            </div>
          )}
          
          {gameState === 'won' && (
            <Card className="w-96 p-6 bg-black/70 backdrop-blur-md border-amber-900/40 text-white animate-fade-in shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-green-500">{text.won.title}</h2>
              <p className="mb-6 text-gray-300">{text.won.description}</p>
              <div className="text-center">
                <Button 
                  className="bg-amber-700 hover:bg-amber-600 text-white shadow-lg shadow-amber-900/30"
                  onClick={() => setIsDialogOpen(true)}
                >
                  {text.won.menuButton}
                </Button>
              </div>
            </Card>
          )}
          
          {gameState === 'oppDead' && (
            <Card className="w-96 p-6 bg-black/70 backdrop-blur-md border-amber-900/40 text-white animate-fade-in shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-red-500">{text.oppDead.title}</h2>
              <p className="mb-6 text-gray-300">{text.oppDead.description}</p>
              <div className="text-center">
                <Button 
                  className="bg-amber-700 hover:bg-amber-600 text-white shadow-lg shadow-amber-900/30"
                  onClick={startGame}
                >
                  {text.oppDead.nextButton}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
      
      {/* Blood effect overlay */}
      {bloodEffect && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {/* Blood splatter */}
          <div className="absolute inset-0 bg-red-900 opacity-40"></div>
          {Array.from({length: 20}).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-red-700"
              style={{
                width: `${10 + Math.random() * 20}px`,
                height: `${50 + Math.random() * 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.8,
                borderRadius: '50%',
                animation: `bloodSpray 0.5s ease-out forwards`,
                animationDelay: `${Math.random() * 0.2}s`
              }}
            ></div>
          ))}
          {Array.from({length: 15}).map((_, i) => (
            <div 
              key={i + 'splash'}
              className="absolute bg-red-800 rounded-full"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.7,
                animation: `bloodSplash 0.8s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`
              }}
            ></div>
          ))}
        </div>
      )}
      
      {/* Secret Code Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-300">
            <Menu size={24} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800 shadow-2xl">
          <DialogHeader>
            <DialogTitle>{text.secretCode.title}</DialogTitle>
            <DialogDescription>
              {text.secretCode.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded-md"
              placeholder={text.secretCode.placeholder}
            />
            <Button onClick={checkSecretCode} className="bg-amber-700 hover:bg-amber-600">
              {text.secretCode.submitButton}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Language toggle */}
      <button 
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 z-20"
        onClick={toggleLanguage}
      >
        {language === 'en' ? 'RU' : 'EN'}
      </button>
      
      {/* Styles for animations */}
      <style>
        {`
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
          .target-animation {
            animation: target 0.8s ease-in-out;
          }
          
          @keyframes shake {
            0% { transform: translateX(0) rotateY(0); }
            25% { transform: translateX(-10px) rotateY(-5deg); }
            50% { transform: translateX(10px) rotateY(5deg); }
            75% { transform: translateX(-5px) rotateY(-2deg); }
            100% { transform: translateX(0) rotateY(0); }
          }
          
          @keyframes target {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
          
          @keyframes floating {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
          }
          
          @keyframes bloodSpray {
            0% { transform: scale(0) rotate(0); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: scale(1.5) rotate(360deg); opacity: 0.6; }
          }
          
          @keyframes bloodSplash {
            0% { transform: scale(0); opacity: 0; }
            60% { opacity: 0.7; }
            100% { transform: scale(1.2); opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default RussianRoulette;
