import * as yup from 'yup';
import {
  ClubDetailFragment,
  ClubTopImageType,
  UpdateClubDto,
} from '../api/generated';

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

export const clubDtoValidator = yup.object().shape({
  contactUrl: yup.string().url(),
  joinDescription: yup.string().max(150),
  longDescription: yup.string(),
  name: yup.string().max(50).required(),
  place: yup.string().max(100),
  schedule: yup.string().max(100),
  shortDescription: yup.string().max(150),
  thumbImageId: yup.number().positive().integer(),
  topImageId: yup.number().positive().integer(),
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
