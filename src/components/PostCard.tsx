'use client';

import { Card, Form, Container } from 'react-bootstrap';
import { Note } from '@prisma/client';
import Link from 'next/link';

export default function Post({ post }: { post:Note }) {
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
    </Card>
    </Container>
  );
}