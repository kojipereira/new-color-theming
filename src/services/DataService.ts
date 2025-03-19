
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

// Function to process data based on pivot configuration
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

  // Create a result array to store processed data
  return data.map(item => {
    const result: Record<string, any> = {};
    
    // Include all row fields
    rowFields.forEach(field => {
      if (field in item) {
        result[field] = item[field as keyof DataItem];
      }
    });
    
    // Include all column fields
    columnFields.forEach(field => {
      if (field in item) {
        result[field] = item[field as keyof DataItem];
      }
    });
    
    // Include all value fields
    valueFields.forEach(field => {
      if (field in item) {
        result[field] = item[field as keyof DataItem];
      }
    });
    
    return result;
  });
};

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
