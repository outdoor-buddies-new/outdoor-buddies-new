/**
 * @fileoverview PostCard component renders one Note Card
 */

'use client';

import { useSession } from 'next-auth/react';
import { Card, Container } from 'react-bootstrap';

import { Note } from '@prisma/client';
import DeleteButtonPost from '@/components/DeleteButtonPost';

export default function Post({ post }: { post:Note }) {

  const { data: session } = useSession();

  const role = session?.user?.role;

  return (
    <Container fluid className="d-flex justify-content-center align-items-center px-0 w-100">
      <Card className="post-card shadow-sm bg-white">
        <Card.Header className="bg-transparent border-0 pt-3">
          <Card.Text>
            Title: {post.title}
          </Card.Text>
        </Card.Header>
        <Card.Body className= "text-center pt-0">
          <Card.Text>
            {post.description}
          </Card.Text>
        </Card.Body>
        {role === 'ADMIN' &&
        <Card.Footer>
          <DeleteButtonPost noteId={post.id} />
        </Card.Footer>
        }
      </Card>
    </Container>
  );
}
