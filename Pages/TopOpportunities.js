import React, { useState, useEffect } from "react";
import { OptionsSpread } from "@/entities/OptionsSpread";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Award, Star } from "lucide-react";

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

export default function TopOpportunitiesPage() {
  const [spreads, setSpreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTopSpreads();
  }, []);

  const loadTopSpreads = async () => {
    setIsLoading(true);
    try {
      const data = await OptionsSpread.list("-expected_value", 20);
      setSpreads(data.filter(s => s.expected_value > 0));
    } catch (error) {
      console.error("Error loading spreads:", error);
    }
    setIsLoading(false);
  };

  const topByValue = spreads.slice(0, 5);
  const topByProbability = [...spreads].sort((a, b) => b.profit_probability - a.profit_probability).slice(0, 5);
  const topByRatio = [...spreads].sort((a, b) => (b.max_profit / Math.abs(b.max_loss)) - (a.max_profit / Math.abs(a.max_loss))).slice(0, 5);

  const OpportunityCard = ({ spread, rank, metric, metricValue, icon: Icon }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-green-500/50 transition-all cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <Icon className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{spread.symbol}</div>
              <div className="text-sm text-gray-400 truncate max-w-48">
                {spread.company_name}
              </div>
            </div>
          </div>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
            #{rank}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">{metric}</span>
            <span className="font-bold text-green-400">{metricValue}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Expected Value:</span>
              <div className="font-semibold text-green-400">
                {formatCurrency(spread.expected_value)}
              </div>
            </div>
            <div>
              <span className="text-gray-400">Probability:</span>
              <div className="font-semibold text-blue-400">
                {spread.profit_probability.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm pt-3 border-t border-gray-600">
            <div>
              <span className="text-gray-400">Max Profit:</span>
              <div className="font-semibold text-green-400">
                {formatCurrency(spread.max_profit)}
              </div>
            </div>
            <div>
              <span className="text-gray-400">Max Loss:</span>
              <div className="font-semibold text-red-400">
                {formatCurrency(Math.abs(spread.max_loss))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-600">
            <span className="text-gray-400">
              {spread.spread_type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </span>
            <span className="text-gray-400">
              {spread.days_to_expiration} days
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Top Opportunities</h1>
          <p className="text-gray-400">The highest-performing spreads across all metrics</p>
        </div>

        {/* Best Expected Value */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Highest Expected Value</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {topByValue.map((spread, index) => (
              <OpportunityCard
                key={spread.id}
                spread={spread}
                rank={index + 1}
                metric="Expected Value"
                metricValue={formatCurrency(spread.expected_value)}
                icon={TrendingUp}
              />
            ))}
          </div>
        </section>

        {/* Best Probability */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Highest Win Probability</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {topByProbability.map((spread, index) => (
              <OpportunityCard
                key={spread.id}
                spread={spread}
                rank={index + 1}
                metric="Win Probability"
                metricValue={`${spread.profit_probability.toFixed(1)}%`}
                icon={Award}
              />
            ))}
          </div>
        </section>

        {/* Best Risk/Reward Ratio */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Best Risk/Reward Ratio</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {topByRatio.map((spread, index) => (
              <OpportunityCard
                key={spread.id}
                spread={spread}
                rank={index + 1}
                metric="Profit/Risk Ratio"
                metricValue={`${(spread.max_profit / Math.abs(spread.max_loss)).toFixed(2)}:1`}
                icon={Star}
              />
            ))}
          </div>
        </section>

        {isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading top opportunities...</div>
          </div>
        )}

        {!isLoading && spreads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400">No profitable opportunities found. Run a scan to discover spreads.</div>
          </div>
        )}
      </div>
    </div>
  );
}
