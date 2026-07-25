import { loggedInProtectedPage } from '@/lib/page-protection';
import HikeRecommendations from '@/components/HikingRecommendations';
import { auth } from '@/lib/auth';

const HikeRecommendation = async () => {
  // Protect the page, only logged in users can access it.
//  const session = await auth();
//  loggedInProtectedPage(
//    session as {
//      user: { email: string; id: string; name: string };
//    } | null,
//  );
  return (
    <main>
      <HikeRecommendations />
    </main>
  );
};

export default HikeRecommendation;
