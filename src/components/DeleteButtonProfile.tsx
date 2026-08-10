/**
 * @fileoverview DeleteButtonGroup component where User can delete a Profile
 */

'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert'
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

import { deleteProfile } from '@/lib/dbActions';

export default function DeleteButton({ profileId }: { profileId: string }) {
  const { update } = useSession();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const isConfirmed = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this profile!",
      icon: "warning",
      buttons: [true, true], // Cancel , OK
      dangerMode: true,
    });

    if (!isConfirmed) return;
    
    try {
      setIsDeleting(true);

      await deleteProfile(profileId);

      await update({});

      await swal('Success', 'Your profile has been deleted', 'success', {
        timer: 2000,
      });

      window.location.href = '/profile/add';
      
    } catch (error: unknown) {
      console.error('Error deleting profile:', error);
      setIsDeleting(false);
     if (error instanceof Error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Error', 'Something went wrong while deleting the profile.', 'error');
      }
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <Button type="submit" variant="danger" disabled={isDeleting}>
        <Trash /> {isDeleting ? 'Deleting...' : ''}
      </Button>
    </form>
  );
}
