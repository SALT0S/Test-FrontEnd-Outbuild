'use client';

import { Button } from '@/components/button';
import { Dialog, DialogActions, DialogBody } from '@/components/dialog';
import { Subheading } from '@/components/heading';
import { EyeIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

interface Props {
  comment: {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  };
  translations: {
    close: string;
  };
}

export function CommentDetailsDialog({ comment, translations }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button plain type='button' onClick={() => setIsOpen(true)}>
        <EyeIcon />
      </Button>

      <Dialog size='xl' open={isOpen} onClose={setIsOpen}>
        <DialogBody>
          <Subheading className='mb-2'>ID: {comment.id}</Subheading>
          <Subheading className='mb-2'>NAME: {comment.name}</Subheading>
          <Subheading className='mb-2'>EMAIL: {comment.email}</Subheading>
          <Subheading>BODY: {comment.body}</Subheading>
        </DialogBody>

        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>{translations.close}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
