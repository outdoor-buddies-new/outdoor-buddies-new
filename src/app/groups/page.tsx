/*import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import StuffItem from '@/components/StuffItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';*/



/** Render a list of stuff for the logged in user. */
/*const Groups = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const stuff = await prisma.stuff.findMany({
    where: {
      owner,
    },
  });
  // console.log(stuff);
  return (
    <main>
      
    </main>
  );
};

export default Groups;*/

import { Container, Row, Col } from 'react-bootstrap';
import { Groups } from '@/lib/validationSchemas';
import GroupCard from '@/app/groups/components/Groups';

const group: Groups [] = [{
    name: 'Ducks',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Hikers_%288700160875%29.jpg/960px-Hikers_%288700160875%29.jpg',
    people: 3,
    description: 'Looking to add 2 more members to our small group. We tend to go on more difficult hikes, so people with experience please.',
    },
    {
      name: 'Math Hikes',
      image: '/images/mathclub.jpeg',
      people: 10,
      description: 'We go on hikes and talk about math. Please join if interested, we always welcome new members.',
    },
    {
      name: 'HNL Hiking',
      image: '/images/hnlhike.jpeg',
      people: 55,
      description: 'We heard about this website and wanted to branch out. Our group number is bigger than what is listed but we have only included members that have profiles here. Always welcome more and every hike is a big crowd.',
    },
  ];

const GroupsPage = async () => {
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
        <Row xs={1} md={2} lg={2} className="g-4">
          {group.map((group) => (
            <Col key={`Groups-${group.name}`}>
              <GroupCard group = {group} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default GroupsPage;

