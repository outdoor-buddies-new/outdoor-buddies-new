'use client';

import { Trail } from '@prisma/client';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

interface HikeCardProps {
	trail: Trail;
}

/* Renders a single row in the Trail table. See list/page.tsx. */
const HikeCard = ({ trail }: HikeCardProps) => {
	const { data: session } = useSession();
	const role = session?.user?.role;

	return (
		<Card className="bg-white" style={{ height: '380px' }}>
			<Card.Img
				variant="top"
				src={trail.image}
				alt={trail.name}
				style={{ height: '220px', objectFit: 'cover' }}
			/>
			<Card.Body>
				<Row>
					<Col>
						<Card.Title className="mb-0">
							{trail.name}
						</Card.Title>
					</Col>
					<Col className="text-end">
						<Button variant="outline-primary" href={`/hikes/${trail.id}`}>
							View Details
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<Card.Text>
							Difficulty: {trail.difficulty}
						</Card.Text>
					</Col>
					<Col>
						<Card.Text>
							Distance: {trail.distance}
						</Card.Text>
					</Col>
				</Row>
				<hr />

				<Row className="mt-2">
					<Col md={10}>
						<Card.Text>
							<strong>Location:</strong> {trail.location}
						</Card.Text>
					</Col>
					{role === 'ADMIN' && (
						<Col md={2} className="text-end">
							<Button href={`/hikes/edit/${trail.id}`} variant="warning">
                Edit
              </Button>
						</Col>
					)}
				</Row>
			</Card.Body>
		</Card>
	)
};

export default HikeCard;