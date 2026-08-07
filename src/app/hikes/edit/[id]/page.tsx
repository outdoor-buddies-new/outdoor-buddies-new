import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditHikeForm from '@/components/EditHikeForm';

interface EditHikePageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditHikePage = async ({ params }: EditHikePageProps) => {
  const { id } = await params;

  const trail = await prisma.trail.findUnique({
    where: {
      id,
    },
  });

  if (!trail) {
    notFound();
  }

  return (
    <main>
      <EditHikeForm trail={trail} />
    </main>
  );
};

export default EditHikePage;