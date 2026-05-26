import { Component } from "react";

const isChunkError = (err) =>
  err?.name === "ChunkLoadError" ||
  /loading chunk/i.test(err?.message) ||
  /failed to fetch dynamically imported module/i.test(err?.message);

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Section error:", error, info.componentStack);
    // Stale chunk after a new deploy — reload once to get fresh assets
    if (isChunkError(error)) {
      const reloaded = sessionStorage.getItem("chunk_reload");
      if (!reloaded) {
        sessionStorage.setItem("chunk_reload", "1");
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      if (isChunkError(this.state.error)) {
        return (
          <div className="py-24 flex items-center justify-center">
            <p className="font-sans text-brand-ink/40 text-sm">
              New version available — reloading…
            </p>
          </div>
        );
      }

      return (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <p className="font-sans text-brand-ink/40 text-sm">
            This section failed to load.{" "}
            <button
              className="underline hover:text-brand-forest transition-colors"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Retry
            </button>
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre className="font-mono text-red-500 text-[11px] max-w-xl overflow-auto bg-red-50 p-3 rounded border border-red-200">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
