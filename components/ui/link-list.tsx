export const LinkList = ({ content }: { content: string }) => {
  const items = content.split(/(https?:\/\/[a-z0-9.,_/~#&=;%+@?\-\\(\\)]*)/gi);
  return (
    <ul>
      {items.map((item) => {
        if (item.match(/(https?:\/\/[a-z0-9.,_/~#&=;%@+?\-\\(\\)]*)/gi)) {
          return (
            <li>
              <a
                className='text-blue-light break-words break-all'
                href={RegExp.$1.replace(/\s*$/, '')}
              >
                {item}
              </a>
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
};
