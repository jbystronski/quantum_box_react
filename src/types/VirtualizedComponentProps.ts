export interface VirtualizedComponentProps {
  data: object[];
  itemHeight: number;
  containerHeight: number;
  nextData: () => object[];
}
