import React from 'react';
import AntdButton, { ButtonProps } from 'antd/lib/button';

type ButtonType = ButtonProps & {
  label?:string
}

const Button = ( {
  children, label, ...props
}: ButtonType ) => {
  return (
    <AntdButton
      { ...props }
    >
      { children || label }
    </AntdButton>
  );
};

export default React.memo( Button );
