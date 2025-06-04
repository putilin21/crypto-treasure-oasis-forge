
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, Timer, Gift, Zap, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CryptoFaucet = () => {
  const [countdown, setCountdown] = useState(3600); // 1 hour
  const [canClaim, setCanClaim] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const { toast } = useToast();

  const cryptos = [
    { name: "BTC", reward: "0.00000100", icon: "₿", color: "text-orange-400" },
    { name: "ETH", reward: "0.00001", icon: "Ξ", color: "text-blue-400" },
    { name: "LTC", reward: "0.0001", icon: "Ł", color: "text-gray-400" },
    { name: "DOGE", reward: "0.1", icon: "Ð", color: "text-yellow-400" }
  ];

  const stats = {
    totalClaims: "156,789",
    totalPaid: "$12,345",
    activeUsers: "8,234",
    avgReward: "$0.25"
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanClaim(true);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClaim = () => {
    if (!walletAddress) {
      toast({
        title: "Ошибка",
        description: "Введите адрес кошелька",
        variant: "destructive",
      });
      return;
    }

    const selectedCoin = cryptos.find(c => c.name === selectedCrypto);
    toast({
      title: "Успешно!",
      description: `Вы получили ${selectedCoin?.reward} ${selectedCrypto}`,
    });

    setCountdown(3600);
    setCanClaim(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value], index) => {
          const icons = [Users, Coins, Gift, Zap];
          const Icon = icons[index];
          return (
            <Card key={key} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-sm text-gray-400">
                      {key === "totalClaims" && "Всего заявок"}
                      {key === "totalPaid" && "Выплачено"}
                      {key === "activeUsers" && "Активных пользователей"}
                      {key === "avgReward" && "Средняя награда"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Coins className="w-5 h-5 mr-2 text-cyan-400" />
              Криптокран
            </CardTitle>
            <CardDescription className="text-gray-400">
              Получайте бесплатные криптовалюты каждый час
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="crypto" className="text-white">Выберите криптовалюту</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {cryptos.map((crypto) => (
                    <Button
                      key={crypto.name}
                      variant={selectedCrypto === crypto.name ? "default" : "outline"}
                      className={`${selectedCrypto === crypto.name 
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500" 
                        : "border-slate-600 hover:border-slate-500"} text-white`}
                      onClick={() => setSelectedCrypto(crypto.name)}
                    >
                      <span className={`mr-2 ${crypto.color}`}>{crypto.icon}</span>
                      {crypto.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="wallet" className="text-white">Адрес кошелька</Label>
                <Input
                  id="wallet"
                  placeholder={`Введите ${selectedCrypto} адрес`}
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="text-center space-y-4">
                {!canClaim ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Timer className="w-5 h-5 text-orange-400" />
                      <span className="text-2xl font-mono text-white">
                        {formatTime(countdown)}
                      </span>
                    </div>
                    <p className="text-gray-400">До следующей заявки</p>
                    <Progress value={(3600 - countdown) / 36} className="h-2" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-4 py-2">
                      Готово к получению!
                    </Badge>
                    <p className="text-gray-400">
                      Награда: {cryptos.find(c => c.name === selectedCrypto)?.reward} {selectedCrypto}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleClaim}
                  disabled={!canClaim || !walletAddress}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50"
                  size="lg"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  {canClaim ? "Получить награду" : "Ожидание..."}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Реклама</CardTitle>
            <CardDescription className="text-gray-400">
              Основной источник дохода крана
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center border border-slate-600">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-semibold">Рекламный блок</p>
                  <p className="text-gray-400 text-sm">728x90 баннер</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center border border-slate-600">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white text-sm">300x250</p>
                  </div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center border border-slate-600">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white text-sm">300x250</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoFaucet;
