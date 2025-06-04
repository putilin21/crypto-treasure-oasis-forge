
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Gamepad2, Trophy, Bot, Zap, DollarSign, Users } from "lucide-react";
import Header from "@/components/Header";
import CryptoFaucet from "@/components/CryptoFaucet";
import Exchange from "@/components/Exchange";
import Casino from "@/components/Casino";
import Bookmaker from "@/components/Bookmaker";
import BotPanel from "@/components/BotPanel";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <Header />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            CryptoHub Pro
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Полная экосистема для криптовалют: кран, обменник, казино и букмекер
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
              <Coins className="w-4 h-4 mr-2" />
              Криптокран
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              Обменник
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Казино
            </Badge>
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
              <Trophy className="w-4 h-4 mr-2" />
              Букмекер
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Bot className="w-4 h-4 mr-2" />
              Телеграм боты
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              <DollarSign className="w-4 h-4 mr-2" />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="faucet" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              <Coins className="w-4 h-4 mr-2" />
              Кран
            </TabsTrigger>
            <TabsTrigger value="exchange" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              <TrendingUp className="w-4 h-4 mr-2" />
              Обменник
            </TabsTrigger>
            <TabsTrigger value="casino" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Казино
            </TabsTrigger>
            <TabsTrigger value="betting" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              <Trophy className="w-4 h-4 mr-2" />
              Ставки
            </TabsTrigger>
            <TabsTrigger value="bots" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              <Bot className="w-4 h-4 mr-2" />
              Боты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="faucet">
            <CryptoFaucet />
          </TabsContent>

          <TabsContent value="exchange">
            <Exchange />
          </TabsContent>

          <TabsContent value="casino">
            <Casino />
          </TabsContent>

          <TabsContent value="betting">
            <Bookmaker />
          </TabsContent>

          <TabsContent value="bots">
            <BotPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
