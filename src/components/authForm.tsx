import Link from 'next/link';

type AuthFormProps = {
  title: string;
  subtitle: string;
  fields?: React.ReactNode;
  buttons?: React.ReactNode;
  linkText: string;
  href: string;
};

const AuthForm = ({
  title,
  subtitle,
  fields,
  linkText,
  href,
  buttons,
}: AuthFormProps) => {
  return (
    <div
      className='px-8 pt-[26px] pb-10 mx-auto bg-[#18181b] rounded-[14px] custom-shadow
      text-[1em]'
    >
      <h2 className='text-[#ecedee] font-bold text-[1.25rem] leading-[1.4] mb-7'>
        {title}
      </h2>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-3 w-full mb-3'>
          {fields}
        </div>
        {buttons}
        <span className='text-[#ecedee] font-medium text-[0.875rem] leading-[1.42] self-center'>
          {subtitle}{' '}
          <Link href={href} className='text-[#006fee]'>
            {linkText}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default AuthForm;
