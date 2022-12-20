import React, { useState, useEffect, useRef } from "react";
import { debounce } from "./debounce";
import { UseVirtualizedDataHookProps } from "../types";
import { isPromise } from "./isPromise";

function calculateSet(
  position: number,
  containerHeight: number,
  itemHeight: number
) {
  return Array.from(
    { length: Math.floor(containerHeight / itemHeight) + 2 },
    (_, index: number) => Math.floor(position / itemHeight) + index
  );
}

export const useVirtualizedData = ({
  nextData,
  data,
  containerHeight,
  itemHeight,
}: UseVirtualizedDataHookProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentVisible, setCurrentVisible] = useState<number[] | null>(null);
  const [vData, setVData] = useState<Object[] | []>([]);
  const [position, setPosition] = useState<number | null>(null);

  const handleScroll = debounce((ev: Event & { target: HTMLDivElement }) => {
    if (ev.target.scrollTop !== 0) setCurrentVisible(null);

    if (
      ev.target.scrollHeight -
        Math.ceil(ev.target.scrollTop) -
        ev.target.clientHeight ===
      0
    ) {
      const nextDataResult = nextData();

      isPromise(nextDataResult)
        ? nextDataResult.then((data: any) => mergeData(data))
        : mergeData(nextDataResult);
    }
    setPosition(ev.target.scrollTop);
  });

  const mergeData = (newData: any) => {
    if (!Array.isArray(newData)) newData = [];
    setVData([...vData, ...newData]);
  };

  useEffect(() => {
    setVData(data);
  }, []);

  useEffect(() => {
    if (!position) return;

    setCurrentVisible(calculateSet(position, containerHeight, itemHeight));
  }, [containerHeight, itemHeight, position]);

  useEffect(() => {
    if (containerRef.current) {
      setCurrentVisible(
        calculateSet(
          containerRef.current.scrollTop,
          containerHeight,
          itemHeight
        )
      );
    }
  }, [containerHeight, itemHeight]);

  return { containerRef, chunk: currentVisible, vData, handleScroll };
};
