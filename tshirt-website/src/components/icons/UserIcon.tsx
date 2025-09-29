const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='12' cy='7' r='2.5' stroke='#0D1222' />
    <path
      d='M12 12.5C15.5899 12.5 18.5 15.4101 18.5 19V19.5H5.5V19C5.5 15.4101 8.41015 12.5 12 12.5Z'
      stroke='#0D1222'
    />
  </svg>
);
export default UserIcon;
