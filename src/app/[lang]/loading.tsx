import { AiOutlineLoading } from 'react-icons/ai';

export default function Loading() {
  return (
    <div className='flex min-h-full flex-1 flex-col items-center justify-center'>
      <AiOutlineLoading className='h-8 w-8 animate-spin' aria-hidden='true' />
    </div>
  );
}
