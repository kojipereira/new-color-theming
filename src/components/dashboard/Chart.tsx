import React from "react";

const Chart: React.FC = () => {
  return (
    <div className="items-center bg-white absolute z-0 flex min-h-[270px] w-[510px] max-w-full flex-col overflow-hidden h-[270px] pl-3 pr-[11px] py-4 rounded-lg right-8 top-[55px]">
      <div className="w-[158px] max-w-full text-xl text-neutral-900 font-semibold leading-[1.2]">
        Automation status
      </div>
      <div className="flex w-full max-w-[487px] flex-col overflow-hidden items-stretch text-[rgba(70,70,70,1)] font-normal flex-1 mt-4 pl-1.5 pr-[31px] pt-[9px] pb-7 max-md:max-w-full max-md:pr-5">
        <div className="flex items-stretch gap-2 text-xs text-right max-md:max-w-full">
          <div>
            <div>1273 - 4022</div>
            <div className="flex flex-col mt-7 pl-[7px]">
              <div>574 - 1273</div>
              <div className="mt-7">&lt; 574</div>
              <div className="ml-5 mt-7 max-md:ml-2.5">&gt; 4022</div>
            </div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/f2214910-4e28-41c6-8238-de847d383376?placeholderIfAbsent=true"
            className="aspect-[2.57] object-contain w-fit grow shrink-0 basis-0"
            alt="Chart visualization"
          />
        </div>
        <div className="self-center flex w-[349px] max-w-full items-stretch gap-5 text-[10px] whitespace-nowrap text-center justify-between mt-1">
          <div>0</div>
          <div>5k</div>
          <div>10k</div>
          <div>15k</div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
