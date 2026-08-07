import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Col, Container, Row, Image } from 'react-bootstrap';

interface HikeDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}

const HikeDetailsPage = async ({
	params,
}: HikeDetailsPageProps) => {
	const { id } = await params;

	const hike = await prisma.trail.findUnique({
		where: {
			id,
		},
	});

	if (!hike) {
		notFound();
	}

	return (
		<main>
      <Container>
        <h1 className="mt-5">{hike.name}</h1>

        <div className="d-flex gap-4 ms-auto">
        <p>
          <strong>Location:</strong>{' '}
          {hike.location}
        </p>

        <p>
          <strong>Difficulty:</strong>{' '}
          {hike.difficulty}
        </p>

        <p>
          <strong>Distance:</strong>{' '}
          {hike.distance} miles
        </p>
        </div>

        <hr />
        <Row className="mb-3">
          <Col>    
        <p>{hike.description}</p>
          </Col>
          <Col>
            <Image src={hike.image} alt={hike.name} className="img-fluid" />
          </Col>
        </Row>
      </Container>
		</main>
	);
};

export default HikeDetailsPage;