'use client';

import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@/components/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  translations: {
    previous: string;
    next: string;
  };
  current_page: number;
  limit: number;
  count: number;
}

export function PaginationSearch({ translations, current_page, limit, count }: Readonly<Props>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const totalPages = Math.ceil(count / limit);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage) {
      params.set('table_page', newPage.toString());
    } else {
      params.delete('table_page');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const generatePageItems = () => {
    // Mostrar todas las páginas si son 7 o menos
    if (totalPages <= 7) {
      return generatePageRange(1, totalPages);
    }

    const firstPages = generatePageRange(1, 2);
    const lastPages = generatePageRange(totalPages - 1, totalPages);
    const middlePages = generateMiddlePages();

    return [...firstPages, ...middlePages, ...lastPages];
  };

  const generatePageRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i).map((page) => renderPageItem(page));
  };

  const generateMiddlePages = () => {
    const showLeftGap = current_page > 4;
    const showRightGap = current_page < totalPages - 3;

    if (!showLeftGap && !showRightGap) {
      return generatePageRange(3, totalPages - 2);
    }

    const middlePages = generatePageRange(Math.max(3, current_page - 1), Math.min(totalPages - 2, current_page + 1));

    return [
      showLeftGap && <PaginationGap key='gap-start' />,
      ...middlePages,
      showRightGap && <PaginationGap key='gap-end' />,
    ].filter(Boolean);
  };

  const renderPageItem = (page: number) => (
    <PaginationPage key={page} onClick={() => handlePageChange(page)} current={current_page === page}>
      {page}
    </PaginationPage>
  );

  return (
    <Pagination className='mt-6'>
      <PaginationPrevious onClick={() => handlePageChange(current_page - 1)} disabled={current_page <= 1}>
        {translations.previous}
      </PaginationPrevious>

      <PaginationList>{generatePageItems()}</PaginationList>

      <PaginationNext onClick={() => handlePageChange(current_page + 1)} disabled={current_page >= totalPages}>
        {translations.next}
      </PaginationNext>
    </Pagination>
  );
}
