import React, { useState } from "react";
import PanelSection from "./PanelSection";
import PanelItem from "./PanelItem";
import { ChevronDown, ChevronUp, ChevronsDown, ChevronsUp } from "lucide-react";

const Sidebar: React.FC = () => {
  // Common icons used in the sidebar
  const priceIcon =
    "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/a197f4fe5dd2df7c3fb64605c54231dc1d5f1df7?placeholderIfAbsent=true";
  const storeNameIcon =
    "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/a129a5431fb92a36d9bf9dfbffdb4c2e37e4ef32?placeholderIfAbsent=true";
  const dateIcon =
    "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/ff7d1a25dd04025ed706057304583c1d5c5540fa?placeholderIfAbsent=true";
  const logicIcon =
    "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/2be93f2b94c8cb2dc17b55913b705736c54565e7?placeholderIfAbsent=true";

  // State for the panels
  const [pivotRowItems, setPivotRowItems] = useState([
    { icon: priceIcon, label: "Price" },
    { icon: storeNameIcon, label: "Store Name" },
  ]);
  const [pivotColumnItems, setPivotColumnItems] = useState([
    { icon: priceIcon, label: "Price" },
    { icon: storeNameIcon, label: "Store Name" },
  ]);
  const [valuesItems, setValuesItems] = useState([
    { icon: priceIcon, label: "Price" },
    { icon: storeNameIcon, label: "Store Name" },
  ]);
  const [baseColumnItems] = useState([
    { icon: priceIcon, label: "Price" },
    { icon: storeNameIcon, label: "Store Name" },
    { icon: dateIcon, label: "Date" },
    { icon: logicIcon, label: "Logic" },
    { icon: priceIcon, label: "Amount" },
    { icon: storeNameIcon, label: "Category" },
    { icon: dateIcon, label: "Year" },
    { icon: logicIcon, label: "Quarter" },
    { icon: priceIcon, label: "Month" },
    { icon: storeNameIcon, label: "Week" },
    { icon: dateIcon, label: "Day" },
    { icon: logicIcon, label: "Product" },
    { icon: priceIcon, label: "Region" },
    { icon: storeNameIcon, label: "Country" },
    { icon: dateIcon, label: "State" },
    { icon: logicIcon, label: "City" },
  ]);

  // State for base columns expand/collapse
  const [baseColumnsExpanded, setBaseColumnsExpanded] = useState(false);
  
  // Display 10 items when contracted, 30 when expanded
  const displayCount = baseColumnsExpanded ? 30 : 10;
  const visibleBaseColumnItems = baseColumnItems.slice(0, displayCount);

  // Function to handle drag and drop
  const handleDragStart = (e: React.DragEvent, item: { icon: string; label: string }) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetSection: string) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("item"));
    
    // Add the dragged item to the appropriate section
    switch (targetSection) {
      case "pivotRows":
        setPivotRowItems([...pivotRowItems, item]);
        break;
      case "pivotColumns":
        setPivotColumnItems([...pivotColumnItems, item]);
        break;
      case "values":
        setValuesItems([...valuesItems, item]);
        break;
      default:
        break;
    }
  };

  // Functions to add new items to each section
  const addToPivotRows = () => {
    setPivotRowItems([...pivotRowItems, { icon: dateIcon, label: "New Pivot Row" }]);
  };

  const addToPivotColumns = () => {
    setPivotColumnItems([...pivotColumnItems, { icon: dateIcon, label: "New Pivot Column" }]);
  };

  const addToValues = () => {
    setValuesItems([...valuesItems, { icon: priceIcon, label: "New Value" }]);
  };

  return (
    <div className="bg-[rgba(238,238,238,1)] min-w-60 overflow-hidden w-[280px] p-1 flex flex-col h-full relative">
      <div className="rounded w-full overflow-hidden">
        <div className="bg-white flex w-full flex-col overflow-hidden items-stretch justify-center px-1 py-3">
          <div className="flex w-full items-center gap-2 px-2">
            <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/32c709f31e7df11f730739d4d99c04e6cde376bb?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch my-auto"
                alt="Search"
              />
            </div>
            <div className="text-neutral-900 text-ellipsis text-base font-bold self-stretch flex-1 shrink basis-[0%] my-auto">
              Automation status{" "}
            </div>
            <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/3c394b21d1e39fe88636263f119e30ed727f4b1f?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch my-auto"
                alt="Menu"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="border-neutral-200 border shrink-0 h-px border-solid" />
        </div>
        <div className="bg-white flex w-full flex-col overflow-hidden items-stretch justify-center px-1 py-2">
          <div className="flex min-h-6 w-full items-center px-2">
            <div className="self-stretch flex min-w-60 w-full items-center flex-1 shrink basis-[0%] my-auto">
              <div className="self-stretch flex items-center gap-2 flex-1 shrink basis-[0%] my-auto">
                <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/c10baf7dbcdec441b0d449a2f73993e7c5f7509b?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-4 self-stretch my-auto"
                    alt="Database"
                  />
                </div>
                <div className="text-[#505050] text-ellipsis text-xs font-normal leading-none self-stretch flex-1 shrink basis-[0%] my-auto">
                  PLUGS_ELECTRONICS_HANDS_ON_LAB_DATA
                </div>
              </div>
              <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/c4d327bee11f2b331a2138edc9891e2626c61b3e?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4 self-stretch my-auto"
                  alt="Action"
                />
              </div>
              <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/41cdbcd7be188149b3754f7a058426880e5df7a3?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4 self-stretch my-auto"
                  alt="Action"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded w-full overflow-hidden mt-1">
        <div 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "pivotRows")}
          className="border-2 border-transparent hover:border-blue-200 border-dashed"
        >
          <PanelSection
            title="Pivot Rows"
            onAddItem={addToPivotRows}
            actionIcons={[
              "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/e820ab38758ad106d1eec29a70763f66ca2e10fc?placeholderIfAbsent=true",
            ]}
          >
            {pivotRowItems.map((item, index) => (
              <PanelItem key={`pivot-row-${index}`} icon={item.icon} label={item.label} />
            ))}
          </PanelSection>
        </div>

        <div className="w-full">
          <div className="border-neutral-200 border shrink-0 h-px border-solid" />
        </div>

        <div 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "pivotColumns")}
          className="border-2 border-transparent hover:border-blue-200 border-dashed"
        >
          <PanelSection 
            title="Pivot Columns"
            onAddItem={addToPivotColumns}
          >
            {pivotColumnItems.map((item, index) => (
              <PanelItem key={`pivot-column-${index}`} icon={item.icon} label={item.label} />
            ))}
          </PanelSection>
        </div>

        <div className="w-full">
          <div className="border-neutral-200 border shrink-0 h-px border-solid" />
        </div>

        <div 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "values")}
          className="border-2 border-transparent hover:border-blue-200 border-dashed"
        >
          <PanelSection 
            title="Values"
            onAddItem={addToValues}
          >
            {valuesItems.map((item, index) => (
              <PanelItem key={`value-${index}`} icon={item.icon} label={item.label} />
            ))}
          </PanelSection>
        </div>
      </div>

      <div className={`rounded bg-white w-full overflow-hidden mt-1 pb-4 px-1 flex-1 overflow-y-auto transition-all duration-300`}>
        <div className="bg-white flex min-h-6 w-full items-center gap-1 pt-3 pb-2 px-2">
          <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
            Base Columns
          </div>
          <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/781dbfe789e3d1a66ef1605cf94336da48380f4a?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch my-auto"
              alt="Action"
            />
          </div>
          <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/cb1292c171f906e91c44d3be493b675ac9675368?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch my-auto"
              alt="Action"
            />
          </div>
          <div 
            className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1 cursor-pointer hover:bg-gray-100"
            onClick={() => setBaseColumnsExpanded(!baseColumnsExpanded)}
          >
            {baseColumnsExpanded ? (
              <ChevronsUp className="h-4 w-4" />
            ) : (
              <ChevronsDown className="h-4 w-4" />
            )}
          </div>
        </div>
        <div className="w-full overflow-hidden mt-1">
          {visibleBaseColumnItems.map((item, index) => (
            <PanelItem
              key={`base-column-${index}`}
              icon={item.icon}
              label={item.label}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, item)}
            />
          ))}
        </div>
      </div>

      <div className="rounded bg-white max-w-full w-[272px] overflow-hidden mt-1 px-1 fixed bottom-4 right-4 shadow-lg z-10">
        <div className="rounded bg-white flex w-full flex-col items-stretch justify-center py-3">
          <div className="flex min-h-6 w-full items-center gap-2 px-2">
            <div className="self-stretch gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
              Advanced Settings
            </div>
            <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/e820ab38758ad106d1eec29a70763f66ca2e10fc?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 self-stretch my-auto"
                alt="Expand"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
