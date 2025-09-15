import React, { useState, useEffect } from "react";
import { OptionsSpread } from "@/entities/OptionsSpread";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp, Activity } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart as RechartsPieChart, 
  Pie, // Added Pie import
  Cell, 
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AnalyticsPage() {
  const [spreads, setSpreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const data = await OptionsSpread.list("-created_date", 1000);
      setSpreads(data);
    } catch (error) {
      console.error("Error loading analytics data:", error);
    }
    setIsLoading(false);
  };

  // Process data for charts
  const spreadTypeData = spreads.reduce((acc, spread) => {
    const type = spread.spread_type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(spreadTypeData).map(([name, value]) => ({ name, value }));

  const expectedValueDistribution = Array.from({length: 10}, (_, i) => {
    const min = -500 + (i * 100);
    const max = min + 100;
    const count = spreads.filter(s => s.expected_value >= min && s.expected_value < max).length;
    return {
      range: `$${min}-${max}`,
      count
    };
  });

  const probabilityVsValue = spreads.map(s => ({
    probability: s.profit_probability,
    expectedValue: s.expected_value,
    symbol: s.symbol
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const stats = {
    totalSpreads: spreads.length,
    avgExpectedValue: spreads.length ? spreads.reduce((sum, s) => sum + s.expected_value, 0) / spreads.length : 0,
    profitableCount: spreads.filter(s => s.expected_value > 0).length,
    avgProbability: spreads.length ? spreads.reduce((sum, s) => sum + s.profit_probability, 0) / spreads.length : 0
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Deep insights into your options spread opportunities</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Total Spreads
              </CardTitle>
              <div className="text-2xl font-bold text-white">{stats.totalSpreads}</div>
            </CardHeader>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-gray-400">Avg Expected Value</CardTitle>
              <div className={`text-2xl font-bold ${stats.avgExpectedValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${stats.avgExpectedValue.toFixed(2)}
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-gray-400">Profitable Spreads</CardTitle>
              <div className="text-2xl font-bold text-green-400">{stats.profitableCount}</div>
              <div className="text-sm text-gray-400">
                ({((stats.profitableCount / (stats.totalSpreads || 1)) * 100).toFixed(1)}%)
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-gray-400">Avg Win Rate</CardTitle>
              <div className="text-2xl font-bold text-blue-400">{stats.avgProbability.toFixed(1)}%</div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Spread Type Distribution */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="p-4 border-b border-gray-700">
              <CardTitle className="text-white flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Spread Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expected Value Distribution */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="p-4 border-b border-gray-700">
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Expected Value Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expectedValueDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="range" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Probability vs Expected Value Scatter */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="p-4 border-b border-gray-700">
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Win Probability vs Expected Value
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={probabilityVsValue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  type="number" 
                  dataKey="probability" 
                  name="Win Probability"
                  unit="%" 
                  stroke="#9ca3af"
                />
                <YAxis 
                  type="number" 
                  dataKey="expectedValue" 
                  name="Expected Value"
                  unit="$" 
                  stroke="#9ca3af"
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 shadow-lg">
                          <p className="text-white font-medium">{data.symbol}</p>
                          <p className="text-blue-400">Probability: {data.probability.toFixed(1)}%</p>
                          <p className="text-green-400">Expected Value: ${data.expectedValue.toFixed(2)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter dataKey="expectedValue" fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading analytics data...</div>
          </div>
        )}
      </div>
    </div>
  );
}
