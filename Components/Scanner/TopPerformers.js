import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Clock } from "lucide-react";

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

export default function TopPerformers({ spreads }) {
  if (!spreads || spreads.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="p-4">
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="w-5 h-5 text-green-400" />
            Top Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-center text-gray-400 py-8">
            No opportunities found. Run a scan to discover spread strategies.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="p-4 border-b border-gray-700">
        <CardTitle className="flex items-center gap-2 text-white">
          <Target className="w-5 h-5 text-green-400" />
          Top Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid gap-4">
          {spreads.map((spread, index) => (
            <div 
              key={spread.id}
              className="relative bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-green-500/50 transition-all cursor-pointer group"
            >
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  #{index + 1}
                </Badge>
              </div>
              
              <div className="pr-16">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-xl font-bold text-white">
                    {spread.symbol}
                  </div>
                  <Badge className="text-xs">
                    {spread.spread_type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-300 mb-3 truncate">
                  {spread.company_name}
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Expected Value</div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="font-bold text-green-400">
                        {formatCurrency(spread.expected_value)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Probability</div>
                    <div className="font-bold text-blue-400">
                      {spread.profit_probability.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Days to Expiry</div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-bold text-gray-300">
                        {spread.days_to_expiration}d
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
