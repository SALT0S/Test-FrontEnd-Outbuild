import { TableBody, TableCell, TableRow } from '@/components/table';
import { getComments } from '@/lib/comments';
import { CommentDetailsDialog } from '@/ui/dialog/CommentDetailsDialog';
import { NoDataFoundTable } from '@/ui/table/NoDataFoundTable';

interface CommentBodyTableProps {
  translations: {
    no_orders_found: string;
    close: string;
  };
  limit: number;
  offset: number;
}

export async function CommentBodyTable({ translations, limit, offset }: Readonly<CommentBodyTableProps>) {
  const comments = await getComments(limit, offset);

  return (
    <TableBody>
      {comments.length === 0 ? (
        <NoDataFoundTable no_found_text={translations.no_orders_found} />
      ) : (
        comments.map((comment) => (
          <TableRow key={comment.id} title={`Comment #${comment.id}`}>
            <TableCell>#{comment.id}</TableCell>
            <TableCell>{comment.name}</TableCell>
            <TableCell className='text-zinc-500'>{comment.email}</TableCell>
            <TableCell>
              <div className='-mx-3 -my-1.5 sm:-mx-2.5'>
                {/*<CommentGroupDropdown comment={comment} translations={translations} />*/}
                <CommentDetailsDialog comment={comment} translations={translations} />
              </div>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
}
