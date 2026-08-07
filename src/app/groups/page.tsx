/*import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Group } from '@prisma/client';
import GroupCard from '@/components/GroupCard';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import GroupSearch from '@/components/GroupSearch';*/

import { loggedInProtectedPage } from '@/lib/page-protection';
import GroupSearch from '@/components/GroupSearch';
import { auth } from '@/lib/auth';
import { getGroups } from '@/lib/dbActions';

const GroupsPage = async () => {
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const owner = session?.user!.email ? session.user.email : '';
  /*const group: Group[] = await prisma.group.findMany({
    where: {
      owner
    },
  });*/

  const group = await getGroups();

  return (
    <main>
      <GroupSearch groups={group}/>
    </main>
  );
};

export default GroupsPage;