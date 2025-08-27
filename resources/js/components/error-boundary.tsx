import * as React from "react";

type ErrorBoundaryProps = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      error: undefined,
      errorInfo: undefined
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Met à jour l'état pour afficher le fallback au prochain rendu
    return { 
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Stocke les informations d'erreur pour les utiliser dans le rendu si nécessaire
    this.setState({
      error,
      errorInfo
    });
    
    // Ici tu peux loguer l'erreur
    console.error("Error caught by ErrorBoundary:", error, errorInfo.componentStack);

    // Exemple : envoi à un service de monitoring
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Affiche le fallback personnalisé s'il est fourni
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Sinon, affiche une UI de secours par défaut
      return (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg">
          <h2 className="font-bold text-lg mb-2">Une erreur est survenue</h2>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-2 text-sm">
              <summary>Détails de l'erreur</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
