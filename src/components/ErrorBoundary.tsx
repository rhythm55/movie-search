import { Component, ErrorInfo } from "react";

import {
  ErrorBoundaryPropsInterface,
  ErrorBoundaryStateInterface,
} from "../interfaces/errorBoundaryInterface";
import { ErrorState } from "./state/ErrorState";

class ErrorBoundary extends Component<
  ErrorBoundaryPropsInterface,
  ErrorBoundaryStateInterface
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
