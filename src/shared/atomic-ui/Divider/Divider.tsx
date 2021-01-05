import React from 'react';

interface DividerProps {
  width?: string;
  height?: string;
}
export const Divider: React.FC<DividerProps> = React.memo(({ width = '0px', height = '0px' }) => {
  return <div style={{ width: width, height: height }}></div>;
});
