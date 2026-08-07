import { loggedInProtectedPage } from '@/lib/page-protection';
import AddHikeForm from '@/components/AddHikeForm';
import { auth } from '@/lib/auth';

/** The Add Hikes page. */

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
