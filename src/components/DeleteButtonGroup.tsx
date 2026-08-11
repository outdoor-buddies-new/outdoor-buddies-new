/**
 * @fileoverview DeleteButtonGroup component where User can delete a Group
 */

'use client';

import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

import { deleteGroup } from '@/lib/dbActions';

export default function DeleteButtonGroup({
	groupId,
}: {
	groupId: string;
}) {
	const deleteGroupWithId = deleteGroup.bind(null, groupId);

	return (
		<form action={deleteGroupWithId}>
			<Button
				type="submit"
				variant="danger"
				aria-label="Delete Group"
			>
				<Trash /> Delete Group
			</Button>
		</form>
	);
}