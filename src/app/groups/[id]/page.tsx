import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Container } from 'react-bootstrap';

interface GroupsDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const GroupsDetailsPage = async ({
  params,
}: GroupsDetailsPageProps) => {
  const { id } = await params;

  const group = await prisma.group.findUnique({
    where: {
      id,
    },
  });

  if (!group) {
    notFound();
  }

  return (
    <main>
      <Container>
        <h1 className="mt-5">{group.name}</h1>

        <div className="d-flex gap-4 ms-auto">
          <p>
            <strong>Members:</strong>{' '}
            {group.members}
          </p>

          <p>
            <strong>Created At:</strong>{' '}
            {new Date(group.createdAt).toLocaleDateString()}
          </p>

          <p>
            <strong>Last Event:</strong>{' '}
            {/*new Date(group.lastdate).toLocaleDateString()*/}
            ee
          </p>
        </div>
        <hr />

        <p>{group.description}</p>

      </Container>
    </main>
  );
};

export default GroupsDetailsPage;