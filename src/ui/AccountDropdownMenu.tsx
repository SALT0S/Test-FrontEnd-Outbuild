'use client';

import { DropdownItem, DropdownLabel, DropdownMenu } from '@/components/dropdown';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid';

interface Props {
  anchor: 'top start' | 'bottom end';
  logout: () => Promise<void>;
  translations: {
    sign_out: string;
  };
}

export function AccountDropdownMenu({ anchor, logout, translations }: Props) {
  return (
    <DropdownMenu className='min-w-64' anchor={anchor}>
      <DropdownItem
        onClick={async () => {
          await logout();
        }}
      >
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>{translations.sign_out}</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}
