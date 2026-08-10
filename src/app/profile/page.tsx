/**
 * Page displays a list of Profile through the ProfileSearch component
 */

import { loggedInProtectedPage } from '@/lib/page-protection';
import ProfileSearch from '@/components/ProfileSearch';
import { auth } from '@/lib/auth';
import { getProfiles } from '@/lib/dbActions';

const ProfilesPage = async () => {
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const owner = session?.user!.email ? session.user.email : '';

  const profile = await getProfiles();

  return (
    <main>
      <ProfileSearch profiles={profile}/>
    </main>
  );
};

export default ProfilesPage;
