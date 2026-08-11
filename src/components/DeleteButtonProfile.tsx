/**
 * @fileoverview DeleteButtonGroup component where User can delete a Profile
 */

'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

import { deleteProfile } from '@/lib/dbActions';

export default function DeleteButton({ profileId }: { profileId: string }) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);

			await deleteProfile(profileId);

			window.location.href = '/profile';
		} catch (error: unknown) {
			console.error('Error deleting profile:', error);
			setIsDeleting(false);
		}
	};

	return (
		<Button
			type="button"
			variant="danger"
			disabled={isDeleting}
			aria-label="Delete Profile"
			onClick={handleDelete}
		>
			<Trash /> {isDeleting ? 'Deleting...' : ''}
		</Button>
	);
}