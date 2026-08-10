/**
 * Page that displays the EditGroupForm for Users to edit the details of a Group
 */

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

  const group = await prisma.group.findUnique({
    where: { id },
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
