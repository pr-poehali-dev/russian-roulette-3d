
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Skull, Lock, UnlockKeyhole, UserCircle, Save } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [isDead, setIsDead] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState<boolean>(false);

  // Check if player is already dead
  useEffect(() => {
    const deadStatus = localStorage.getItem('russianRouletteDead') === 'true';
    setIsDead(deadStatus);
    
    // Get saved name
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  // Save player name
  const savePlayerName = () => {
    if (userName.trim()) {
      localStorage.setItem('playerName', userName);
      setIsDialogOpen(false);
    }
  };

  // Check secret code
  const checkSecretCode = () => {
    if (code === "1111") {
      localStorage.removeItem('russianRouletteDead');
      setIsCodeDialogOpen(false);
      setIsDead(false);
    }
  };

  // Text content based on language
  const text = {
    title: language === 'en' ? 'Russian Roulette' : 'Русская Рулетка',
    subtitle: language === 'en' ? 'Test your luck in a dangerous game' : 'Испытайте свою удачу в опасной игре',
    description: language === 'en' 
      ? 'You find yourself in an old room with an opponent. There is a revolver with one bullet in the chamber in front of you.' 
      : 'Вы оказываетесь в старой комнате с противником. Перед вами револьвер с одним патроном в барабане.',
    warning: language === 'en' 
      ? 'Warning: You only have one attempt. If you lose, you cannot start over.' 
      : 'Внимание: У вас есть только одна попытка. Если вы проиграете, то не сможете начать заново.',
    startButton: language === 'en' ? 'Start Game' : 'Начать игру',
    deadMessage: language === 'en' ? 'You are dead. Enter secret code to play again.' : 'Вы мертвы. Введите секретный код, чтобы играть снова.',
    unlockButton: language === 'en' ? 'Unlock' : 'Разблокировать',
    nameDialog: {
      title: language === 'en' ? 'Enter Your Name' : 'Введите Ваше Имя',
      description: language === 'en' ? 'Your name will be displayed on your tombstone if you die.' : 'Ваше имя будет отображаться на вашем надгробии, если вы умрете.',
      placeholder: language === 'en' ? 'Enter your name' : 'Введите ваше имя',
      saveButton: language === 'en' ? 'Save' : 'Сохранить'
    },
    codeDialog: {
      title: language === 'en' ? 'Secret Code' : 'Секретный код',
      description: language === 'en' ? 'Enter code to reset game' : 'Введите код для сброса игры',
      placeholder: language === 'en' ? 'Enter code' : 'Введите код',
      submitButton: language === 'en' ? 'Submit' : 'Ввести'
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      {/* Atmospheric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Smoke particles */}
        {Array.from({length: 15}).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gray-500 opacity-5 blur-xl"
            style={{
              width: `${30 + Math.random() * 50}px`,
              height: `${30 + Math.random() * 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 15}s infinite ease-in-out`
            }}
          ></div>
        ))}
        
        {/* Light beams */}
        <div className="absolute top-0 left-1/4 w-1 h-screen bg-amber-500 opacity-5 blur-3xl"></div>
        <div className="absolute top-0 right-1/3 w-1 h-screen bg-amber-500 opacity-5 blur-3xl"></div>
      </div>
      
      <Card className="w-[28rem] bg-black/70 border-amber-900/40 text-white backdrop-blur-md shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl text-amber-500 flex items-center gap-3">
            <Skull className="h-7 w-7" />
            {text.title}
          </CardTitle>
          <CardDescription className="text-gray-400 text-lg">
            {text.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full h-40 relative overflow-hidden rounded-lg mb-2">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-black/40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Revolvers silhouette */}
              <div className="w-32 h-32 bg-gray-800 opacity-40 blur-sm" style={{
                clipPath: 'polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)'
              }}></div>
            </div>
          </div>
          
          <p className="text-gray-300">
            {text.description}
          </p>
          
          {isDead ? (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-900/30 rounded-md flex items-center gap-3">
              <Lock className="h-5 w-5 text-red-500" />
              <p className="text-red-300 text-sm">
                {text.deadMessage}
              </p>
            </div>
          ) : (
            <p className="text-amber-800 text-sm mt-4">
              {text.warning}
            </p>
          )}
          
          <div className="flex items-center gap-2 mt-2">
            <UserCircle className="h-5 w-5 text-gray-500" />
            <span className="text-gray-400 text-sm">
              {userName || (language === 'en' ? 'Anonymous Player' : 'Анонимный Игрок')}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto h-8 px-2 text-gray-500"
              onClick={() => setIsDialogOpen(true)}
            >
              <UserCircle className="h-4 w-4 mr-1" />
              {language === 'en' ? 'Change' : 'Изменить'}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          {isDead ? (
            <Button 
              className="w-full bg-gray-800 hover:bg-gray-700 flex items-center gap-2"
              onClick={() => setIsCodeDialogOpen(true)}
            >
              <UnlockKeyhole className="h-4 w-4" />
              {text.unlockButton}
            </Button>
          ) : (
            <Link to="/roulette" className="w-full">
              <Button className="w-full bg-amber-700 hover:bg-amber-600 flex items-center gap-2">
                <Skull className="h-4 w-4" />
                {text.startButton}
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
      
      {/* Player name dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>{text.nameDialog.title}</DialogTitle>
            <DialogDescription>
              {text.nameDialog.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder={text.nameDialog.placeholder}
            />
            <Button 
              onClick={savePlayerName} 
              className="bg-amber-700 hover:bg-amber-600 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {text.nameDialog.saveButton}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Secret Code Dialog */}
      <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>{text.codeDialog.title}</DialogTitle>
            <DialogDescription>
              {text.codeDialog.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded-md"
              placeholder={text.codeDialog.placeholder}
            />
            <Button onClick={checkSecretCode} className="bg-amber-700 hover:bg-amber-600">
              {text.codeDialog.submitButton}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Language toggle */}
      <button 
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 z-10"
        onClick={toggleLanguage}
      >
        {language === 'en' ? 'RU' : 'EN'}
      </button>
      
      {/* Animation styles */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Index;
