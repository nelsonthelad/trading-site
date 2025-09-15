import React, { useState, useEffect, useCallback } from "react";
import { OptionsSpread } from "@/entities/OptionsSpread";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RefreshCw, Upload, TrendingUp, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import ScannerFilters from "../components/scanner/ScannerFilters";
import SpreadTable from "../components/scanner/SpreadTable";
import TopPerformers from "../components/scanner/TopPerformers";
import ScannerControls from "../components/scanner/ScannerControls";

export default function ScannerPage() {
  const [spreads, setSpreads] = useState([]);
  const [filteredSpreads, setFilteredSpreads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    spreadType: "all",
    minExpectedValue: 0,
    maxDaysToExpiration: 45,
    minProbability: 50,
    symbol: ""
  });
  const [isScanning, setIsScanning] = useState(false);

  const applyFilters = useCallback(() => {
    let filtered = spreads;

    if (filters.spreadType !== "all") {
      filtered = filtered.filter(s => s.spread_type === filters.spreadType);
    }

    if (filters.symbol) {
      filtered = filtered.filter(s => 
        s.symbol.toLowerCase().includes(filters.symbol.toLowerCase()) ||
        s.company_name.toLowerCase().includes(filters.symbol.toLowerCase())
      );
    }

    filtered = filtered.filter(s => 
      s.expected_value >= filters.minExpectedValue &&
      s.days_to_expiration <= filters.maxDaysToExpiration &&
      s.profit_probability >= filters.minProbability
    );

    setFilteredSpreads(filtered);
  }, [spreads, filters]); // Dependencies for useCallback

  useEffect(() => {
    loadSpreads();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]); // Dependency for useEffect is the memoized function

  const loadSpreads = async () => {
    setIsLoading(true);
    try {
      const data = await OptionsSpread.list("-expected_value", 500);
      setSpreads(data);
    } catch (error) {
      console.error("Error loading spreads:", error);
    }
    setIsLoading(false);
  };

  const handleScan = async () => {
    setIsScanning(true);
    // In a real implementation, this would trigger the options scanning API
    // For now, we'll simulate with a delay
    setTimeout(() => {
      setIsScanning(false);
      loadSpreads();
    }, 3000);
  };

  const stats = {
    totalScanned: spreads.length,
    profitableCount: spreads.filter(s => s.expected_value > 0).length,
    avgExpectedValue: spreads.length ? (spreads.reduce((sum, s) => sum + s.expected_value, 0) / spreads.length).toFixed(2) : 0,
    topProbability: spreads.length ? Math.max(...spreads.map(s => s.profit_probability)).toFixed(1) : 0
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Options Spread Scanner</h1>
            <p className="text-gray-400">Scan the S&P 500 for optimal spread opportunities</p>
          </div>
          
          <ScannerControls 
            onScan={handleScan}
            isScanning={isScanning}
            onUpload={() => {}} // Will implement CSV upload later
          />
        </div>

        {/* Data Notice */}
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-200">
            Real-time options data integration required. Upload CSV data from your broker or enable market data API.
          </AlertDescription>
        </Alert>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-gray-400">Total Spreads</CardTitle>
              <div className="text-2xl font-bold text-white">{stats.totalScanned}</div>
            </CardHeader>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-gray-400">Profitable</CardTitle>
              <div className="text-2xl font-bold text-green-400">{stats.profitableCount}</div>
            </CardHeader>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-gray-400">Avg Expected Value</CardTitle>
              <div className={`text-2xl font-bold ${parseFloat(stats.avgExpectedValue) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${stats.avgExpectedValue}
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium text-gray-400">Best Probability</CardTitle>
              <div className="text-2xl font-bold text-blue-400">{stats.topProbability}%</div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <ScannerFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <TopPerformers spreads={filteredSpreads.slice(0, 3)} />
            <SpreadTable 
              spreads={filteredSpreads}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
