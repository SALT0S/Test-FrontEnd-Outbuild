import { Heading, Subheading } from '@/components/heading';
import { PaginationSearch } from '@/components/pagination-search';
import { Table, TableHead, TableHeader, TableRow } from '@/components/table';
import { Lang } from '@/i18n.config';
import { getTotalComments } from '@/lib/comments';
import { getDictionary } from '@/lib/dictionary';
import { getCurrentUser } from '@/lib/user';
import { CommentBodyTable } from '@/ui/table/FetchBodyTable';
import { LoadingBodyTable } from '@/ui/table/LoadingBodyTable';
import { getGreetingKey } from '@/utils/get-greeting-key';
import { Suspense } from 'react';

interface Props {
  params: {
    lang: Lang;
  };
  searchParams?: {
    table_page?: string;
    items_per_page?: string;
  };
}

export default async function Home({ params, searchParams }: Readonly<Props>) {
  const { Home, TablePagination } = await getDictionary(params.lang);
  const user = await getCurrentUser();
  const tablePage = Number(searchParams?.table_page) || 1;
  const itemsPerPage = Number(searchParams?.items_per_page) || 10;
  const offset = (tablePage - 1) * itemsPerPage;
  const comments = await getTotalComments();

  return (
    <>
      <Heading>
        {Home.Greeting[getGreetingKey()]}, {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email}
      </Heading>

      <Subheading className='mt-14'>{Home.Comments.comments}</Subheading>
      <Table className='mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]'>
        <TableHead>
          <TableRow>
            <TableHeader>{Home.Table.id}</TableHeader>
            <TableHeader>{Home.Table.name}</TableHeader>
            <TableHeader>{Home.Table.email}</TableHeader>
            <TableHeader className='relative w-0'>
              <span className='sr-only'>{Home.Table.modal}</span>
            </TableHeader>
          </TableRow>
        </TableHead>

        <Suspense key={itemsPerPage + tablePage} fallback={<LoadingBodyTable rowCount={itemsPerPage} />}>
          <CommentBodyTable translations={{ ...Home.Table, ...Home.Dialog }} limit={itemsPerPage} offset={offset} />
        </Suspense>
      </Table>

      {comments.length > itemsPerPage && (
        <PaginationSearch
          translations={TablePagination}
          current_page={tablePage}
          limit={itemsPerPage}
          count={comments.length}
        />
      )}
    </>
  );
}
