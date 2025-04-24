
import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

const DeathScreen = () => {
  const [userName, setUserName] = useState('Player');
  const [raindrops, setRaindrops] = useState<{id: number, left: number, delay: number, duration: number}[]>([]);
  const [lightning, setLightning] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  
  const navigate = useNavigate();
  const sceneRef = useRef<HTMLDivElement>(null);

  // Create raindrops
  useEffect(() => {
    const newRaindrops = Array.from({ length: 200 }).map((_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 0.8 + Math.random() * 0.6
    }));
    setRaindrops(newRaindrops);
    
    // Redirect if user is not "dead"
    if (localStorage.getItem('russianRouletteDead') !== 'true') {
      navigate('/');
    }
    
    // Set up lightning effects
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLightning(true);
        setTimeout(() => {
          setLightning(false);
        }, 200);
      }
    }, 5000);
    
    return () => clearInterval(lightningInterval);
  }, [navigate]);

  // Check for saved player name
  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // Check secret code
  const checkSecretCode = () => {
    if (code === "1111") {
      localStorage.removeItem('russianRouletteDead');
      setIsDialogOpen(false);
      navigate('/');
    }
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  // Text content based on language
  const text = {
    deathTitle: language === 'en' ? 'YOU ARE DEAD' : 'ВЫ ПОГИБЛИ',
    deathDescription: language === 'en' 
      ? 'Russian roulette turned out to be merciless. Your soul will now wander forever in this rainy world...' 
      : 'Русская рулетка оказалась беспощадной. Ваша душа теперь навеки будет скитаться в этом дождливом мире...',
    returnButton: language === 'en' ? 'Enter Secret Code' : 'Ввести Секретный Код',
    secretCode: {
      title: language === 'en' ? 'Secret Code' : 'Секретный код',
      description: language === 'en' ? 'Enter code to return to life' : 'Введите код, чтобы вернуться к жизни',
      placeholder: language === 'en' ? 'Enter code' : 'Введите код',
      submitButton: language === 'en' ? 'Submit' : 'Ввести'
    }
  };

  return (
    <div ref={sceneRef} className={`relative h-screen overflow-hidden ${lightning ? 'bg-gray-700' : 'bg-black'} transition-colors duration-100`}>
      {/* Cemetery background with enhanced graphics */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
        {/* Sky with clouds */}
        <div className="absolute inset-0">
          {Array.from({length: 15}).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-gray-800 opacity-70 blur-xl"
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${50 + Math.random() * 100}px`,
                top: `${Math.random() * 40}%`,
                left: `${Math.random() * 100}%`
              }}
            ></div>
          ))}
        </div>
        
        {/* Street */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-gray-900 to-gray-800">
          {/* Puddles */}
          {Array.from({length: 8}).map((_, i) => (
            <div 
              key={i}
              className="absolute bottom-5 rounded-full bg-gray-800 shadow-inner"
              style={{
                width: `${30 + Math.random() * 70}px`,
                height: `${4 + Math.random() * 2}px`,
                left: `${Math.random() * 100}%`,
                transform: 'perspective(500px) rotateX(60deg)',
                opacity: 0.6
              }}
            ></div>
          ))}
        </div>
        
        {/* Buildings silhouettes */}
        <div className="absolute bottom-40 left-0 right-0 h-60">
          {/* Distant city */}
          <div className="absolute bottom-0 left-0 w-full">
            {Array.from({length: 20}).map((_, i) => (
              <div 
                key={i}
                className="absolute bottom-0 bg-gray-900"
                style={{
                  width: `${20 + Math.random() * 40}px`,
                  height: `${50 + Math.random() * 100}px`,
                  left: `${i * 5}%`
                }}
              >
                {Array.from({length: 5}).map((_, j) => (
                  <div 
                    key={j}
                    className="absolute bg-gray-800 opacity-20"
                    style={{
                      width: '3px',
                      height: '3px',
                      left: `${Math.random() * 100}%`,
                      top: `${20 + Math.random() * 60}%`
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Cemetery elements */}
        <div className="absolute bottom-40 left-0 right-0">
          {/* Tombstones */}
          {Array.from({length: 10}).map((_, i) => (
            <div 
              key={i}
              className="absolute bottom-0 bg-gray-800"
              style={{
                width: '20px',
                height: `${30 + Math.random() * 20}px`,
                left: `${10 + i * 10}%`,
                display: i === 5 ? 'none' : 'block', // Skip middle for main coffin
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px'
              }}
            ></div>
          ))}
          
          {/* Dead trees */}
          <div className="absolute bottom-0 left-[15%] w-2 h-80 bg-gray-800">
            {Array.from({length: 4}).map((_, i) => (
              <div 
                key={i}
                className="absolute bg-gray-800"
                style={{
                  width: '30px',
                  height: '2px',
                  top: `${20 + i * 20}%`,
                  left: '0',
                  transform: `rotate(${i % 2 === 0 ? 30 : -30}deg)`,
                  transformOrigin: i % 2 === 0 ? 'left' : 'right'
                }}
              ></div>
            ))}
          </div>
          
          <div className="absolute bottom-0 right-[25%] w-2 h-60 bg-gray-800">
            {Array.from({length: 3}).map((_, i) => (
              <div 
                key={i}
                className="absolute bg-gray-800"
                style={{
                  width: '25px',
                  height: '2px',
                  top: `${30 + i * 25}%`,
                  right: '0',
                  transform: `rotate(${i % 2 === 0 ? -30 : 30}deg)`,
                  transformOrigin: i % 2 === 0 ? 'right' : 'left'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Street lamps */}
        <div className="absolute bottom-40 left-[20%] w-2 h-80 bg-gray-800">
          <div className="absolute -top-6 -left-3 w-8 h-8 rounded-full bg-yellow-100 opacity-20 blur-xl"></div>
        </div>
        
        <div className="absolute bottom-40 right-[30%] w-2 h-70 bg-gray-800">
          <div className="absolute -top-6 -left-3 w-8 h-8 rounded-full bg-yellow-100 opacity-10 blur-xl"></div>
        </div>
      </div>
      
      {/* Rain */}
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
      
      {/* Lightning flash effect */}
      {lightning && (
        <div className="absolute inset-0 bg-gray-300 opacity-30 z-10"></div>
      )}
      
      {/* Coffin with enhanced visuals */}
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-80 h-120 z-20">
        <div className="relative w-full h-full">
          {/* Coffin base */}
          <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-b from-[#3A2A1A] to-[#1A0A00] rounded-t-lg shadow-2xl border border-amber-950">
            {/* Coffin details */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-900/30 rounded-t"></div>
              <div className="absolute top-6 left-6 right-6 bottom-6 border border-amber-900/20 rounded-t"></div>
            </div>
            
            {/* Coffin lid */}
            <div className="absolute -top-4 left-0 w-full h-10 bg-[#3A2A1A] rounded-t-lg border-t border-x border-amber-950 shadow-md"></div>
            
            {/* Name plate */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-gradient-to-b from-[#B69F7E] to-[#9A8567] flex items-center justify-center rounded border border-amber-800 shadow-inner">
              <span className="text-black font-semibold">{userName}</span>
            </div>
          </div>
          
          {/* Flowers on grave */}
          <div className="absolute bottom-0 left-0 transform -translate-x-1/2">
            <div className="w-20 h-20 relative">
              {Array.from({length: 5}).map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-red-900"
                  style={{
                    width: '8px',
                    height: '8px',
                    top: `${Math.random() * 20}px`,
                    left: `${10 + Math.random() * 10}px`
                  }}
                ></div>
              ))}
              <div className="absolute bottom-0 left-10 w-1 h-20 bg-green-900"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fog overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 5}).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gray-900 opacity-30 blur-3xl"
            style={{
              width: `${200 + Math.random() * 300}px`,
              height: `${100 + Math.random() * 100}px`,
              bottom: `-${50 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              animation: `fogMove ${30 + Math.random() * 20}s infinite linear`
            }}
          ></div>
        ))}
      </div>
      
      {/* Death message */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
        <Card className="w-96 p-6 bg-black/70 backdrop-blur-md border-gray-800/40 text-white shadow-2xl pointer-events-auto">
          <h1 className="text-4xl text-red-600 font-bold mb-4 animate-pulse text-center">{text.deathTitle}</h1>
          <p className="text-gray-400 text-center max-w-md mb-8">
            {text.deathDescription}
          </p>
          
          <Button 
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 w-full"
            onClick={() => setIsDialogOpen(true)}
          >
            {text.returnButton}
          </Button>
        </Card>
      </div>
      
      {/* Secret Code Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800 shadow-2xl z-50">
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
            <Button onClick={checkSecretCode} className="bg-red-700 hover:bg-red-600">
              {text.secretCode.submitButton}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Language toggle */}
      <button 
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-300 z-40"
        onClick={toggleLanguage}
      >
        {language === 'en' ? 'RU' : 'EN'}
      </button>
      
      {/* Animation styles */}
      <style>
        {`
          @keyframes raindrop {
            0% { transform: translateY(-20px) translateX(0); }
            100% { transform: translateY(100vh) translateX(20px); }
          }
          
          @keyframes fogMove {
            0% { transform: translateX(-300px); }
            100% { transform: translateX(2000px); }
          }
        `}
      </style>
    </div>
  );
};

export default DeathScreen;
