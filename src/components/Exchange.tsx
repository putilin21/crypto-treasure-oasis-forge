
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ArrowUpDown, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Exchange = () => {
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const { toast } = useToast();

  const currencies = [
    { symbol: "BTC", name: "Bitcoin", price: "$43,200", change: "+2.4%", icon: "₿" },
    { symbol: "ETH", name: "Ethereum", price: "$2,680", change: "+1.8%", icon: "Ξ" },
    { symbol: "USDT", name: "Tether", price: "$1.00", change: "+0.1%", icon: "$" },
    { symbol: "BNB", name: "Binance Coin", price: "$320", change: "-0.5%", icon: "B" },
    { symbol: "ADA", name: "Cardano", price: "$0.45", change: "+3.2%", icon: "₳" },
    { symbol: "DOT", name: "Polkadot", price: "$7.20", change: "+1.1%", icon: "●" }
  ];

  const recentTrades = [
    { pair: "BTC/USDT", amount: "0.5", price: "$43,200", time: "2 мин назад" },
    { pair: "ETH/BTC", amount: "2.1", price: "0.062", time: "5 мин назад" },
    { pair: "ADA/USDT", amount: "1000", price: "$0.45", time: "8 мин назад" }
  ];

  const handleSwap = () => {
    if (!fromAmount || !fromCurrency || !toCurrency) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Обмен успешен!",
      description: `Обменяли ${fromAmount} ${fromCurrency} на ${toAmount} ${toCurrency}`,
    });
  };

  const handleAmountChange = (value: string) => {
    setFromAmount(value);
    // Simulate exchange rate calculation
    const rate = fromCurrency === "BTC" && toCurrency === "ETH" ? 16.1 : 0.062;
    setToAmount((parseFloat(value) * rate || 0).toFixed(6));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <ArrowUpDown className="w-5 h-5 mr-2 text-cyan-400" />
                Обменник
              </CardTitle>
              <CardDescription className="text-gray-400">
                Мгновенный обмен криптовалют с минимальными комиссиями
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Отдаете</Label>
                  <div className="flex space-x-2">
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="w-32 bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {currencies.map((currency) => (
                          <SelectItem key={currency.symbol} value={currency.symbol}>
                            <span className="flex items-center">
                              <span className="mr-2">{currency.icon}</span>
                              {currency.symbol}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white flex-1"
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    Доступно: 0.00156789 {fromCurrency}
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 hover:border-slate-500"
                    onClick={() => {
                      const temp = fromCurrency;
                      setFromCurrency(toCurrency);
                      setToCurrency(temp);
                    }}
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Получаете</Label>
                  <div className="flex space-x-2">
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="w-32 bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        {currencies.map((currency) => (
                          <SelectItem key={currency.symbol} value={currency.symbol}>
                            <span className="flex items-center">
                              <span className="mr-2">{currency.icon}</span>
                              {currency.symbol}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="0.00"
                      value={toAmount}
                      readOnly
                      className="bg-slate-700 border-slate-600 text-white flex-1"
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    Курс: 1 {fromCurrency} = {fromCurrency === "BTC" ? "16.1" : "0.062"} {toCurrency}
                  </p>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Комиссия сети:</span>
                    <span className="text-white">0.0001 {fromCurrency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Комиссия платформы:</span>
                    <span className="text-white">0.5%</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium border-t border-slate-600 pt-2">
                    <span className="text-gray-300">Итого к получению:</span>
                    <span className="text-cyan-400">{toAmount} {toCurrency}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSwap}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                  size="lg"
                >
                  <ArrowUpDown className="w-5 h-5 mr-2" />
                  Обменять
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Курсы валют</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currencies.map((currency) => (
                <div key={currency.symbol} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {currency.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium">{currency.symbol}</p>
                      <p className="text-gray-400 text-xs">{currency.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{currency.price}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${currency.change.startsWith('+') 
                        ? 'text-green-400 border-green-400' 
                        : 'text-red-400 border-red-400'}`}
                    >
                      {currency.change.startsWith('+') ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {currency.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Последние сделки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTrades.map((trade, index) => (
                <div key={index} className="p-3 rounded-lg bg-slate-700/30 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 font-medium">{trade.pair}</span>
                    <span className="text-white">{trade.amount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{trade.price}</span>
                    <span className="text-gray-400">{trade.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
