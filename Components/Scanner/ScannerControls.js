import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Upload, RefreshCw } from "lucide-react";

export default function ScannerControls({ onScan, isScanning, onUpload }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Button
            onClick={onScan}
            disabled={isScanning}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            {isScanning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </Button>
          
          <Button
            onClick={onUpload}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
