
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Coins, DollarSign, Target, Bot, Zap } from "lucide-react";

const Dashboard = () => {
  const stats = {
    totalUsers: "12,543",
    dailyRevenue: "$8,742",
    totalClaims: "156,789",
    activeGames: "234",
    botUsers: "3,421",
    conversionRate: "15.6%"
  };

  const revenueStreams = [
    { name: "Реклама в кране", revenue: "$3,200", growth: "+12%", color: "text-green-400" },
    { name: "Комиссии обменника", revenue: "$2,800", growth: "+8%", color: "text-green-400" },
    { name: "Казино", revenue: "$1,900", growth: "+15%", color: "text-green-400" },
    { name: "Букмекер", revenue: "$742", growth: "-2%", color: "text-red-400" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Всего пользователей</CardTitle>
            <Users className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
            <p className="text-xs text-green-400">
              +20.1% с прошлого месяца
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Дневной доход</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.dailyRevenue}</div>
            <p className="text-xs text-green-400">
              +15.3% с вчера
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Заявки крана</CardTitle>
            <Coins className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalClaims}</div>
            <p className="text-xs text-green-400">
              +7.2% сегодня
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Источники дохода</CardTitle>
            <CardDescription className="text-gray-400">
              Разбивка по категориям за сегодня
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{stream.name}</p>
                  <p className="text-xl font-bold text-white">{stream.revenue}</p>
                </div>
                <Badge variant="outline" className={`${stream.color} border-current`}>
                  {stream.growth}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Активность пользователей</CardTitle>
            <CardDescription className="text-gray-400">
              Статистика за последние 24 часа
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Активные игры</span>
                <span className="text-white">{stats.activeGames}</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Пользователи ботов</span>
                <span className="text-white">{stats.botUsers}</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Конверсия</span>
                <span className="text-white">{stats.conversionRate}</span>
              </div>
              <Progress value={16} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Быстрые действия</CardTitle>
          <CardDescription className="text-gray-400">
            Управление платформой
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Zap className="w-4 h-4 mr-2" />
              Настроить кран
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Добавить пару
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Target className="w-4 h-4 mr-2" />
              Новая игра
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Bot className="w-4 h-4 mr-2" />
              Управление ботами
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
