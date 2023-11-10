import { useEffect, useRef, useState } from 'react';

interface IDropdownProps {
  x: number;
  y: number;
  children?: React.ReactNode;
  containerSize: {
    height: number;
    width: number;
  };
}

const defaultProps: Partial<IDropdownProps> = {
  children: null,
};

export interface ISelect {
  scrollWidth: number;
  scrollHeight: number;
}

function Dropdown({ x, y, children, containerSize }: IDropdownProps) {
  const selectRef = useRef<HTMLUListElement>(null);

  const [position, setPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const select: ISelect | null = selectRef.current;

    function willElemWidthOverflow(startWidth: number, elementWidth: number) {
      return startWidth + elementWidth > containerSize.width;
    }

    function willElemHeightOverflow(
      startHeight: number,
      elementHeight: number
    ) {
      return startHeight + elementHeight > containerSize.height;
    }
    if (select !== null) {
      const selectWidth: number = select.scrollWidth;
      const selectHeight: number = select.scrollHeight;
      // if select is going to overflow then push it to other side
      const left = willElemWidthOverflow(x, selectWidth) ? x - selectWidth : x;
      const top = willElemHeightOverflow(y, selectHeight)
        ? y - selectHeight
        : y;
      setPosition({ left, top });
    }
  }, [x, y, containerSize.width, containerSize.height]);

  return (
    <ul
      className='z-10 bg-base-200'
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
      }}
      ref={selectRef}>
      {children}
    </ul>
  );
}

export default Dropdown;
