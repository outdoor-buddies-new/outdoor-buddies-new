'use client';

import { Trail } from '@prisma/client';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface HikeCardProps {
	trail: Trail;
}

/* Renders a single row in the Trail table. See list/page.tsx. */
const HikeCard = ({ trail }: HikeCardProps) => {
	const { data: session } = useSession();
	const role = session?.user?.role;

	return (
		<Card className="bg-white h-100">
			<Link href={`/hikes/${trail.id}`}>
				<Card.Img
					variant="top"
					src={trail.image}
					alt={trail.name}
					style={{ height: '220px', objectFit: 'cover' }}
				/>
			</Link>
			<Card.Body className="d-flex flex-column">
				<Card.Title className="mb-1">
					<Link href={`/hikes/${trail.id}`} className="text-decoration-none link-title">
					{trail.name}
					</Link>
				</Card.Title>
				<Row>
					<Col>
						<Card.Text>
							Difficulty: {trail.difficulty}
						</Card.Text>
					</Col>
					<Col>
						<Card.Text>
							Distance: {trail.distance} miles
						</Card.Text>
					</Col>
				</Row>
				<hr />

				<Row className="mt-2">
					<Col>
						<Card.Text>
							<strong>Location:</strong> {trail.location}
						</Card.Text>
					</Col>
				</Row>

				{role === 'ADMIN' && (
					<div className="mt-auto text-end">
						<Button href={`/hikes/edit/${trail.id}`} variant="warning">
							Edit
						</Button>
					</div>
				)}
			</Card.Body>
		</Card>
	)
};

export default HikeCard;