import { loggedInProtectedPage } from '@/lib/page-protection';
import HikeList from '@/components/HikeList';
import { auth } from '@/lib/auth';
import { getTrails } from '@/lib/dbActions';

const HikeListings = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const trails = await getTrails();

  return (
    <main>
      <HikeList trails={trails}/>
    </main>
  );
};

export default HikeListings;
