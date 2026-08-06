'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect, useRouter } from 'next/navigation';
import { addGroup } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddGroupSchema } from '@/lib/validationSchemas';

interface GroupFormData {
  name: string;
  image: string;
  description: string;
  members: number;
}

const AddGroupForm: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: yupResolver(AddGroupSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  // Moved inside the component to use router transitions
  const onSubmit = async (data: GroupFormData) => {
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
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={6}>
          <div className="text-center mb-4">
            <h1>Group Add Form</h1>
            <h2>Add a Group</h2>
          </div>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <input
                    type="text"
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Members</Form.Label>
                  <input
                    type="number"
                    {...register('members')}
                    className={`form-control ${errors.members ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.members?.message}</div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    rows={3}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary" className="w-100">
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button type="button" onClick={() => reset()} variant="warning" className="w-100">
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

export default AddGroupForm;