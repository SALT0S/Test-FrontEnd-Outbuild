import { TableCell, TableRow } from '@/components/table';

interface Props {
  no_found_text: string;
}

export function NoDataFoundTable({ no_found_text }: Readonly<Props>) {
  return (
    <TableRow>
      <TableCell colSpan={6} className='text-center'>
        <p className='text-sm/6 text-zinc-500 dark:text-zinc-400'>{no_found_text}</p>
      </TableCell>
    </TableRow>
  );
}
