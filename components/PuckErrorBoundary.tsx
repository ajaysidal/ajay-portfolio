"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class PuckErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    // Log error for debugging
    console.error("Puck ErrorBoundary caught error:", {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Execute optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="h-[calc(100vh-4rem)] w-full bg-[#0B0C10] flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="bg-[#1F2833] border border-[#D4AF37]/30 p-8 rounded-lg max-w-md w-full">
            <div className="text-red-500 mb-2">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-[#F8F9FA] mb-4">Puck Editor Error</h2>
            <p className="text-[#aab3bd] mb-4 text-sm">
              {this.state.error?.message ||
              "An unexpected error occurred while initializing the CMS builder."}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              className="bg-[#D4AF37] text-[#0B0C10] px-6 py-2 rounded font-bold hover:bg-[#b8962e] transition"
            >
              Retry Builder
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
