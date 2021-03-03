import dynamic from 'next/dynamic';

const Viewer = dynamic(
  async () => {
    const edit = await import('@toast-ui/react-editor');
    return edit.Viewer;
  },
  { ssr: false },
);

type Props = {
  content: string;
};
export const MdRenderer = ({ content }: Props) => {
  return <Viewer initialValue={content} />;
};
