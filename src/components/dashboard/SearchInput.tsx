
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search..." 
}) => {
  return (
    <Card className="w-full mb-4 shadow-sm" style={{ background: "var(--card-color)" }}>
      <CardContent className="py-3">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500" />
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-8 text-sm bg-transparent border-neutral-200 focus-visible:ring-blue-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchInput;
