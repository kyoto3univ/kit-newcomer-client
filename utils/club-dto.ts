import { ClubDetailFragment, UpdateClubDto } from '../api/generated';

export const convertClubToForm = (club: ClubDetailFragment): UpdateClubDto => {
  return {
    ...club,
    shortDescription: club.shortDescription ?? '',
    longDescription: club.longDescription ?? '',
    joinDescription: club.joinDescription ?? '',
    place: club.place ?? '',
    schedule: club.schedule ?? '',
    contactUrl: club.contactUrl ?? '',
    videoUrl: club.videoUrl ?? '',
    thumbImageId: club.thumbImage?.id ?? '',
    topImageId: club.topImage?.id ?? '',
  };
};

export const convertFormToClubDto = (form: UpdateClubDto): UpdateClubDto => {
  const keys: Array<keyof UpdateClubDto> = [
    'contactUrl',
    'joinDescription',
    'longDescription',
    'name',
    'place',
    'schedule',
    'shortDescription',
    'thumbImageId',
    'topContentType',
    'topImageId',
    'videoUrl',
  ];
  const copyTarget = keys.filter(
    (key) => form[key] !== undefined && form[key] !== '',
  );
  const nullTarget = keys.filter((key) => !copyTarget.includes(key));

  const output: UpdateClubDto = {};

  // @ts-ignore
  copyTarget.forEach((key) => (output[key] = form[key]));
  nullTarget.forEach((key) => (output[key] = null));

  return output;
};
