import clsx from 'clsx';
import React from 'react';

type Props = {
  title: string;
  description?: string;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
export const ContentCard = React.forwardRef<HTMLAnchorElement, Props>(
  ({ title, description, ...props }, ref) => {
    return (
      <a
        ref={ref}
        {...props}
        className={clsx(
          'border border-gray-400 rounded-md',
          'shadow-xl',
          'p-5',
          'm-4',
          'transition-transform',
          'transform',
          'scale-100',
          'hover:scale-110',
        )}
      >
        <h3 className='font-bold text-xl text-blue-light'>{title}</h3>
        {description && <p>{description}</p>}
      </a>
    );
  },
);
