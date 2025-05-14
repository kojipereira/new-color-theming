import React from "react";
const SidebarHeader: React.FC = () => {
  return <div className="sticky top-0 z-10 w-full bg-[rgba(238,238,238,1)] max-w-[280px] overflow-hidden">
      <div className="rounded-md w-full overflow-hidden">
        <div className="bg-white flex w-full flex-col overflow-hidden items-stretch justify-center py-3 rounded-t-md px-[8px]">
          <div className="flex w-full items-center gap-2 px-2">
            <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
              <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/32c709f31e7df11f730739d4d99c04e6cde376bb?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch my-auto" alt="Search" />
            </div>
            <div className="text-neutral-900 text-ellipsis truncate text-base font-bold self-stretch flex-1 shrink basis-[0%] my-auto">Settings</div>
            
          </div>
        </div>
        <div className="w-full">
          <div className="border-neutral-200 border shrink-0 h-px border-solid py-px" />
        </div>
        
      </div>
    </div>;
};
export default SidebarHeader;