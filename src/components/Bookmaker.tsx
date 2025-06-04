
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Football, Calendar, TrendingUp, Target, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Bookmaker = () => {
  const [selectedBet, setSelectedBet] = useState<any>(null);
  const [betAmount, setBetAmount] = useState("");
  const { toast } = useToast();

  const sportsEvents = [
    {
      id: 1,
      sport: "Футбол",
      teams: "Манчестер Сити vs Ливерпуль",
      time: "20:00 сегодня",
      odds: { home: 2.1, draw: 3.2, away: 3.8 },
      popular: true
    },
    {
      id: 2,
      sport: "Баскетбол",
      teams: "Лейкерс vs Воинс",
      time: "02:00 завтра",
      odds: { home: 1.8, away: 2.0 },
      popular: true
    },
    {
      id: 3,
      sport: "Теннис",
      teams: "Джокович vs Надаль",
      time: "15:30 завтра",
      odds: { home: 1.6, away: 2.4 },
      popular: false
    }
  ];

  const cryptoEvents = [
    {
      id: 4,
      name: "Цена Bitcoin",
      question: "Достигнет ли BTC $50,000 до конца недели?",
      odds: { yes: 1.7, no: 2.1 },
      volume: "$125,000"
    },
    {
      id: 5,
      name: "Ethereum ETF",
      question: "Будет ли одобрен ETH ETF в 2024?",
      odds: { yes: 2.3, no: 1.6 },
      volume: "$89,000"
    }
  ];

  const placeBet = () => {
    if (!selectedBet || !betAmount) {
      toast({
        title: "Ошибка",
        description: "Выберите ставку и введите сумму",
        variant: "destructive",
      });
      return;
    }

    const potentialWin = (parseFloat(betAmount) * selectedBet.odds).toFixed(6);
    
    toast({
      title: "Ставка принята!",
      description: `Ставка ${betAmount} BTC на ${selectedBet.selection}. Потенциальный выигрыш: ${potentialWin} BTC`,
    });

    setSelectedBet(null);
    setBetAmount("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <p className="text-2xl font-bold text-white">156</p>
            <p className="text-gray-400 text-sm">Активных событий</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <p className="text-2xl font-bold text-white">89.5%</p>
            <p className="text-gray-400 text-sm">Выплаты</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <p className="text-2xl font-bold text-white">₿2.45</p>
            <p className="text-gray-400 text-sm">Объем ставок</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Timer className="w-8 h-8 mx-auto mb-3 text-purple-400" />
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-gray-400 text-sm">Работаем</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sports" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="sports">
            <Football className="w-4 h-4 mr-2" />
            Спорт
          </TabsTrigger>
          <TabsTrigger value="crypto">
            <TrendingUp className="w-4 h-4 mr-2" />
            Крипто
          </TabsTrigger>
          <TabsTrigger value="live">
            <Trophy className="w-4 h-4 mr-2" />
            Лайв
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {sportsEvents.map((event) => (
                <Card key={event.id} className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{event.teams}</CardTitle>
                        <CardDescription className="text-gray-400 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.time}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                          {event.sport}
                        </Badge>
                        {event.popular && (
                          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                            Популярное
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        className="bg-slate-700 border-slate-600 hover:border-green-500 flex flex-col items-center p-4"
                        onClick={() => setSelectedBet({
                          event: event.teams,
                          selection: "Победа 1",
                          odds: event.odds.home
                        })}
                      >
                        <span className="text-gray-400 text-xs">Победа 1</span>
                        <span className="text-white font-bold">{event.odds.home}</span>
                      </Button>
                      {event.odds.draw && (
                        <Button
                          variant="outline"
                          className="bg-slate-700 border-slate-600 hover:border-green-500 flex flex-col items-center p-4"
                          onClick={() => setSelectedBet({
                            event: event.teams,
                            selection: "Ничья",
                            odds: event.odds.draw
                          })}
                        >
                          <span className="text-gray-400 text-xs">Ничья</span>
                          <span className="text-white font-bold">{event.odds.draw}</span>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="bg-slate-700 border-slate-600 hover:border-green-500 flex flex-col items-center p-4"
                        onClick={() => setSelectedBet({
                          event: event.teams,
                          selection: "Победа 2",
                          odds: event.odds.away
                        })}
                      >
                        <span className="text-gray-400 text-xs">Победа 2</span>
                        <span className="text-white font-bold">{event.odds.away}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Купон ставок</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedBet ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-white font-medium">{selectedBet.event}</p>
                      <p className="text-cyan-400">{selectedBet.selection}</p>
                      <p className="text-gray-400">Коэффициент: {selectedBet.odds}</p>
                    </div>
                    
                    <div>
                      <Label className="text-white">Сумма ставки (BTC)</Label>
                      <Input
                        placeholder="0.001"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>

                    {betAmount && (
                      <div className="p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Ставка:</span>
                          <span className="text-white">{betAmount} BTC</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Потенциальный выигрыш:</span>
                          <span className="text-cyan-400">
                            {(parseFloat(betAmount) * selectedBet.odds).toFixed(6)} BTC
                          </span>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={placeBet}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      Сделать ставку
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">Выберите ставку</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crypto" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cryptoEvents.map((event) => (
              <Card key={event.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">{event.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {event.question}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Объем ставок:</span>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                      {event.volume}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="bg-slate-700 border-slate-600 hover:border-green-500 flex flex-col items-center p-4"
                      onClick={() => setSelectedBet({
                        event: event.question,
                        selection: "Да",
                        odds: event.odds.yes
                      })}
                    >
                      <span className="text-gray-400 text-xs">Да</span>
                      <span className="text-white font-bold">{event.odds.yes}</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-slate-700 border-slate-600 hover:border-green-500 flex flex-col items-center p-4"
                      onClick={() => setSelectedBet({
                        event: event.question,
                        selection: "Нет",
                        odds: event.odds.no
                      })}
                    >
                      <span className="text-gray-400 text-xs">Нет</span>
                      <span className="text-white font-bold">{event.odds.no}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Лайв ставки</CardTitle>
              <CardDescription className="text-gray-400">
                События в реальном времени
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400 text-lg">Нет активных лайв событий</p>
              <p className="text-gray-500">Следите за обновлениями</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookmaker;
