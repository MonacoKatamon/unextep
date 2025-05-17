'use client';

import React from 'react';

export const Button = React.forwardRef(({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  
  const variants = {
    default: "bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-violet-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    link: "text-violet-600 hover:text-violet-700 underline-offset-4 hover:underline p-0 h-auto"
  };
  
  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
    icon: "p-2"
  };
  
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];
  
  const classes = `${baseStyles} ${variantStyles} ${sizeStyles} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;
  
  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button'; 