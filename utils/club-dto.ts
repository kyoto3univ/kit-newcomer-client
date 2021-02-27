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
