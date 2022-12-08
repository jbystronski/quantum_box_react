import React from "react";
import { BoxItemType } from "./BoxItemType";

export interface VirtualizedComponentProps {
  data: Object[];
  itemHeight: number;

  containerHeight: number;
  containerWidth: number;
  nextData: () => Object[];
  Item: React.FC<BoxItemType>;
}
