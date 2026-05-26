import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Section error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-24 flex items-center justify-center">
          <p className="font-sans text-brand-ink/40 text-sm">
            This section failed to load.{" "}
            <button
              className="underline hover:text-brand-forest transition-colors"
              onClick={() => this.setState({ hasError: false })}
            >
              Retry
            </button>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
