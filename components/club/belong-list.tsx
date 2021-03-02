import { useGetMyClubsQuery } from '../../api/generated';
import { ClubListItem } from './list-item';

export const BelongClubList = () => {
  const { data, isLoading, isError } = useGetMyClubsQuery();

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      {data!.getMyClubs.map(({ club }) => {
        return <ClubListItem key={club.id} club={club} link='edit' />;
      })}
    </>
  );
};
