import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { deleteProfile } from '@/lib/dbActions';
import SafeImage from '@/components/SafeImage';
import DeleteButton from '@/components/DeleteButton';

interface ProfilesDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProfilesDetailsPage = async ({
  params,
}: ProfilesDetailsPageProps) => {
  const { id } = await params;

  const session = await auth();

  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });

  if (!profile) {
    notFound();
  }

  const isOwner = Number(session?.user?.id) === profile.userId;

  return (
    <main>
      <Container className="mt-5">
        <Row className="align-items-center mb-4">
          <Col xs={3} className="d-flex justify-content-start">
            <SafeImage 
              src={profile.image} 
              fallbackSrc="/images/default-image-user.jpg"
              alt={profile.name} 
              className="profile-details-pfp" 
              roundedCircle 
            />
          </Col>

          {/* Centered Name */}
          <Col xs={6} className="text-center">
            <h1 className="m-0">{profile.name}</h1>
          </Col>

          <Col xs={3} className="d-flex justify-content-end">
            {isOwner && (
              <Link href={`/profile/edit/${profile.id}`} className="btn page-button">
                Edit Profile
              </Link>
            )}
          </Col>
        </Row>

        <div className="d-flex gap-4 mt-3">
          <p>
            <strong>Summary:</strong> {profile.summary}
          </p>
        </div>
        <div>
          <p>
            <strong>Group:</strong> {profile.groupname || 'None'}
          </p>
        </div>
        <hr />

        <p>{profile.description}</p>

        <SafeImage 
          src={profile.image}
          fallbackSrc="/images/default-descimage.png"
          alt={`${profile.name} Description`} 
          className="d-block mx-auto mb-4"
          fluid
        />

        <div className=" d-flex justify-content-end mb-4">
          {isOwner && <DeleteButton profileId={profile.id} />}
        </div>
      </Container>
    </main>
  );
};

export default ProfilesDetailsPage;