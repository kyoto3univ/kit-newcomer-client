import * as yup from 'yup';
import {
  ClubDetailFragment,
  ClubTopImageType,
  UpdateClubDto,
} from '../api/generated';

export const convertClubToForm = (
  club: ClubDetailFragment,
): ClubDetailFragment => {
  return {
    ...club,
    shortDescription: club.shortDescription ?? '',
    longDescription: club.longDescription ?? '',
    joinDescription: club.joinDescription ?? '',
    place: club.place ?? '',
    schedule: club.schedule ?? '',
    contactUrl: club.contactUrl ?? '',
    videoUrl: club.videoUrl ?? '',
  };
};

export const convertFormToClubDto = (
  form: ClubDetailFragment,
): UpdateClubDto => {
  const keys: Array<keyof ClubDetailFragment> = [
    'contactUrl',
    'joinDescription',
    'longDescription',
    'name',
    'place',
    'schedule',
    'shortDescription',
    'topContentType',
    'videoUrl',
  ];
  const copyTarget = keys.filter(
    (key) => form[key] !== undefined && form[key] !== '',
  );
  const nullTarget = keys.filter((key) => !copyTarget.includes(key));

  const output: UpdateClubDto = {};

  // @ts-ignore
  copyTarget.forEach((key) => (output[key] = form[key]));
  // @ts-ignore
  nullTarget.forEach((key) => (output[key] = null));

  output['topImageId'] = form.topImage ? form.topImage.id : null;
  output['thumbImageId'] = form.thumbImage ? form.thumbImage.id : null;

  return output;
};

export const clubDtoValidator = yup.object().shape({
  contactUrl: yup
    .string()
    .matches(/^(https?:\/\/[a-z0-9.,_/~#&=;%@+?\-\\(\\)]+\s?)+$/i),
  joinDescription: yup.string().max(150),
  longDescription: yup.string(),
  name: yup.string().max(50).required(),
  place: yup.string().max(100),
  schedule: yup.string().max(100),
  shortDescription: yup.string().max(150),
  thumbImage: yup.object().nullable(),
  topImage: yup.object().nullable(),
  topContentType: yup
    .string()
    .oneOf(Object.values(ClubTopImageType))
    .required(),
  videoUrl: yup.string().when('topContentType', {
    is: ClubTopImageType.YouTube,
    then: yup
      .string()
      .matches(
        /^https?:\/\/((www\.)?youtube\.com\/watch\?v=|youtu\.be)[a-zA-Z0-9_-]+$/,
        'https://youtube.com/watch?v=xxx or https://youtu.be/xxxの形式である必要があります',
      )
      .required(),
    otherwise: yup.string(),
  }),
});
