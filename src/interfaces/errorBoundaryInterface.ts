import { ReactNode } from "react";

export interface ErrorBoundaryStateInterface {
  hasError: boolean;
}

export interface ErrorBoundaryPropsInterface {
  children: ReactNode;
}
