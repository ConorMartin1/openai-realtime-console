// types/card.ts
export type CardWidth = 'full' | 'half' | 'third' | 'two-thirds';
export type CardHeight = 'default' | 'tall';

export interface CardProps {
  className?: string;
  width?: CardWidth;
  height?: CardHeight;
  bgColor?: string;
  children: React.ReactNode;
}