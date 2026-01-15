import React from 'react';
import { clsx } from 'clsx';

interface FloatingImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  delay?: boolean;
}

export const FloatingImage: React.FC<FloatingImageProps> = ({ className, delay, ...props }) => {
  return (
    <img
      className={clsx(
        delay ? 'animate-float-delay' : 'animate-float',
        'pointer-events-none select-none',
        className
      )}
      {...props}
    />
  );
};
