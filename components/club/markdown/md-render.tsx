import dynamic from 'next/dynamic';

export const MdRenderer = dynamic(
  async () => {
    const dyn = await import('./md-dyn');
    return dyn.MdRenderer;
  },
  { ssr: false },
);
