import { TableBody, TableCell, TableRow } from '@/components/table';
import { AiOutlineLoading } from 'react-icons/ai';

interface Props {
  rowCount?: number;
}

export function LoadingBodyTable({ rowCount = 5 }: Props) {
  const middleIndex = Math.floor(rowCount / 2);
  return (
    <TableBody>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={index}>
          {index === middleIndex ? (
            <TableCell colSpan={7} className='w-full text-center' withoutBorders={true}>
              <AiOutlineLoading
                className='mx-auto h-6 w-6 animate-spin text-center text-zinc-500 dark:text-zinc-400'
                aria-hidden='true'
              />
            </TableCell>
          ) : (
            <TableCell height={57} withoutBorders={true}></TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}
