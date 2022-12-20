import React from "react";

export namespace Tree {
  export namespace Node {
    export type Id = string | number | null;
    export type Addr = Id[];
    export type Value = object | null;
    export type Children = Id[];
    export type NestingLevel = number;
    export type Open = boolean;
    export type IsLeaf = boolean;
  }

  export interface NodeInterface {
    id: Node.Id;
    nestingLevel: Node.NestingLevel;
    isLeaf: Node.IsLeaf;
    open: Node.Open;
    addr: Node.Addr;
    children: Node.Children;
    parentAddr: Node.Addr;
    parentId: Node.Id;
    value: Node.Value;
  }

  export type Item = {
    id: Node.Id;
    isLeaf: Node.IsLeaf;
    isOpen: Node.Open;
    toggle: (id: Node.Id) => void;
    nestingLevel: Node.NestingLevel;
    itemData: Node.Value;
  };

  export interface TreeInterface {
    data: DataObject;
    itemHeight: number;
    containerHeight: number;
    Item: React.FC<Item>;
    indent: number;
  }

  export type DataObject = {
    value: Node.Value;
    id: Node.Id;
    children: DataObject[];
  };

  export interface UseTreeProps {
    data: DataObject;
    itemHeight: TreeInterface["itemHeight"];
    containerHeight: TreeInterface["containerHeight"];
  }

  export interface UseTreeExports {
    toggle: Item["toggle"];
    visibleNodes: NodeInterface[];
    containerRef: React.RefObject<HTMLDivElement>;
    handleScroll: (...args: any) => void;
    height: number;
    position: number;
  }
}
