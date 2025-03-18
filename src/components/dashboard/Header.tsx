import React from "react";
const Header: React.FC = () => {
  return <div className="bg-white relative flex w-full items-stretch max-md:max-w-full">
      <div className="z-0 flex items-center gap-2 h-full w-12 px-2 my-[7px]">
        <div className="self-stretch flex w-8 items-center gap-2 justify-center my-auto">
          <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/e645e8d25a4ea608d8a3b27098e5b6be0b4ef550?placeholderIfAbsent=true" className="aspect-[1] object-contain w-8 rounded self-stretch my-auto" alt="Logo" />
        </div>
      </div>
      <div className="z-0 flex min-w-60 min-h-12 items-center gap-4 overflow-hidden flex-wrap flex-1 shrink basis-5 my-auto pr-3 max-md:max-w-full">
        <div className="rounded self-stretch flex min-w-[88px] min-h-8 items-center gap-[9px] overflow-hidden text-base text-neutral-900 font-semibold text-center justify-center my-auto pl-1">
          <div className="self-stretch my-auto">Workbook title</div>
          <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/d71d0b3d345c337907310c50d2bb015e98218d4e?placeholderIfAbsent=true" className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto" alt="Dropdown" />
        </div>
        <div className="self-stretch flex min-w-60 items-center gap-4 flex-wrap flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
          <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/3eca79869b6221d1e6758c7f3b299cd6dc95e0a4?placeholderIfAbsent=true" className="aspect-[1.38] object-contain w-11 self-stretch shrink-0 my-auto" alt="Action button" />
          <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/881017c97e9d7767cd5d76ff918292dd1121c2cc?placeholderIfAbsent=true" className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto" alt="Action button" />
        </div>
        <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/452bc368783cc9ad6e3ddb5c6e975b453e6f391c?placeholderIfAbsent=true" className="aspect-[1] object-contain w-8 rounded self-stretch shrink-0 my-auto" alt="User profile" />
      </div>
      <div className="border-neutral-200 border absolute z-0 flex items-center w-12 px-4 py-2 rounded-full border-solid left-1/2 bottom-[7px] transform -translate-x-1/2 mx-auto justify-center">
        <img src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/7f1f05ac3ce1f922ec524e1810cf7a8ab1169042?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch my-auto" alt="Search" />
      </div>
    </div>;
};
export default Header;