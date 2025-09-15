import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const getSpreadTypeLabel = (type) => {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const getSpreadTypeColor = (type) => {
  if (type.includes('bull')) return 'bg-green-500/20 text-green-400 border-green-500/50';
  if (type.includes('bear')) return 'bg-red-500/20 text-red-400 border-red-500/50';
  return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
};

export default function SpreadTable({ spreads, isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="p-4">
          <CardTitle className="text-white">Loading Spreads...</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4 p-4">
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-16 bg-gray-700" />
                <Skeleton className="h-4 w-24 bg-gray-700" />
                <Skeleton className="h-4 w-20 bg-gray-700" />
                <Skeleton className="h-4 w-20 bg-gray-700" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="p-4 border-b border-gray-700">
        <CardTitle className="text-white">Spread Opportunities ({spreads.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-700/50">
                <TableHead className="text-gray-300">Symbol</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Expected Value</TableHead>
                <TableHead className="text-gray-300">Max Profit</TableHead>
                <TableHead className="text-gray-300">Max Loss</TableHead>
                <TableHead className="text-gray-300">Probability</TableHead>
                <TableHead className="text-gray-300">Days</TableHead>
                <TableHead className="text-gray-300">Strikes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spreads.map((spread) => (
                <TableRow 
                  key={spread.id} 
                  className="border-gray-700 hover:bg-gray-700/30 transition-colors cursor-pointer"
                >
                  <TableCell>
                    <div className="font-medium text-white">
                      {spread.symbol}
                    </div>
                    <div className="text-sm text-gray-400 truncate max-w-32">
                      {spread.company_name}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={`border ${getSpreadTypeColor(spread.spread_type)}`}>
                      {getSpreadTypeLabel(spread.spread_type)}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className={`font-semibold flex items-center gap-1 ${
                      spread.expected_value >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {spread.expected_value >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {formatCurrency(spread.expected_value)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-semibold text-green-400">
                      {formatCurrency(spread.max_profit)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-semibold text-red-400">
                      {formatCurrency(Math.abs(spread.max_loss))}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-semibold text-blue-400">
                      {spread.profit_probability.toFixed(1)}%
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-semibold text-gray-300">
                      {spread.days_to_expiration}d
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm text-gray-400">
                      {spread.strike_price_short}/{spread.strike_price_long}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
