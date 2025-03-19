
// Define the data structure types
export interface DataItem {
  account: string;
  date: string;
  quantity: number;
  product: string;
  store: string;
  price?: number;
  logic?: string; // Add logic property to the DataItem interface
}

// Sample data for our pivot table
export const sampleData: DataItem[] = [
  { account: "142676", date: "2021-09-26 15:54:13", quantity: 1, product: "Photography", store: "Midwest", price: 120 },
  { account: "142676", date: "2021-09-26 15:54:13", quantity: 1, product: "Photography", store: "Midwest", price: 150 },
  { account: "142676", date: "2021-09-26 15:54:13", quantity: 1, product: "Photography", store: "Midwest", price: 210 },
  { account: "142676", date: "2021-09-26 15:54:13", quantity: 2, product: "Photography", store: "West", price: 180 },
  { account: "142676", date: "2021-09-26 15:54:13", quantity: 1, product: "Photography", store: "Midwest", price: 95 },
  { account: "142676", date: "2021-09-26 15:54:13", quantity: 1, product: "Photography", store: "Midwest", price: 115 },
  { account: "142676", date: "2021-09-26 15:54:13", quantity: 1, product: "Photography", store: "Midwest", price: 130 },
  { account: "142676", date: "2021-09-26 15:54:13", quantity: 2, product: "Photography", store: "East", price: 165 },
];

// Function to get unique values from a column
export const getUniqueValues = (data: DataItem[], field: keyof DataItem): string[] => {
  const values = new Set<string>();
  data.forEach(item => {
    if (item[field] !== undefined) {
      values.add(String(item[field]));
    }
  });
  return Array.from(values);
};

