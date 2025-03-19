
import React from "react";
import { usePivotContext } from "@/contexts/PivotContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { fieldMap } from "@/services/DataService";

const DataTable: React.FC = () => {
  const { processedData, pivotRowItems, pivotColumnItems, valuesItems } = usePivotContext();

  // If no data or configuration is selected, show default table
  if (pivotRowItems.length === 0 && pivotColumnItems.length === 0 && valuesItems.length === 0) {
    return (
      <div className="bg-white border absolute z-0 flex min-h-[268px] w-[576px] max-w-full overflow-hidden text-[11px] text-neutral-900 font-normal leading-[1.2] h-[268px] rounded-lg border-[rgba(0,89,235,1)] border-solid left-6 top-[57px]">
        <div className="bg-[rgba(238,238,238,1)] overflow-hidden w-[195px]">
          <div className="border-neutral-200 flex w-full items-center gap-1 text-xs font-bold pl-5 pr-3 py-3 border-b-2">
            <div className="self-stretch flex items-center gap-1 my-auto">
              <div className="self-stretch gap-2.5 my-auto">Primary Account</div>
              <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/1d2d5e969d6289a867288e29f0b4f8e84d33496e?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto" alt="Sort" />
            </div>
          </div>
          {Array(8).fill(0).map((_, index) => (
            <div key={`cell-1-${index}`} className="bg-[rgba(238,238,238,1)] border-neutral-200 min-h-7 w-full whitespace-nowrap pl-5 pr-3 border-b">
              142676
            </div>
          ))}
        </div>
        <div className="bg-white w-[130px]">
          <div className="bg-[rgba(238,238,238,1)] border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold whitespace-nowrap text-right px-3 py-[13px] border-b-2">
            <div className="self-stretch flex items-center gap-1 my-auto">
              <div className="self-stretch gap-2.5 my-auto">Date</div>
            </div>
          </div>
          {Array(8).fill(0).map((_, index) => (
            <div key={`cell-2-${index}`} className="bg-white border-neutral-200 min-h-7 w-full px-3 border-b">
              2021-09-26 15:54:13
            </div>
          ))}
        </div>
        <div className="bg-white text-right w-[118px]">
          <div className="bg-[rgba(238,238,238,1)] border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold px-3 py-[13px] border-b-2">
            <div className="self-stretch flex items-center gap-1 my-auto">
              <div className="self-stretch gap-2.5 my-auto">Quantity</div>
            </div>
          </div>
          {Array(8).fill(0).map((_, index) => (
            <div key={`cell-3-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b">
              {index === 3 || index === 7 ? "2" : "1"}
            </div>
          ))}
        </div>
        <div className="bg-white w-[95px]">
          <div className="bg-[rgba(238,238,238,1)] border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold px-3 py-[13px] border-b-2">
            <div className="self-stretch flex items-center gap-1 my-auto">
              <div className="self-stretch gap-2.5 my-auto">Product</div>
            </div>
          </div>
          {Array(8).fill(0).map((_, index) => (
            <div key={`cell-4-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b">
              Photography
            </div>
          ))}
        </div>
        <div className="bg-white w-[93px]">
          <div className="bg-[rgba(238,238,238,1)] border-neutral-200 flex min-h-10 w-full items-center gap-1 text-xs font-bold px-3 py-[13px] border-b-2">
            <div className="self-stretch flex items-center gap-1 my-auto">
              <div className="self-stretch gap-2.5 my-auto">Store</div>
            </div>
          </div>
          {Array(8).fill(0).map((_, index) => (
            <div key={`cell-5-${index}`} className="bg-white border-neutral-200 min-h-7 w-full whitespace-nowrap px-3 border-b">
              {index === 3 ? "West" : index === 7 ? "East" : "Midwest"}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Get headers from the pivot configuration
  const getHeaders = () => {
    const rowHeaders = pivotRowItems.map(item => item.label);
    const columnHeaders = pivotColumnItems.map(item => item.label);
    const valueHeaders = valuesItems.map(item => item.label);
    
    return [...rowHeaders, ...columnHeaders, ...valueHeaders];
  };

  const headers = getHeaders();

  return (
    <div className="bg-white border absolute z-0 min-h-[268px] w-[576px] max-w-full overflow-auto rounded-lg border-[rgba(0,89,235,1)] border-solid left-6 top-[57px] p-2">
      <Table className="text-[11px]">
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={`header-${index}`} className="bg-[rgba(238,238,238,1)] text-xs font-bold py-3 px-3 whitespace-nowrap">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {processedData.length > 0 ? (
            processedData.map((row, rowIndex) => (
              <TableRow key={`row-${rowIndex}`}>
                {headers.map((header, colIndex) => {
                  // Look up the field key in the fieldMap
                  const dataKey = fieldMap[header];
                  // Use the mapped key if it exists in the data
                  const value = dataKey && row[dataKey] !== undefined 
                    ? row[dataKey] 
                    : row[header] !== undefined 
                      ? row[header]
                      : row[header.toLowerCase()];
                  
                  return (
                    <TableCell key={`cell-${rowIndex}-${colIndex}`} className="min-h-7 whitespace-nowrap px-3 border-b">
                      {value !== undefined ? String(value) : ''}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center py-4">
                No data available. Try a different pivot configuration.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
