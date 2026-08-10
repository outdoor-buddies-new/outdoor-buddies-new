'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect, useRouter, useParams } from 'next/navigation'; // 1. Import useParams
import { addNote } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddNoteSchema, AddPostFormData } from '@/lib/validationSchemas';

const AddPostForm: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams(); // 2. Initialize params hook
  
  // 3. Extract the group ID from the URL (adjust 'id' if your folder is named [groupId])
  const groupId = params.id as string; 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPostFormData>({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: {
      title: '',
      description: '',
      groupId: groupId,
    },
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const onSubmit = async (data: AddPostFormData) => {
    const userId = session?.user?.id ? Number(session.user.id) : undefined;

    if (!userId) {
      swal('Error', 'Unable to identify current user. Please sign in again.', 'error');
      return;
    }

    if (!groupId) {
      swal('Error', 'Missing group ID from the URL context.', 'error');
      return;
    }

    try {
      const newPost = await addNote({
        title: data.title,
        description: data.description,
        userId: userId,
        groupId: groupId,
      });

      await swal('Success', 'Your post has been created', 'success', {
        timer: 2000,
      });

      reset();
      router.push(`/groups/${groupId}/forum`); 
      router.refresh();
    } catch (error) {
      console.error('Failed to create post:', error);
      swal('Error', 'Something went wrong while creating the post.', 'error');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={6}>
          <div className="text-center mb-4">
            <h2>Create Post</h2>
          </div>
          <Card className="bg-white">
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))}>
                
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <input
                    type="text"
                    {...register('title')}
                    className={`form-control bg-white ${errors.title ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.title?.message}</div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    className={`form-control bg-white ${errors.description ? 'is-invalid' : ''}`}
                    rows={3}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('groupId')} value={groupId} />

                <Row className="pt-3">
                  <Col>
                    <Button type="submit" className="page-button">
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      onClick={() => reset()}
                      variant="warning"
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPostForm;