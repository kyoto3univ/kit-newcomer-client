import dynamic from 'next/dynamic';

export const ClubMarkdownEditorField = dynamic(
  async () => {
    const dyn = await import('./md-dyn');
    return dyn.ClubMarkdownEditorField;
  },
  { ssr: false },
);
