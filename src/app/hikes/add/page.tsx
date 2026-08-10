/**
 * Page that displays the AddHikeForm for Users to create a new Trail
 * Only ADMIN can use 
 */

import { loggedInProtectedPage } from '@/lib/page-protection';
import AddHikeForm from '@/components/AddHikeForm';
import { auth } from '@/lib/auth';


const addHike = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  return (
    <main>
      <AddHikeForm />
    </main>
  );
};

export default addHike;
