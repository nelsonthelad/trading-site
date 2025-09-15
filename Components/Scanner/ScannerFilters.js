import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, RefreshCw } from "lucide-react";

export default function ScannerFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    onFiltersChange({
      spreadType: "all",
      minExpectedValue: 0,
      maxDaysToExpiration: 45,
      minProbability: 50,
      symbol: ""
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== "all" && value !== 0 && value !== 45 && value !== 50 && value !== ""
  ).length;

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="p-4 border-b border-gray-700">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-green-400" />
            Filters
          </div>
          {activeFiltersCount > 0 && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              {activeFiltersCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-6">
        {/* Symbol Search */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Symbol Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="AAPL, MSFT, etc."
              value={filters.symbol}
              onChange={(e) => handleFilterChange('symbol', e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Spread Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Spread Type
          </label>
          <select
            value={filters.spreadType}
            onChange={(e) => handleFilterChange('spreadType', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="bull_call_spread">Bull Call Spread</option>
            <option value="bear_put_spread">Bear Put Spread</option>
            <option value="iron_condor">Iron Condor</option>
            <option value="calendar_spread">Calendar Spread</option>
            <option value="butterfly_spread">Butterfly Spread</option>
          </select>
        </div>

        {/* Expected Value */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Min Expected Value
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">$</span>
            <input
              type="number"
              placeholder="0"
              value={filters.minExpectedValue}
              onChange={(e) => handleFilterChange('minExpectedValue', parseFloat(e.target.value) || 0)}
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Days to Expiration */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Max Days to Expiration
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="45"
              value={filters.maxDaysToExpiration}
              onChange={(e) => handleFilterChange('maxDaysToExpiration', parseInt(e.target.value) || 45)}
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="text-gray-400">days</span>
          </div>
        </div>

        {/* Probability */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Min Win Probability
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="50"
              value={filters.minProbability}
              onChange={(e) => handleFilterChange('minProbability', parseInt(e.target.value) || 50)}
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="text-gray-400">%</span>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quick Filters
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('minExpectedValue', 50)}
              className="text-xs bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              EV > $50
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('minProbability', 70)}
              className="text-xs bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              Win > 70%
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('maxDaysToExpiration', 30)}
              className="text-xs bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              &lt; 30 Days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('spreadType', 'iron_condor')}
              className="text-xs bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              Iron Condor
            </Button>
          </div>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Clear All Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
}