import React from 'react';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center'>
      <div className='mx-3 sm:mx-auto sm:w-full sm:max-w-[480px]'>
        <div className='relative h-full w-full rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline'>
          <div className='grid h-full w-full place-items-start justify-items-center overflow-hidden p-6 py-8 sm:p-8 lg:p-12'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
