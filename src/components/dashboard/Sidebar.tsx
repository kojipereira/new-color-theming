
import React from "react";
import PanelSection from "./PanelSection";
import PanelItem from "./PanelItem";

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
        <PanelSection
          title="Pivot Rows"
          actionIcons={[
            "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/3eca02c0b0d49a5defd33568dff73c4203e22ff9?placeholderIfAbsent=true",
            "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/e820ab38758ad106d1eec29a70763f66ca2e10fc?placeholderIfAbsent=true",
          ]}
        >
          <PanelItem icon={priceIcon} label="Price" />
          <PanelItem icon={storeNameIcon} label="Store Name" />
        </PanelSection>

        <div className="w-full">
          <div className="border-neutral-200 border shrink-0 h-px border-solid" />
        </div>

        <PanelSection title="Pivot Columns">
          <PanelItem icon={priceIcon} label="Price" />
          <PanelItem icon={storeNameIcon} label="Store Name" />
        </PanelSection>

        <div className="w-full">
          <div className="border-neutral-200 border shrink-0 h-px border-solid" />
        </div>

        <PanelSection title="Values">
          <PanelItem icon={priceIcon} label="Price" />
          <PanelItem icon={storeNameIcon} label="Store Name" />
        </PanelSection>
      </div>

      <div className="rounded bg-white min-h-[519px] w-full overflow-hidden mt-1 pb-4 px-1 flex-1 overflow-y-auto">
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
          <div className="rounded self-stretch flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/e820ab38758ad106d1eec29a70763f66ca2e10fc?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch my-auto"
              alt="Action"
            />
          </div>
        </div>
        <div className="w-full overflow-hidden mt-1">
          {[...Array(16)].map((_, index) => (
            <PanelItem
              key={`base-column-${index}`}
              icon={
                index % 3 === 0
                  ? priceIcon
                  : index % 3 === 1
                    ? storeNameIcon
                    : index % 3 === 2
                      ? dateIcon
                      : logicIcon
              }
              label={
                index % 3 === 0
                  ? "Price"
                  : index % 3 === 1
                    ? "Store Name"
                    : index % 3 === 2
                      ? "Date"
                      : "Logic"
              }
            />
          ))}
        </div>
      </div>

      <div className="rounded bg-white max-w-full w-[272px] overflow-hidden mt-1 px-1 fixed bottom-4 left-4 shadow-lg z-10">
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
