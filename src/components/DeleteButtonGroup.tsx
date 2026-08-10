/**
 * @fileoverview DeleteButtonGroup component where User can delete a Group
 */

'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import swal from 'sweetalert'
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

import { deleteGroup } from '@/lib/dbActions';

export default function DeleteButton({ groupId }: { groupId: string }) {
  const { update } = useSession();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const isConfirmed = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this group!",
      icon: "warning",
      buttons: [true, true], // Cancel , OK
      dangerMode: true,
    });

    if (!isConfirmed) return;
    
    try {
      setIsDeleting(true);

      await deleteGroup(groupId);

      await update({});

      await swal('Success', 'Your group has been deleted', 'success', {
        timer: 2000,
      });

      window.location.href = '/groups';
      
    } catch (error: unknown) {
      console.error('Error deleting group:', error);
      setIsDeleting(false);
     if (error instanceof Error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Error', 'Something went wrong while deleting the group.', 'error');
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
