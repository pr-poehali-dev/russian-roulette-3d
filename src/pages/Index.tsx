
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Skull } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <Card className="w-96 bg-black/50 border-amber-900/40 text-white backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-500 flex items-center gap-2">
            <Skull className="h-6 w-6" />
            Русская Рулетка
          </CardTitle>
          <CardDescription className="text-gray-400">
            Испытайте свою удачу в опасной игре
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            Вы оказываетесь в старой комнате с противником. Перед вами револьвер с одним патроном в барабане.
          </p>
          <p className="text-gray-400 text-sm">
            Внимание: У вас есть только одна попытка. Если вы проиграете, то не сможете начать заново.
          </p>
        </CardContent>
        <CardFooter>
          <Link to="/roulette" className="w-full">
            <Button className="w-full bg-amber-700 hover:bg-amber-600">
              Начать игру
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
