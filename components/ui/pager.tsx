import clsx from 'clsx';
import React from 'react';

type Props = {
  total: number;
  current: number;
  onChange?: (page: number) => void;
};
export const Pager = ({ total, current, onChange }: Props) => {
  const buttons = React.useMemo(() => {
    if (total <= 5) {
      return new Array(total).fill(0).map((_v, i) => i);
    } else {
      if (current < 3) {
        return [...new Array(4).fill(0).map((_v, i) => i), -1, total - 1];
      } else if (current >= total - 3) {
        return [0, -1, ...new Array(4).fill(0).map((_v, i) => total - 4 + i)];
      } else {
        return [
          0,
          -1,
          ...new Array(3).fill(0).map((_v, i) => current - 1 + i),
          -1,
          total - 1,
        ];
      }
    }
  }, [total, current]);

  return (
    <nav className='mt-4 flex -space-x-px justify-center'>
      {buttons.map((btn, i) =>
        btn === -1 ? (
          <a key={`ph${i}`} className='px-1 py-1 border border-gray-300'>
            ...
          </a>
        ) : (
          <a
            key={btn}
            className={clsx('px-3 py-1 border border-gray-300 cursor-pointer', {
              'bg-blue-light': btn === current,
              'hover:bg-gray-400': btn != current,
              'hover:bg-blue': btn === current,
            })}
            onClick={() => onChange && onChange(btn)}
          >
            {btn + 1}
          </a>
        ),
      )}
    </nav>
  );
};
