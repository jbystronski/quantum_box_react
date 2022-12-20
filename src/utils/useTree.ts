import { useState, useEffect, useRef } from "react";
import { debounce } from "./debounce";
import { TreeMap } from "./TreeMap";
import { Node } from "./Node";
import { Tree as T } from "src/types";

export function useTree({
  data,
  itemHeight,
  containerHeight,
}: T.UseTreeProps): T.UseTreeExports {
  const containerRef = useRef<HTMLDivElement>(null);

  const [visibleNodes, setVisibleNodes] = useState<T.NodeInterface[]>([]);
  const [position, setPosition] = useState<number>(0);
  const [treeMap, setTreeMap] = useState<TreeMap<
    T.Node.Id,
    T.NodeInterface
  > | null>(null);
  const [height, setHeight] = useState<number>(0);

  const handleScroll = debounce((ev: Event) => {
    let target = ev.target as Element;
    // if (target.scrollTop !== 0) setVisibleNodes([]);

    setPosition(target.scrollTop);
  });

  const calculateVisibleNodes = (
    position: number,
    containerHeight: number,
    itemHeight: number
  ): T.NodeInterface[] => {
    let elementsToDisplay = Math.floor(containerHeight / itemHeight) + 2;

    let startIndex = Math.floor(position / itemHeight);

    const range = treeMap!
      .range(startIndex, elementsToDisplay + startIndex)
      .filter((n) => n !== undefined) as T.NodeInterface[];

    return range;
  };

  const pickIds = (data: T.DataObject[]) => data.map((c) => c.id);

  const appendChildren = (
    map: TreeMap<T.Node.Id, T.NodeInterface>,
    parentAddr: T.Node.Addr,
    children: T.DataObject[]
  ) => {
    children.forEach((child: T.DataObject) => {
      const node = new Node(child.id, parentAddr, child.value);

      if (map && node) {
        map!.store(node.id, node);
      }

      if (child.hasOwnProperty("children") && child.children.length > 0) {
        node.children = pickIds(child.children);
        return appendChildren(map, node.addr, child.children);
      }
    });
  };

  const createTree = (data: T.DataObject) => {
    const map = new TreeMap<T.Node.Id, Node>();
    const root = new Node(data.id, [null], data.value);
    root.children = pickIds(data.children);

    map.set(root.id, root);

    if (data.children) {
      appendChildren(map, root.addr, data.children);
    }
    setTreeMap(map);
    setHeight(map.size);
  };

  const remapRecursively = (
    childrenKeys: T.Node.Id[],
    cnt: T.Node.Id[] = []
  ): T.Node.Id[] => {
    for (let key of childrenKeys) {
      cnt.push(key);

      const childNode = treeMap?.get(key);

      if (childNode?.open) {
        remapRecursively(childNode.children, cnt);
      }
    }

    return cnt;
  };

  const toggle = (id: T.Node.Id) => {
    const node = treeMap?.get(id);

    if (node && !node.isLeaf) {
      const isOpen = node.open;

      if (isOpen) {
        node.open = false;

        const nodesToClose = remapRecursively(node.children);

        treeMap?.remap(node.id, nodesToClose.length);
        setHeight(treeMap!?.size);
      } else {
        node.open = true;

        treeMap?.remap(node.id, 0, remapRecursively(node.children));
        setHeight(treeMap!?.size);
      }

      setVisibleNodes(
        calculateVisibleNodes(position, containerHeight, itemHeight)
      );
    }
  };

  useEffect(() => {
    createTree(data);
  }, [data]);

  useEffect(() => {
    if (treeMap) {
      setVisibleNodes(
        calculateVisibleNodes(position, containerHeight, itemHeight)
      );
    }
  }, [position, containerHeight, itemHeight, treeMap]);

  useEffect(() => {
    if (containerRef.current && treeMap) {
      setVisibleNodes(
        calculateVisibleNodes(
          containerRef.current.scrollTop,
          containerHeight,
          itemHeight
        )
      );
    }
  }, [containerHeight, itemHeight, treeMap]);

  return {
    position,
    toggle,
    visibleNodes,
    containerRef,
    handleScroll,
    height,
  };
}
