export interface VirtualizedComponentProps {
  data: object[];
  itemHeight: number;
  containerHeight: number;
  containerWidth: number;
  nextData: () => object[];
}
