import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google'


interface TextProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  fontFamily?: 'sans' | 'serif' | 'mono';
  color?: string;
  children: ReactNode;
}

const inter = Inter({ subsets: ['latin'] })

const Text: React.FC<TextProps> = ({ size, weight, fontFamily, color, children }) => {

  const textSizeClasses: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const textWeightClasses: Record<string, string> = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const textFontClasses: Record<string, string> = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  };

  const textColorClass = color ? `text-${color}` : '';

  const textClasses = [
    textSizeClasses[size || 'base'],
    textWeightClasses[weight || 'normal'],
    textFontClasses[fontFamily || 'sans'],
    textColorClass,
  ].filter(Boolean).join(' ');

  return (
  <div className={inter.className}>
    <p className={textClasses}>{children}</p>
  </div>
  )
};

export default Text;
