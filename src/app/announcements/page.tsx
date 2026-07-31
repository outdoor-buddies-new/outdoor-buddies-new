import { loggedInProtectedPage } from '@/lib/page-protection';
import AnnouncementList from '@/components/AnnouncementList';
import { auth } from '@/lib/auth';

/** The Announcements page. */

const Announcement = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );
  return (
    <main>
      <AnnouncementList />
    </main>
  );
};

export default Announcement;
