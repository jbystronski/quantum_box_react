import React from "react";
import { ItemProps } from "./ItemProps";

export interface VirtualizedComponentProps {
  data: Object[];
  itemHeight: number;

  containerHeight: number;
  containerWidth: number;
  nextData: () => Object[];
  Item: React.FC<ItemProps>;
}
