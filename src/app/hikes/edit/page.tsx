/**
 * Page that displays the EditHikeForm for Users to create a new Trail
 * Only ADMIN can use 
 * IS THIS PAGE OBSOLETE
 */

import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditHikeForm from '@/components/EditHikeForm';

const editHike = async ({ params,}: { params: Promise<{ id: string }>; }) => {
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: {
        email: string;
        id: string;
        name: string;
        role: string;
      };
    } | null,
  );

  const { id } = await params;

  const trail = await prisma.trail.findUnique({
    where: { id, },
  });

  if (!trail) {
    notFound();
  }

  return (
    <main>
      <EditHikeForm trail={trail} />
    </main>
  );
};

export default editHike;
