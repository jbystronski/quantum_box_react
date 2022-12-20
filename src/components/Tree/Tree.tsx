import React from "react";
import { useTree } from "../../utils/useTree";
import { Tree as T } from "src/types";

export const Tree: React.FC<T.TreeInterface> = ({
  data,
  itemHeight,
  indent,
  containerHeight,
  Item,
}) => {
  const {
    containerRef,
    visibleNodes,
    handleScroll,
    toggle,
    position = 0,
    height,
  } = useTree({
    data,
    containerHeight,
    itemHeight,
  });

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: containerHeight + "px",
        position: "relative",
        overflow: "auto",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: height * itemHeight + "px",
        }}
      >
        {visibleNodes.length
          ? visibleNodes.map((node, i) => (
              <div
                style={{
                  height: itemHeight + "px",
                  maxHeight: itemHeight + "px",
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: indent * node.nestingLevel + "px",
                  top: position + i * itemHeight + "px",
                  left: "0px",
                  width: "100%",
                }}
              >
                <Item
                  id={node["id"]}
                  isOpen={node["open"]}
                  isLeaf={node["isLeaf"]}
                  nestingLevel={node["nestingLevel"]}
                  itemData={{
                    ...node["value"],
                    addr: JSON.stringify(node["addr"]),
                  }}
                  toggle={() => toggle(node.id)}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
