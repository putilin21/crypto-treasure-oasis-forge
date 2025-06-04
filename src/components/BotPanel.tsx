
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Bot, MessageSquare, Users, Settings, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BotPanel = () => {
  const [botToken, setBotToken] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [botSettings, setBotSettings] = useState({
    faucetEnabled: true,
    casinoEnabled: true,
    exchangeEnabled: false,
    bettingEnabled: true
  });
  const { toast } = useToast();

  const bots = [
    {
      name: "Faucet Bot",
      description: "Автоматические выплаты из крана",
      users: "1,234",
      status: "active",
      revenue: "$456"
    },
    {
      name: "Casino Bot",
      description: "Игры в Telegram",
      users: "856",
      status: "active",
      revenue: "$789"
    },
    {
      name: "Trading Bot",
      description: "Уведомления о курсах",
      users: "567",
      status: "inactive",
      revenue: "$123"
    },
    {
      name: "Betting Bot",
      description: "Ставки через Telegram",
      users: "345",
      status: "active",
      revenue: "$234"
    }
  ];

  const stats = [
    { label: "Всего ботов", value: "4", icon: Bot },
    { label: "Активных пользователей", value: "3,002", icon: Users },
    { label: "Сообщений в день", value: "12,456", icon: MessageSquare },
    { label: "Доход от ботов", value: "$1,602", icon: TrendingUp }
  ];

  const handleSaveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Конфигурация ботов обновлена",
    });
  };

  const handleTestBot = () => {
    if (!botToken) {
      toast({
        title: "Ошибка",
        description: "Введите токен бота",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Бот протестирован",
      description: "Соединение установлено успешно",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Icon className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
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
              <Settings className="w-5 h-5 mr-2 text-blue-400" />
              Настройка ботов
            </CardTitle>
            <CardDescription className="text-gray-400">
              Конфигурация Telegram ботов для монетизации
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-white">Токен Telegram бота</Label>
                <Input
                  placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <p className="text-gray-400 text-sm mt-1">
                  Получите токен у @BotFather
                </p>
              </div>

              <div>
                <Label className="text-white">Webhook URL</Label>
                <Input
                  placeholder="https://your-domain.com/webhook"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-white">Функции ботов</Label>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Фаусет бот</p>
                      <p className="text-gray-400 text-sm">Автоматические выплаты</p>
                    </div>
                    <Switch
                      checked={botSettings.faucetEnabled}
                      onCheckedChange={(checked) => setBotSettings(prev => ({
                        ...prev,
                        faucetEnabled: checked
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Казино бот</p>
                      <p className="text-gray-400 text-sm">Игры в чате</p>
                    </div>
                    <Switch
                      checked={botSettings.casinoEnabled}
                      onCheckedChange={(checked) => setBotSettings(prev => ({
                        ...prev,
                        casinoEnabled: checked
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Обменник бот</p>
                      <p className="text-gray-400 text-sm">Быстрый обмен</p>
                    </div>
                    <Switch
                      checked={botSettings.exchangeEnabled}
                      onCheckedChange={(checked) => setBotSettings(prev => ({
                        ...prev,
                        exchangeEnabled: checked
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Букмекер бот</p>
                      <p className="text-gray-400 text-sm">Ставки на спорт</p>
                    </div>
                    <Switch
                      checked={botSettings.bettingEnabled}
                      onCheckedChange={(checked) => setBotSettings(prev => ({
                        ...prev,
                        bettingEnabled: checked
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleTestBot}
                  variant="outline"
                  className="border-slate-600 hover:border-slate-500"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Тест
                </Button>
                <Button
                  onClick={handleSaveSettings}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex-1"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Сохранить настройки
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Активные боты</CardTitle>
            <CardDescription className="text-gray-400">
              Статус и производительность ботов
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bots.map((bot, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-700/30 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium">{bot.name}</h4>
                    <p className="text-gray-400 text-sm">{bot.description}</p>
                  </div>
                  <Badge
                    className={bot.status === 'active' 
                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                      : "bg-red-500/20 text-red-300 border-red-500/30"
                    }
                  >
                    {bot.status === 'active' ? 'Активен' : 'Неактивен'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Пользователи:</span>
                    <span className="text-white ml-2">{bot.users}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Доход:</span>
                    <span className="text-cyan-400 ml-2">{bot.revenue}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-slate-600 hover:border-slate-500">
                    <Settings className="w-3 h-3 mr-1" />
                    Настроить
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600 hover:border-slate-500">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Логи
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Команды ботов</CardTitle>
          <CardDescription className="text-gray-400">
            Настройка команд и ответов для Telegram ботов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-medium">Команды фаусет бота</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-slate-700/20 rounded">
                  <code className="text-cyan-400">/start</code>
                  <span className="text-gray-400">Приветствие</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-700/20 rounded">
                  <code className="text-cyan-400">/claim</code>
                  <span className="text-gray-400">Получить награду</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-700/20 rounded">
                  <code className="text-cyan-400">/balance</code>
                  <span className="text-gray-400">Проверить баланс</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-700/20 rounded">
                  <code className="text-cyan-400">/referral</code>
                  <span className="text-gray-400">Реферальная программа</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-medium">Команды казино бота</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-slate-700/20 rounded">
                  <code className="text-cyan-400">/dice</code>
                  <span className="text-gray-400">Игра в кости</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-700/20 rounded">
                  <code className="text-cyan-400">/slots</code>
                  <span className="text-gray-400">Слоты</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-700/20 rounded">
                  <code className="text-cyan-400">/roulette</code>
                  <span className="text-gray-400">Рулетка</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-700/20 rounded">
                  <code className="text-cyan-400">/stats</code>
                  <span className="text-gray-400">Статистика игр</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BotPanel;
