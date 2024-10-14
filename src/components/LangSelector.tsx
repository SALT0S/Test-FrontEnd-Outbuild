'use client';

import spainFlag from '@/../public/flags/es.svg';
import usaFlag from '@/../public/flags/us.svg';
import { Field } from '@/components/fieldset';
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox';
import { Lang } from '@/i18n.config';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

type LanguageSelectorProps = {
  lang: Lang;
  translations: {
    spanish_spain: string;
    english_united_states: string;
  };
};

export default function LangSelector({ lang, translations }: Readonly<LanguageSelectorProps>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (lang: string) => {
    const segments = pathname.split('/');
    segments[1] = lang;
    const newPathname = segments.join('/');
    router.push(newPathname);
  };

  return (
    <>
      <Field>
        <Listbox name='lang' defaultValue={lang} onChange={handleLocaleChange}>
          <ListboxOption value='es'>
            <Image src={spainFlag} className='w-5 sm:w-4' alt='' />
            <ListboxLabel>{translations.spanish_spain}</ListboxLabel>
          </ListboxOption>
          <ListboxOption value='en'>
            <Image src={usaFlag} className='w-5 sm:w-4' alt='' />
            <ListboxLabel>{translations.english_united_states}</ListboxLabel>
          </ListboxOption>
        </Listbox>
      </Field>
    </>
  );
}
