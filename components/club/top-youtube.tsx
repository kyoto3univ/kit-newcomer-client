import React from 'react';
import YouTube from 'react-youtube';

type Props = {
  url: string;
};
export const ClubTopYouTube = ({ url }: Props) => {
  const initialHeight = React.useMemo(
    () =>
      process.browser && document.body.clientWidth < 520
        ? (document.body.clientWidth / 16) * 9
        : 360,
    [],
  );

  const opts = React.useMemo(() => {
    if (
      url.match(
        /https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)&list=([a-zA-Z0-9\-_]+)/,
      )
    ) {
      return {
        videoId: RegExp.$1,
        playerVars: {
          list: RegExp.$2,
        },
      };
    } else if (
      url.match(/https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/)
    ) {
      return {
        videoId: RegExp.$1,
        playerVars: {},
      };
    } else if (url.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)) {
      return {
        videoId: RegExp.$1,
        playerVars: {},
      };
    }

    return null;
  }, [url]);

  return opts ? (
    <div className='max-w-full'>
      <YouTube
        className='max-w-full mx-auto'
        videoId={opts.videoId}
        containerClassName='yt'
        opts={{
          height: `${initialHeight}`,
          playerVars: {
            rel: 0,
            ...opts.playerVars,
          },
        }}
      />
    </div>
  ) : null;
};
