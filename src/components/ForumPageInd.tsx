/**
 * @fileoverview ForumPageInd component where User can view all Post Cards associated with a Group
 * User: Can create a Post Card through: AddPostForm in groups/[id]/forum/add
 * User.Admin: Can delete Post Cards through: DeleteButtonPost in components on Post Card
 */

'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button, Row, Col, Container} from 'react-bootstrap';

import { Note, Group } from '@prisma/client';
import PostCard from '@/components/PostCard';
import LoadingSpinner from '@/components/LoadingSpinner';

type NoteWithGroup = Note & { group?: Group };

interface ForumProps {
  group: Group;
  posts: NoteWithGroup[];
}

const Forum: React.FC<ForumProps> = ({ group, posts }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  if (!session?.user?.id) {
    console.error('User is not logged in or user ID is missing.');
    return;
  }

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h1 className="mb-0 title-font">
            {group.name} Forum
          </h1>
        </Col>

        <Col className="text-end">
          <Button href={`/groups/${group.id}/forum/add`} className="page-button">
            Create Post
          </Button>
        </Col>
      </Row>

      <p className="mb-4">
        Ask Questions
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <p>No posts in this forum yet. Be the first to start a conversation!</p>
        </div>
      ) : (
        <Row xs={1} md={1} lg={1} className="g-4 justify-content-center">
          {posts.map((note) => (
            <Col key={note.id} className="d-flex justify-content-center">
                <PostCard post={note} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Forum;
