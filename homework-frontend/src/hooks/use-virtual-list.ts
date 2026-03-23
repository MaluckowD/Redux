import { useRef, useState } from 'react';

export const useVirtualList = <T>({
  items,
  itemHeight,
  height,
}: {
  items: T[];
  itemHeight: number;
  height: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(height / itemHeight) + 10;

  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  const offsetY = startIndex * itemHeight;

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };
  return {
    totalHeight,
    visibleItems,
    offsetY,
    handleScroll,
    containerRef,
    startIndex,
  };
};
