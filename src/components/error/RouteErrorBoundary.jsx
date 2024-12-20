import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const RouteErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <p>Üzgünüz, bir hata oluştu.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="btn-primary">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default RouteErrorBoundary;