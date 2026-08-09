import { notFound } from 'next/navigation';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import EditGroupForm from '../../../../components/EditGroupForm';

const editGroup = async ({ params,}: { params: Promise<{ id: string }>; }) => {
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const { id } = await params;

  const owner = session?.user!.email ? session.user.email : '';
  

  const group = await prisma.group.findUnique({
    where: {
     owner
    },
  });
  if (!group) {
    notFound();
  }

  return (
    <main>
      <EditGroupForm groupData={group} />
    </main>
  );
};

export default editGroup;