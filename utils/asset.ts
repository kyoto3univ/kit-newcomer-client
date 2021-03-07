export const assetPath = (
  asset: { filePath: string },
  variant: 'full' | 'lthumb' | 'mthumb' = 'full',
) => {
  switch (variant) {
    case 'full':
      return `${process.env.ASSET_ENDPOINT}${asset.filePath}`;
    case 'lthumb':
      return `${process.env.ASSET_ENDPOINT}${asset.filePath}?w=500`;
    case 'mthumb':
      return `${process.env.ASSET_ENDPOINT}${asset.filePath}?w=200`;
  }
};
