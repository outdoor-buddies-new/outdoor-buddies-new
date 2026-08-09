'use client';

import { useSession } from 'next-auth/react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { deleteProfile } from '@/lib/dbActions';

export default function DeleteButton({ profileId }: { profileId: string }) {
  const { update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    try {
      // 1. Delete the profile in the database
      await deleteProfile(profileId);

      // 2. Clear/update the NextAuth session so profileId becomes undefined
      await update();

      // 3. Refresh and redirect the user to the add profile form
      startTransition(() => {
        router.push('/profile/add');
        router.refresh();
      });
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <Button type="submit" variant="danger" disabled={isPending}>
        <Trash /> {isPending ? 'Deleting...' : ''}
      </Button>
    </form>
  );
}