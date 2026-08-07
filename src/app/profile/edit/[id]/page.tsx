import { notFound } from 'next/navigation';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import EditProfileForm from '@/components/EditProfileForm';

const editProfile = async ({ params,}: { params: Promise<{ id: string }>; }) => {
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const { id } = await params;

  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });

  if (!profile) {
    notFound();
  }

  return (
    <main>
      <EditProfileForm profileData={profile} />
    </main>
  );
};

export default editProfile;