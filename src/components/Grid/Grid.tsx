import React, { useEffect, useState } from "react";
import { useVirtualizedData } from "src/utils/useVirtualizedData";
import { GridProps } from "../../types/GridProps";
import { RowObjectProps } from "../../types/RowObjectProps";

function parseChunk(
  chunk: number[],
  rowItems: number,
  itemHeight: number,
  itemWidth: number
) {
  return chunk
    .map((rowKey) =>
      Array(rowItems)
        .fill(null)
        .map((_, index) => {
          return {
            key: rowKey * rowItems + index,
            top: rowKey * itemHeight,
            left: index * itemWidth,
          };
        })
    )
    .reduce((acc, next) => [...acc, ...next], []);
}

export const Grid: React.FC<GridProps> = ({
  data,
  itemHeight,
  itemWidth,
  containerHeight,
  containerWidth,
  nextData = () => [],
  Item,
  rowItems,
}) => {
  const { containerRef, chunk, handleScroll, vData } = useVirtualizedData({
    data,
    nextData,
    containerHeight,
    itemHeight,
  });
  const [rows, setRows] = useState<RowObjectProps[] | []>([]);

  useEffect(() => {
    if (!chunk) {
      setRows([]);
    } else {
      setRows(parseChunk(chunk, rowItems, itemHeight, itemWidth));
    }
  }, [chunk, rowItems, itemHeight, itemWidth]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: containerHeight + "px",
        width: containerWidth + "px",
        overflow: "auto",
      }}
    >
      {vData.length && (
        <div
          style={{
            height: vData.length
              ? Math.ceil(vData.length / rowItems) * itemHeight + "px"
              : "inherit",

            position: "relative",
            margin: "0px",
            padding: "0px",
          }}
        >
          {rows.length &&
            rows.map((itemObject) => {
              if (!vData[itemObject["key"]]) return null;

              return (
                <div
                  style={{
                    boxSizing: "border-box",
                    position: "absolute",
                    top: itemObject["top"] + "px",
                    left: itemObject["left"] + "px",
                    height: itemHeight + "px",
                    maxHeight: itemHeight + "px",
                    width: itemWidth + "px",
                  }}
                >
                  <Item
                    itemData={vData[itemObject["key"]]}
                    itemKey={itemObject["key"]}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
