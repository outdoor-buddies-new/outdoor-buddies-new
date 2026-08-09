'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { deleteGroup } from '@/lib/dbActions';

export default function DeleteButton({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    // 1. Delete from database via Server Action
    await deleteGroup(groupId);
    
    // 2. Force Next.js to clear cache and refresh session tokens
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