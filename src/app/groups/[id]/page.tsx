import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Row, Col, Container} from 'react-bootstrap';
import SafeImage from '@/components/SafeImage';
import DeleteButtonGroup from '@/components/DeleteButtonGroup';

interface GroupsDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const GroupsDetailsPage = async ({
  params,
}: GroupsDetailsPageProps) => {
  const { id } = await params;

  const session = await auth();

  const group = await prisma.group.findUnique({
    where: {
      id,
    },
  });

  if (!group) {
    notFound();
  }

  const isOwner = Number(session?.user?.id) === group.userId;

  return (
    <main>
      <Container className="mt-5">
        <div className="d-flex justify-content-center">
        <SafeImage 
              src={group.image && group.image.startsWith('/') ? group.image : ''} 
              fallbackSrc="/images/default-image-user.jpg"
              alt={group.name} 
              className="group-details-pfp" 
              roundedCircle 
            />
        </div>
        <Row className="align-items-center mt-5 mb-4">
          <Col xs={3} className="d-flex justify-content-start">
            
          </Col>
          
          <Col xs={6} className="text-center">
            <h1 className="m-0">{group.name}</h1>
          </Col>

          <Col xs={3} className="d-flex justify-content-end">
            {isOwner && (
              <Link href={`/groups/edit/${group.id}`} className="btn page-button">
                Edit Group
              </Link>
            )}
          </Col>
        </Row>

        <div className="d-flex gap-4 ms-auto">
          <p>
            <strong>Members:</strong>{' '}
            {group.members}
          </p>

          <p>
            <strong>Maximum Members:</strong>{' '}
            {group.maxmembers ?? 'N/A'}
          </p>
        </div>

        <div className="d-flex gap-4 ms-auto">
          <p>
            <strong>Created At:</strong>{' '}
            {new Date(group.createdAt).toLocaleDateString()}
          </p>

          <p>
            <strong>Last Event:</strong>{' '}
            {group.lastlocation}
          </p>  

          <p>
            <strong>Last Event Date:</strong>{' '}
            {group.lastdate ? new Date(group.lastdate).toLocaleDateString() : 'N/A'}
          </p>
        </div>
        

        <hr/>
        
        <p>{group.description}</p>

        <div className=" d-flex justify-content-end mb-4">
                  {isOwner && <DeleteButtonGroup groupId={group.id} />}
                </div>

      </Container>
    </main>

  );
};

export default GroupsDetailsPage;