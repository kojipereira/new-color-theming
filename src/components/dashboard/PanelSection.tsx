import React, { ReactNode } from "react";

interface PanelSectionProps {
  title: string;
  children: ReactNode;
  actionIcons?: string[];
  expanded?: boolean;
}

const PanelSection: React.FC<PanelSectionProps> = ({
  title,
  children,
  actionIcons = [
    "https://cdn.builder.io/api/v1/image/assets/608cb3afdcd244e7a1995ba6f432cc7d/e820ab38758ad106d1eec29a70763f66ca2e10fc?placeholderIfAbsent=true",
  ],
  expanded = true,
}) => {
  return (
    <div className="bg-white w-full px-1 py-3">
      <div className="relative flex min-h-6 w-full items-center gap-2 px-2">
        <div className="self-stretch z-0 gap-2 text-sm text-neutral-900 font-bold leading-none flex-1 shrink basis-[0%] my-auto">
          {title}
        </div>
        {actionIcons.map((icon, index) => (
          <div
            key={index}
            className="rounded self-stretch z-0 flex items-center gap-0.5 overflow-hidden justify-center w-6 my-auto p-1"
          >
            <img
              src={icon}
              className="aspect-[1] object-contain w-4 self-stretch my-auto"
              alt="Action"
            />
          </div>
        ))}
        <div className="absolute z-0 flex w-2 shrink-0 h-4 -left-1 bottom-1" />
      </div>
      {expanded && (
        <div className="w-full overflow-hidden mt-1">{children}</div>
      )}
    </div>
  );
};

export default PanelSection;
