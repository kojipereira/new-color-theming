import React from "react";
const SidebarHeader: React.FC = () => {
  return <div className="w-full bg-[rgba(238,238,238,1)] max-w-[280px] overflow-hidden">
      <div className="rounded-md w-full overflow-hidden">
        <div className="bg-white flex w-full flex-col overflow-hidden items-stretch justify-center py-3 rounded-t-md px-[8px]">
          <div className="flex w-full items-center gap-2 px-2">
            <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
              <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/32c709f31e7df11f730739d4d99c04e6cde376bb?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch my-auto" alt="Search" />
            </div>
            <div className="text-neutral-900 text-ellipsis truncate text-base font-bold self-stretch flex-1 shrink basis-[0%] my-auto">
              Automation status
            </div>
            <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
              <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/3c394b21d1e39fe88636263f119e30ed727f4b1f?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch my-auto" alt="Menu" />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="border-neutral-200 border shrink-0 h-px border-solid py-px" />
        </div>
        <div className="bg-white flex w-full flex-col overflow-hidden items-stretch justify-center px-3 py-2 rounded-b-md">
          <div className="flex min-h-6 w-full items-center px-2">
            <div className="self-stretch flex w-full items-center flex-1 shrink basis-[0%] my-auto overflow-hidden">
              <div className="self-stretch flex items-center gap-2 flex-1 shrink basis-[0%] my-auto overflow-hidden">
                <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
                  <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/c10baf7dbcdec441b0d449a2f73993e7c5f7509b?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch my-auto" alt="Database" />
                </div>
                <div className="text-[#505050] text-ellipsis truncate text-xs font-normal leading-none self-stretch flex-1 shrink basis-[0%] my-auto">
                  PLUGS_ELECTRONICS_HANDS_ON_LAB_DATA
                </div>
              </div>
              <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
                <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/c4d327bee11f2b331a2138edc9891e2626c61b3e?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch my-auto" alt="Action" />
              </div>
              <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
                <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/41cdbcd7be188149b3754f7a058426880e5df7a3?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch my-auto" alt="Action" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default SidebarHeader;