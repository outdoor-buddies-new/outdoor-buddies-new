import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ForumPageInd from '@/components/ForumPageInd';

interface ForumPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ForumPage({ params }: ForumPageProps) {
  const { id } = await params;

  const group = await prisma.group.findUnique({
    where: { id: id },
  });

  if (!group) {
    notFound();
  }

  const posts = await prisma.note.findMany({
    where: { groupId: id },
    include: {
      group: true,
    },
  });

  return(
  <ForumPageInd group={group} posts={posts} />
    );
}