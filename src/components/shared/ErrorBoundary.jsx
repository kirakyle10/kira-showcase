import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <div className="glass-card m-4 flex flex-col items-start gap-3 p-6">
          <h3 className="text-lg font-semibold text-kira-warn">Something went wrong</h3>
          <p className="text-sm text-kira-muted">
            Please refresh the demo. If the issue persists, contact us on WhatsApp.
          </p>
          <button
            type="button"
            onClick={this.reset}
            className="rounded-md border border-kira-border px-3 py-1.5 text-sm hover:bg-kira-border/40"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
