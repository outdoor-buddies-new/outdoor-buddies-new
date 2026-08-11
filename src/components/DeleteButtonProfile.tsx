/**
 * @fileoverview DeleteButtonProfile component where User can delete a Profile
 */

'use client';

import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

import { deleteProfile } from '@/lib/dbActions';

export default function DeleteButtonProfile({
	profileId,
}: {
	profileId: string;
}) {
	const deleteProfileWithId = deleteProfile.bind(null, profileId);

	return (
		<form action={deleteProfileWithId}>
			<Button
				type="submit"
				variant="danger"
				aria-label="Delete Profile"
			>
				<Trash /> Delete Profile
			</Button>
		</form>
	);
}