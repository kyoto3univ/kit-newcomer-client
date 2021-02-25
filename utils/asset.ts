export const assetPath = (asset: { filePath: string }) => {
  return `${process.env.ASSET_ENDPOINT}${asset.filePath}`;
};
