import React from 'react';
import { Props as SelectProps } from 'react-select';

interface GenreOption {
  value: string;
  label: string;
}

interface CustomMultiValueProps extends SelectProps<GenreOption> {
  data: GenreOption;
}

const CustomMultiValue: React.FC<CustomMultiValueProps> = ({ data }) => (
  <div style={{
    backgroundColor: '#36a2eb',
    color: 'white',
    borderRadius: '5px',
    display: 'inline-block',
    padding: '2px 6px',
    margin: '2px',
  }}>
    {data.label}
  </div>
);

export default CustomMultiValue;
