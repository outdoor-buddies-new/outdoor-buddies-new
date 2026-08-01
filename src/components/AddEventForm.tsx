'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addEvent } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddEventSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: { title: string; description: string; date: Date }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addEvent({
    title: data.title,
    description: data.description,
    date: data.date,
  });
  swal('Success', 'Your event has been added', 'success', {
    timer: 2000,
  });
};

const AddEventForm: React.FC = () => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddEventSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  if (role !== 'ADMIN') {
    redirect('/announcements');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <h2 className="text-center">
            Create Event
          </h2>

          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>
                    Title
                  </Form.Label>
                  <input
                    type="text"
                    {...register('title')}
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">
                    {errors.title?.message}
                  </div>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>
                    Description
                  </Form.Label>
                  <textarea
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">
                    {errors.description?.message}
                  </div>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>
                    Event Date
                  </Form.Label>
                  <input
                    type="date"
                    {...register('date')}
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">
                    {errors.date?.message}
                  </div>
                </Form.Group>

                <Row className="pt-3">
                  <Col>
                    <Button type="submit">
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

export default AddEventForm;
