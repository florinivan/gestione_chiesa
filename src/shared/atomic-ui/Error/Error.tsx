import React from 'react';

interface ErrorProps {
  error: string;
  children: React.ReactNode;
}

export const Error: React.FC<ErrorProps> = React.memo(({ error, children }) => {
  return error ? <h1>{error}</h1> : <>{children}</>;
});
