import { useVirtualList } from '../../hooks/use-virtual-list';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function VirtualList<T>({
  items,
  itemHeight,
  height,
  renderItem,
}: VirtualListProps<T>) {
  const {
    totalHeight,
    visibleItems,
    offsetY,
    handleScroll,
    containerRef,
    startIndex,
  } = useVirtualList<T>({ items, itemHeight, height });

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: 'auto',
        height,
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: totalHeight,
          position: 'relative',
        }}
      >
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            width: '100%',
          }}
        >
          {visibleItems.map((item, index) => (
            <div key={startIndex + index}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
