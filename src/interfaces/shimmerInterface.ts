export interface ShimmerElementInterface {
  className: string;
  heights: ShimmerElementHeightInterface[];
  testId?: string;
}

export interface ShimmerElementHeightInterface {
  key: string;
  height: string;
}
