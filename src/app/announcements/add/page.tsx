/**
 * Page that displays the AddEventForm for creating new Event/Announcement
 */

import { loggedInProtectedPage } from '@/lib/page-protection';
import AddEventForm from '@/components/AddEventForm';
import { auth } from '@/lib/auth';

const addAnnouncement = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  return (
    <main>
      <AddEventForm />
    </main>
  );
};

export default addAnnouncement;
