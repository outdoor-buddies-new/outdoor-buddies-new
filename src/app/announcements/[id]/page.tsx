import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Container } from 'react-bootstrap';

interface EventDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}

const EventDetailsPage = async ({
	params,
}: EventDetailsPageProps) => {
	const { id } = await params;

	const event = await prisma.event.findUnique({
		where: {
			id,
		},
	});

	if (!event) {
		notFound();
	}

	return (
		<main>
      <Container>
        <h1 className="mt-5">{event.title}</h1>

        <div className="d-flex gap-4 ms-auto fs-5">
					<p>
						<strong>Location:</strong>{' '}
						{event.location}
					</p>

					<p>
						<strong>Posted:</strong>{' '}
						{new Date(event.createdAt).toLocaleDateString()}
					</p>

					<p>
						<strong>Event Date:</strong>{' '}
						{new Date(event.date).toLocaleDateString()}
					</p>
        </div>

        <hr />

        <p className="fs-5 lh-lg">
					{event.description}
				</p>
        
      </Container>
		</main>
	);
};

export default EventDetailsPage;
