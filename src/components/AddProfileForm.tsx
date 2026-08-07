'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect, useRouter } from 'next/navigation';
import { addProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddProfileSchema } from '@/lib/validationSchemas';

const onSubmit = async (profile: { name: string;
    image: string;
    description: string;
    groupname?: string | null;
    owner: string;
    summary: string;
    descimage?: string | null;
  }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addProfile({
      name: profile.name,
      image: profile.image,
      description: profile.description,
      groupname: profile.groupname ?? null,
      owner: profile.owner,
      summary: profile.summary,
      descimage: profile.descimage ?? null,
  });
  swal('Success', 'Your profile has been added', 'success', {
    timer: 2000,
  });
};

const AddProfileForm: React.FC = () => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddProfileSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  // Moved inside the component to use router transitions ...?
  /*const onSubmit = async (data: GroupFormData) => {
    try {
      await addGroup(data);
      await swal('Success', 'Your group has been added', 'success', {
        timer: 2000,
      });
      reset();
      router.push('/groups'); // Redirects to the main list
      router.refresh();       // Refreshes server data on the list page
    } catch (error) {
      console.error('Failed to save group:', error);
    }
  };*/

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
                  <Form.Label>Image URL</Form.Label>
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
