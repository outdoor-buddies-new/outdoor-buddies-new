/**
 * @fileoverview DeleteButtonPost component where User.Admin can delete a Post
 */

'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

import { deleteNote } from '@/lib/dbActions';

export default function DeleteButton({ noteId }: { noteId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    await deleteNote(noteId);
    
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <form action={handleDelete}>
      <Button type="submit" variant="danger" disabled={isPending}>
        <Trash />
      </Button>
    </form>
  );
}
