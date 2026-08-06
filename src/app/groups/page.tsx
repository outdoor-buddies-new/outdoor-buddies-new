import { Container, Row, Col } from 'react-bootstrap';
import { Group } from '@prisma/client';
import GroupCard from '@/components/GroupCard';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

const GroupsPage = async () => {
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const owner = session?.user!.email ? session.user.email : '';
  const group: Group[] = await prisma.group.findMany({
    where: {
      owner
    },
  });

  return (
    <main>
      <Container className="py-3">
        <h1 className="mb-4">Groups</h1>
        {/*<div className="my-3 d-flex gap-3">
            <Form.Control
              type="search"
              placeholder="Find your place"
            />
            <Button type="submit">
              Search
            </Button>
          </div>*/}
        <Link href="/groups/add" className="btn btn-primary">
          Add a Group
        </Link>
        <Container className="mb-3">
          m
        </Container>
        <Row xs={1} md={1} lg={1} className="g-4 justify-content-center">
          {group.map((group) => (
            <Col key={`Groups-${group.name}`} className="d-flex justify-content-center">
              <GroupCard group = {group} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default GroupsPage;
