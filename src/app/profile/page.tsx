/*import { loggedInProtectedPage } from '@/lib/page-protection';
import AddStuffForm from '@/components/AddStuffForm';
import { auth } from '@/lib/auth';
*/

import { Container, Row, Col } from 'react-bootstrap';
import { Profile } from '@/lib/validationSchemas';
import ProfileCard from '@/app/profile/components/Profile';

const profile: Profile[] = [{
    firstName: 'Hanako', lastName: 'Yamada', address: 'Oahu', groupname: "ex1",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Woman-wearing-red-scoop-neck-top-and-black-short-shorts-sitting-on-brown-wooden-bench.jpg/960px-Woman-wearing-red-scoop-neck-top-and-black-short-shorts-sitting-on-brown-wooden-bench.jpg',
    description: 'Excited to go on hikes with various people',
  },
    {
      firstName: 'John', lastName: 'Doe', address: 'Oahu', groupname: "ex2",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/All_smiles._.jpg/960px-All_smiles._.jpg',
      description: 'I love going on hikes in California but want to meet new people in Hawaii',
    },
    {
      firstName: 'Kim', lastName: 'Berley', address: 'POST 307, University of Hawaii', groupname: "ex3",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Young_woman_barefoot5.jpg/960px-Young_woman_barefoot5.jpg',
      description: 'I would like to find a new hiking partner',
    },
  ];

const ProfilesPage = async () => {
  // Protect the page, only logged in users can access it.
  /*const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );*/
  return (
    <main>
      <Container className="py-3">
        <h2 className="text-center py-3 text-white">Profiles</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {profile.map((profile) => (
            <Col key={`Contact-${profile.firstName}`}>
              <ProfileCard profile ={profile} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ProfilesPage;
