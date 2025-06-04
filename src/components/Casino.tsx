
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Gamepad2, Trophy, Coins, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Casino = () => {
  const [betAmount, setBetAmount] = useState("");
  const [diceResult, setDiceResult] = useState<number[]>([]);
  const [gameHistory, setGameHistory] = useState<any[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const { toast } = useToast();

  const games = [
    { name: "Dice", players: "234", prize: "1.5 BTC", icon: Dice1 },
    { name: "Slots", players: "156", prize: "0.8 ETH", icon: Gamepad2 },
    { name: "Roulette", players: "89", prize: "2500 USDT", icon: Trophy },
    { name: "Crash", players: "67", prize: "1.2 BTC", icon: Zap }
  ];

  const DiceIcon = ({ number }: { number: number }) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const Icon = icons[number - 1];
    return <Icon className="w-8 h-8 text-cyan-400" />;
  };

  const rollDice = () => {
    if (!betAmount || parseFloat(betAmount) <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму ставки",
        variant: "destructive",
      });
      return;
    }

    setIsRolling(true);
    
    setTimeout(() => {
      const results = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
      
      setDiceResult(results);
      
      const sum = results.reduce((a, b) => a + b, 0);
      const isWin = sum >= 7;
      const multiplier = isWin ? (sum === 12 ? 10 : sum === 11 ? 5 : 2) : 0;
      const winAmount = parseFloat(betAmount) * multiplier;
      
      const newGame = {
        bet: betAmount,
        result: results,
        sum,
        isWin,
        winAmount: winAmount.toFixed(6),
        time: new Date().toLocaleTimeString()
      };
      
      setGameHistory([newGame, ...gameHistory.slice(0, 4)]);
      
      toast({
        title: isWin ? "Выигрыш!" : "Проигрыш",
        description: isWin 
          ? `Вы выиграли ${winAmount.toFixed(6)} BTC (x${multiplier})`
          : "Попробуйте еще раз!",
        variant: isWin ? "default" : "destructive",
      });
      
      setIsRolling(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {games.map((game, index) => {
          const Icon = game.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <h3 className="text-white font-semibold mb-2">{game.name}</h3>
                <p className="text-gray-400 text-sm mb-1">{game.players} игроков</p>
                <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                  {game.prize}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Dice1 className="w-5 h-5 mr-2 text-cyan-400" />
              Dice Game
            </CardTitle>
            <CardDescription className="text-gray-400">
              Бросьте кости и выиграйте! Сумма ≥7 = выигрыш
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-white">Размер ставки (BTC)</Label>
                <Input
                  placeholder="0.001"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="flex justify-center space-x-4 py-8">
                {diceResult.length > 0 ? (
                  diceResult.map((dice, index) => (
                    <div key={index} className="text-center">
                      <DiceIcon number={dice} />
                    </div>
                  ))
                ) : (
                  <>
                    <Dice1 className="w-8 h-8 text-gray-600" />
                    <Dice1 className="w-8 h-8 text-gray-600" />
                  </>
                )}
              </div>

              {diceResult.length > 0 && (
                <div className="text-center">
                  <Badge className="text-lg px-4 py-2 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    Сумма: {diceResult.reduce((a, b) => a + b, 0)}
                  </Badge>
                </div>
              )}

              <Button
                onClick={rollDice}
                disabled={isRolling}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="lg"
              >
                {isRolling ? (
                  <>
                    <Dice1 className="w-5 h-5 mr-2 animate-spin" />
                    Бросаем кости...
                  </>
                ) : (
                  <>
                    <Dice1 className="w-5 h-5 mr-2" />
                    Бросить кости
                  </>
                )}
              </Button>

              <div className="bg-slate-700/30 rounded-lg p-4 space-y-2">
                <h4 className="text-white font-medium">Правила:</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Сумма 7-10: x2 выигрыш</li>
                  <li>• Сумма 11: x5 выигрыш</li>
                  <li>• Сумма 12: x10 выигрыш</li>
                  <li>• Сумма 2-6: проигрыш</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">История игр</CardTitle>
            <CardDescription className="text-gray-400">
              Последние 5 игр
            </CardDescription>
          </CardHeader>
          <CardContent>
            {gameHistory.length > 0 ? (
              <div className="space-y-3">
                {gameHistory.map((game, index) => (
                  <div key={index} className="p-3 rounded-lg bg-slate-700/30 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {game.result.map((dice: number, i: number) => (
                          <DiceIcon key={i} number={dice} />
                        ))}
                      </div>
                      <Badge
                        className={game.isWin 
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : "bg-red-500/20 text-red-300 border-red-500/30"
                        }
                      >
                        {game.isWin ? "Выигрыш" : "Проигрыш"}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        Ставка: {game.bet} BTC | Сумма: {game.sum}
                      </span>
                      <span className="text-gray-400">{game.time}</span>
                    </div>
                    {game.isWin && (
                      <div className="text-cyan-400 font-medium">
                        Выигрыш: {game.winAmount} BTC
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Gamepad2 className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">Нет истории игр</p>
                <p className="text-gray-500 text-sm">Сыграйте первую игру!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Живая лента выигрышей</CardTitle>
          <CardDescription className="text-gray-400">
            Последние крупные выигрыши других игроков
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { user: "Player***123", game: "Dice", amount: "0.05 BTC", time: "1 мин назад" },
              { user: "User***456", game: "Slots", amount: "0.12 ETH", time: "3 мин назад" },
              { user: "Gamer***789", game: "Roulette", amount: "500 USDT", time: "5 мин назад" },
              { user: "Lucky***321", game: "Crash", amount: "0.08 BTC", time: "7 мин назад" }
            ].map((win, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded bg-slate-700/20">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-white">{win.user}</span>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    {win.game}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 font-medium">{win.amount}</div>
                  <div className="text-gray-400 text-xs">{win.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Casino;
