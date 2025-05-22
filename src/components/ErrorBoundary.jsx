// src/components/ErrorBoundary.jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-500">Component failed to render</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
