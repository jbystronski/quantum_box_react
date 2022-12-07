import { VirtualizedComponentProps } from "./VirtualizedComponentProps";

export interface GridProps extends VirtualizedComponentProps {
  rowItems: number;
  itemWidth: number;
}
