
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FilterInterface() {
  const [timeRange, setTimeRange] = useState('30');
  const [showNull, setShowNull] = useState(false);
  const [volumeValue, setVolumeValue] = useState(20);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return (
    <div className="p-4 bg-card rounded-lg border border-border mt-4">
      {/* Time Range Selector */}
      <div className="mb-8">
        <div className="flex rounded-md overflow-hidden border border-border p-1 bg-white">
          <button 
            className={cn(
              "flex-1 py-3 px-4 text-center rounded-md",
              timeRange === '30' 
                ? 'bg-primary/10 text-primary' 
                : 'bg-white text-foreground/70'
            )}
            onClick={() => setTimeRange('30')}
          >
            Last 30 days
          </button>
          <button 
            className={cn(
              "flex-1 py-3 px-4 text-center rounded-md",
              timeRange === '60' 
                ? 'bg-primary/10 text-primary' 
                : 'bg-white text-foreground/70'
            )}
            onClick={() => setTimeRange('60')}
          >
            Last 60 days
          </button>
          <button 
            className={cn(
              "flex-1 py-3 px-4 text-center rounded-md",
              timeRange === '180' 
                ? 'bg-primary/10 text-primary' 
                : 'bg-white text-foreground/70'
            )}
            onClick={() => setTimeRange('180')}
          >
            Last 6 months
          </button>
        </div>
      </div>

      {/* Month Dropdown */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-foreground mb-2">Month</label>
        <div className="relative">
          <select 
            className="block w-full pl-4 pr-10 py-3 text-foreground/70 bg-white border border-input rounded-md appearance-none focus:outline-none focus:ring-ring focus:border-primary"
            defaultValue=""
          >
            <option value="" disabled>Select values</option>
            <option value="jan">January</option>
            <option value="feb">February</option>
            <option value="mar">March</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground/70">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Show Null Toggle */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-lg font-medium text-foreground">Show null</span>
        <Switch 
          checked={showNull}
          onCheckedChange={setShowNull}
        />
      </div>

      {/* Volume Slider */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-foreground mb-2">By volume</label>
        <div className="relative mb-2">
          <div className="w-full h-2 bg-secondary rounded-lg">
            <div 
              className="absolute h-2 bg-primary rounded-l-lg" 
              style={{ width: `${volumeValue}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volumeValue}
            onChange={(e) => setVolumeValue(parseInt(e.target.value))}
            className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
          />
          <div 
            style={{ left: `${volumeValue}%` }}
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-background border-2 border-primary rounded-full"
          />
        </div>
        <div className="flex justify-between text-sm text-foreground/70">
          <span>0</span>
          <span>100</span>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-foreground mb-2">By Price</label>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="block w-full rounded-md border border-input py-3 px-4 bg-white text-foreground focus:outline-none focus:ring-ring focus:border-primary"
          />
          <span className="mx-2 text-foreground/50">–</span>
          <input
            type="text"
            placeholder="max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="block w-full rounded-md border border-input py-3 px-4 bg-white text-foreground focus:outline-none focus:ring-ring focus:border-primary"
          />
        </div>
      </div>

      {/* Apply Button */}
      <Button className="w-32">
        Apply
      </Button>
    </div>
  );
}
