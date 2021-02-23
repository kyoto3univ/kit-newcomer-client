type Props = {
  icon?: string;
};
export const Avatar = ({ icon }: Props) => {
  return (
    <div>
      <img
        src={icon}
        alt='Avatar'
        className='object-fill h-10 rounded-full ring-2 ring-white'
      />
    </div>
  );
};
