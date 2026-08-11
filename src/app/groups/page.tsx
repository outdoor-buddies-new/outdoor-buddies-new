/**
 * Page displays a list of Group through the GroupSearch component
 */

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

  const group = await getGroups();

  return (
    <main>
      <GroupSearch groups={group}/>
    </main>
  );
};

export default GroupsPage;
