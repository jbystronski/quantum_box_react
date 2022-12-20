import React from "react";
import { VirtualizedComponentProps } from "./VirtualizedComponentProps";

export namespace List {
  export type Item = {
    itemData: {
      [key: string]: any;
    };
    itemKey: number;
  };

  export interface ListInterface extends VirtualizedComponentProps {
    Item: React.FC<Item>;
  }
}
