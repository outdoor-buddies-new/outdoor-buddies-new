import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Container, Image } from 'react-bootstrap';

interface ProfilesDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProfilesDetailsPage = async ({
  params,
}: ProfilesDetailsPageProps) => {
  const { id } = await params;

  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });

  if (!profile) {
    notFound();
  }

  return (
    <main>
      <Container>
        <h1 className="mt-5">{profile.name}</h1>

        <div className="d-flex gap-4 ms-auto">
          <p>
            <strong>Summary</strong>{' '}
            {profile.summary}
          </p>

          <p>
            <strong>Group:</strong>{' '}
            {profile.groupname}
          </p>
        </div>
        <hr />

        <p>{profile.description}</p>

        <Image 
          src={profile.descimage || '/images/default-descimage.png'} 
          alt={`${profile.name} Description`} 
          className="d-block mx-auto mb-4"
        />

      </Container>
    </main>
  );
};

export default ProfilesDetailsPage;