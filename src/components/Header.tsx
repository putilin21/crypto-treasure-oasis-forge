
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wallet, Bell, Settings, LogOut, User } from "lucide-react";

const Header = () => {
  const [balance] = useState({
    btc: "0.00156789",
    eth: "0.2456",
    usdt: "1,234.56"
  });

  return (
    <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="text-xl font-bold text-white">CryptoHub</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4 text-cyan-400" />
                <div className="text-sm">
                  <Badge variant="outline" className="bg-slate-800 border-cyan-500/30 text-cyan-300">
                    BTC: {balance.btc}
                  </Badge>
                </div>
              </div>
              <div className="text-sm">
                <Badge variant="outline" className="bg-slate-800 border-green-500/30 text-green-300">
                  ETH: {balance.eth}
                </Badge>
              </div>
              <div className="text-sm">
                <Badge variant="outline" className="bg-slate-800 border-yellow-500/30 text-yellow-300">
                  USDT: {balance.usdt}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
