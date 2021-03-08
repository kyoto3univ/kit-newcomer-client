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
          'md:shadow-xl shadow',
          'p-4',
          'md:m-4 m-2',
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
