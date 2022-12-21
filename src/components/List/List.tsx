import React from "react";
import { useVirtualizedData } from "src/utils/useVirtualizedData";
import { List as L } from "src/types";

export const List: React.FC<L.ListInterface> = ({
  data,
  itemHeight,
  containerHeight,
  nextData = () => [],
  Item,
}) => {
  const { containerRef, chunk, handleScroll, vData } = useVirtualizedData({
    data,
    nextData,
    containerHeight,
    itemHeight,
  });

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: containerHeight + "px",
        width: "100%",
        overflow: "auto",
      }}
    >
      {vData.length && (
        <ul
          style={{
            height: vData.length ? vData.length * itemHeight + "px" : "inherit",
            overflow: "hidden",
            position: "relative",
            margin: "0px",
            padding: "0px",
            width: "100%",
          }}
        >
          {chunk &&
            chunk.map((index: number) => {
              if (!vData[index]) return null;
              return (
                <li
                  style={{
                    height: itemHeight + "px",
                    width: "100%",
                    maxHeight: itemHeight + "px",
                    position: "absolute",
                    left: "0px",
                    top: index * itemHeight + "px",
                  }}
                  key={index}
                >
                  <Item itemData={vData[index]} itemKey={index} />
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
