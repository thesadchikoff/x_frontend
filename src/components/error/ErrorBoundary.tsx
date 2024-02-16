import React, { useState } from "react";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const componentDidCatch = (error, errorInfo) => {
    // Можно также залогировать ошибку в сервис ошибок
    console.error("Caught an error:", error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    // Можно отрисовать запасной UI
    return <h1>Что-то пошло не так.</h1>;
  }

  return children;
}

export default ErrorBoundary;
