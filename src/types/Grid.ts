import React from "react";
import { VirtualizedComponentProps } from "./VirtualizedComponentProps";

export namespace Grid {
  export type Item = {
    itemData: {
      [key: string]: any;
    };
    itemKey: number;
  };

  export interface GridInterface extends VirtualizedComponentProps {
    Item: React.FC<Item>;
    rowItems: number;
    itemWidth: number;
  }

  export type Tile = {
    key: Item["itemKey"];
    top: number;
    left: number;
  };
}
