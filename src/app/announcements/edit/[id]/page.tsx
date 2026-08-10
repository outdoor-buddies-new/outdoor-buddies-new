/**
 * Page that displays the EditEventForm for editing an existing Event/Announcement
 */

import { loggedInProtectedPage } from '@/lib/page-protection';
import EditEventForm from '@/components/EditEventForm';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

const editAnnouncement = async ({ params,}: { params: Promise<{ id: string }>; }) => {
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <main>
      <EditEventForm eventData={event} />
    </main>
  );
};

export default editAnnouncement;
