'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import swal from 'sweetalert';
import { redirect, useRouter } from 'next/navigation';
import { addProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddProfileSchema, AddProfileFormData } from '@/lib/validationSchemas';

const AddProfileForm: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProfileFormData>({
    resolver: yupResolver(AddProfileSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const onSubmit = async (data: AddProfileFormData) => {
    // Make sure we have the user's ID from the active NextAuth session
    const userId = session?.user?.id ? Number(session.user.id) : undefined;

    if (!userId) {
      swal('Error', 'Unable to identify current user. Please sign in again.', 'error');
      return;
    }

    try {
      const newProfile = await addProfile({
        name: data.name,
        image: data.image,
        description: data.description,
        groupname: data.groupname ?? null,
        summary: data.summary,
        descimage: data.descimage ?? null,
        userId: userId, // Linked to the authenticated user!
      });

      await swal('Success', 'Your profile has been created', 'success', {
        timer: 2000,
      });

      reset();
      router.push(`/profile/${newProfile.id}`);
      router.refresh();
    } catch (error) {
      console.error('Failed to create profile:', error);
      if (error instanceof Error) {
        if (error.message === 'PROFILE_EXISTS') {
          swal(
            'Profile Already Exists',
            'You already have a profile linked to this account.',
            'warning'
          );
        } else {
          swal('Error', error.message, 'error');
        }
      } else {
        swal('Error', 'An unexpected error occurred.', 'error');
      }
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={6}>
          <div className="text-center mb-4">
            <h2>Create Profile</h2>
          </div>
          <Card className="bg-white">
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control bg-white ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image URL (please use a square image)</Form.Label>
                  <input
                    type="text"
                    {...register('image')}
                    className={`form-control bg-white ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Summary</Form.Label>
                  <input
                    type="text"
                    {...register('summary')}
                    className={`form-control bg-white ${errors.summary ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.summary?.message}</div>
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

                <Form.Group className="mb-3">
                  <Form.Label>Group Name</Form.Label>
                  <input
                    type="text"
                    {...register('groupname')}
                    className={`form-control bg-white ${errors.groupname ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.groupname?.message}</div>
                </Form.Group>

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

export default AddProfileForm;
