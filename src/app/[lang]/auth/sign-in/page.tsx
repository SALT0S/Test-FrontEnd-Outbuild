import LangSelector from '@/components/LangSelector';
import { Lang } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import SignInForm from '@/ui/SignInForm';

interface Props {
  params: {
    lang: Lang;
  };
}

export async function generateMetadata({ params }: Readonly<Props>) {
  const { SignIn } = await getDictionary(params.lang);
  return {
    title: `${SignIn.sign_in}`,
    description: ``,
  };
}

export default async function SignIn({ params }: Readonly<Props>) {
  const { SignIn, Sidebar } = await getDictionary(params.lang);

  return (
    <div className='w-full max-w-sm space-y-8'>
      <h3 className='text-lg/7 font-semibold tracking-[-0.015em] text-zinc-950 sm:text-base/7 dark:text-white'>
        {SignIn.sign_in}
      </h3>

      <SignInForm translations={{ ...SignIn, ...Sidebar }} />

      <LangSelector
        lang={params.lang}
        translations={{
          spanish_spain: 'Español (España)',
          english_united_states: 'English (United States)',
        }}
      />
    </div>
  );
}
