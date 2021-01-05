import React from 'react';

interface NoDataProps {
  dataLength: number;
  children: React.ReactNode;
}

export const NoData: React.FC<NoDataProps> = React.memo(({ dataLength, children }) => {
  return dataLength <= 0 ? <h2>No data</h2> : <>{children}</>;
});
