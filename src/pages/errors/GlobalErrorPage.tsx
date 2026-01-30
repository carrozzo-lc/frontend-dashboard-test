import { isRouteErrorResponse, useRouteError } from 'react-router';

const GlobalErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let errorMessage = '';
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="error-page">
      <h1>🚨 Yikes! Something broke.</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export default GlobalErrorPage;