// Improved function to process data based on pivot configuration
export const processPivotData = (
  data: DataItem[], 
  rowFields: string[], 
  columnFields: string[], 
  valueFields: string[]
) => {
  // If no fields are selected, return the original data
  if (rowFields.length === 0 && columnFields.length === 0 && valueFields.length === 0) {
    return [];
  }

  // Create a properly structured pivoted dataset
  const pivotedData: Record<string, any>[] = [];
  
  // If we have row fields, pivot based on rows
  if (rowFields.length > 0) {
    // Get unique values for each row field
    const uniqueRowValues: Record<string, Set<string>> = {};
    rowFields.forEach(field => {
      uniqueRowValues[field] = new Set<string>();
      data.forEach(item => {
        if (field in item) {
          uniqueRowValues[field].add(String(item[field as keyof DataItem]));
        }
      });
    });
    
    // Create rows based on unique row values
    const rowCombinations = generateCombinations(uniqueRowValues, rowFields);
    
    rowCombinations.forEach(rowCombination => {
      const pivotRow: Record<string, any> = { ...rowCombination };
      
      // Add column fields if present
      if (columnFields.length > 0) {
        const uniqueColValues: Record<string, Set<string>> = {};
        columnFields.forEach(field => {
          uniqueColValues[field] = new Set<string>();
          data.forEach(item => {
            if (field in item) {
              uniqueColValues[field].add(String(item[field as keyof DataItem]));
            }
          });
        });
        
        const colCombinations = generateCombinations(uniqueColValues, columnFields);
        
        // For each column combination, calculate the values
        colCombinations.forEach(colCombination => {
          // Add column identifiers
          for (const colField in colCombination) {
            pivotRow[colField] = colCombination[colField];
          }
          
          // Add value fields for this combination
          valueFields.forEach(valueField => {
            // Find matching data items
            const matchingItems = data.filter(item => {
              // Check row condition matches
              const rowMatch = Object.keys(rowCombination).every(rowField => 
                String(item[rowField as keyof DataItem]) === rowCombination[rowField]
              );
              
              // Check column condition matches
              const colMatch = Object.keys(colCombination).every(colField => 
                String(item[colField as keyof DataItem]) === colCombination[colField]
              );
              
              return rowMatch && colMatch;
            });
            
            // Calculate aggregate value for matching items
            if (matchingItems.length > 0) {
              const aggregateValue = matchingItems.reduce((sum, item) => {
                const value = item[valueField as keyof DataItem];
                return typeof value === 'number' ? sum + value : sum;
              }, 0);
              
              pivotRow[valueField] = aggregateValue;
            } else {
              pivotRow[valueField] = 0; // Default value if no matches
            }
          });
        });
      } else {
        // No column fields, just calculate values for each row
        valueFields.forEach(valueField => {
          // Find matching data items
          const matchingItems = data.filter(item => {
            return Object.keys(rowCombination).every(rowField => 
              String(item[rowField as keyof DataItem]) === rowCombination[rowField]
            );
          });
          
          // Calculate aggregate value for matching items
          if (matchingItems.length > 0) {
            const aggregateValue = matchingItems.reduce((sum, item) => {
              const value = item[valueField as keyof DataItem];
              return typeof value === 'number' ? sum + value : sum;
            }, 0);
            
            pivotRow[valueField] = aggregateValue;
          } else {
            pivotRow[valueField] = 0; // Default value if no matches
          }
        });
      }
      
      pivotedData.push(pivotRow);
    });
  } else if (columnFields.length > 0) {
    // Only column fields, no row fields
    const uniqueColValues: Record<string, Set<string>> = {};
    columnFields.forEach(field => {
      uniqueColValues[field] = new Set<string>();
      data.forEach(item => {
        if (field in item) {
          uniqueColValues[field].add(String(item[field as keyof DataItem]));
        }
      });
    });
    
    const colCombinations = generateCombinations(uniqueColValues, columnFields);
    
    // Create a single row with all columns
    const pivotRow: Record<string, any> = {};
    
    // Add each column combination
    colCombinations.forEach(colCombination => {
      // Create a compound column name
      const colName = columnFields.map(field => colCombination[field]).join('-');
      
      // Add value fields for this column
      valueFields.forEach(valueField => {
        // Find matching data items
        const matchingItems = data.filter(item => {
          return Object.keys(colCombination).every(colField => 
            String(item[colField as keyof DataItem]) === colCombination[colField]
          );
        });
        
        // Calculate aggregate value for matching items
        if (matchingItems.length > 0) {
          const aggregateValue = matchingItems.reduce((sum, item) => {
            const value = item[valueField as keyof DataItem];
            return typeof value === 'number' ? sum + value : sum;
          }, 0);
          
          pivotRow[`${colName}-${valueField}`] = aggregateValue;
        } else {
          pivotRow[`${colName}-${valueField}`] = 0; // Default value if no matches
        }
      });
    });
    
    pivotedData.push(pivotRow);
  } else {
    // Only value fields, no row or column fields
    const pivotRow: Record<string, any> = {};
    
    // Calculate totals for each value field
    valueFields.forEach(valueField => {
      const aggregateValue = data.reduce((sum, item) => {
        const value = item[valueField as keyof DataItem];
        return typeof value === 'number' ? sum + value : sum;
      }, 0);
      
      pivotRow[valueField] = aggregateValue;
    });
    
    pivotedData.push(pivotRow);
  }
  
  return pivotedData;
};

// Helper function to generate all combinations of field values
function generateCombinations(uniqueValues: Record<string, Set<string>>, fields: string[]): Record<string, string>[] {
  if (fields.length === 0) {
    return [{}];
  }
  
  const field = fields[0];
  const remainingFields = fields.slice(1);
  const fieldValues = Array.from(uniqueValues[field]);
  
  if (remainingFields.length === 0) {
    return fieldValues.map(value => ({ [field]: value }));
  }
  
  const result: Record<string, string>[] = [];
  const subCombinations = generateCombinations(uniqueValues, remainingFields);
  
  fieldValues.forEach(value => {
    subCombinations.forEach(subCombo => {
      result.push({
        [field]: value,
        ...subCombo
      });
    });
  });
  
  return result;
}

// Map field names to actual data properties
export const fieldMap: Record<string, keyof DataItem> = {
  "Price": "price",
  "Store Name": "store",
  "Date": "date",
  "Logic": "logic",
  "Amount": "quantity",
  "Category": "product",
  "Product": "product",
  "Quantity": "quantity",
  "New Pivot Row": "product",
  "New Pivot Column": "store",
  "New Value": "price",
  "Store": "store",
};
