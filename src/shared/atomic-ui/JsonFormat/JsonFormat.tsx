import React from 'react';

interface JsonFormatProps {
  data: unknown;
}
export const JsonFormat: React.FC<JsonFormatProps> = React.memo(({ data }) => {
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
});
