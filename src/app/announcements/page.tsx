/**
 * Page displays a list of Event/Announcement through the AnnouncementList component
 */

import { loggedInProtectedPage } from '@/lib/page-protection';
import AnnouncementList from '@/components/AnnouncementList';
import { auth } from '@/lib/auth';
import { getEvents } from '@/lib/dbActions';

const Announcement = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const events = await getEvents();

  return (
    <main>
      <AnnouncementList events={events}/>
    </main>
  );
};

export default Announcement;
