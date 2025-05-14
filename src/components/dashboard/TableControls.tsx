
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TableControls: React.FC = () => {
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState([0]);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  return (
    <Card className="shadow-sm w-80 bg-white">
      <CardContent className="py-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">New Control 11</h3>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select values" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">New Control 12</h3>
          <div className="flex items-center space-x-2">
            <span className="text-base">False</span>
            <Switch 
              checked={switchValue} 
              onCheckedChange={setSwitchValue}
              className="data-[state=checked]:bg-secondary-outline-color data-[state=checked]:border-secondary-outline-color"
            />
            <span className="text-base">True</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">New Control 7</h3>
          <div className="pt-4 pb-2">
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
              className="[&>.relative>.absolute]:bg-secondary-outline-color"
            />
          </div>
          <div className="flex justify-between mt-1 text-sm">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">New Control 4</h3>
          <div className="flex items-center space-x-2">
            <Input 
              type="text" 
              placeholder="min" 
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
            />
            <span>-</span>
            <Input 
              type="text" 
              placeholder="max" 
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
            />
          </div>
        </div>

        <Button className="bg-secondary-outline-color hover:bg-secondary-outline-color/90">
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default TableControls;
