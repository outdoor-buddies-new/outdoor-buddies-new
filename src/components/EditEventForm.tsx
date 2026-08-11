/**
 * @fileoverview EditEventForm component where User.Admin can edit a Event
 * This file handles User.Admin inputs for Event revision
 */

'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import swal from 'sweetalert';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import { Event } from '@prisma/client';
import { editEvent } from '@/lib/dbActions';
import { EditEventSchema } from '@/lib/validationSchemas';
import LoadingSpinner from '@/components/LoadingSpinner';

interface EditEventFormProps {
  eventData: Event;
}

const onSubmit = async (data: { title: string; description: string; date: string }, eventData: Event) => {
  await editEvent({
    id: eventData.id,
    title: data.title,
    description: data.description,
    date: new Date(data.date),
  });

  swal('Success', 'Your event has been edited', 'success', {
    timer: 2000,
  });
};

const EditEventForm: React.FC<EditEventFormProps> = ({ eventData }) => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
    date: string;
  }>({
    resolver: yupResolver(EditEventSchema),
    defaultValues: {
      title: eventData.title,
      description: eventData.description ?? '',
      date: eventData.date.toISOString().split('T')[0],
    },
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
          <h2 className="text-center title-font">
            Edit Event
          </h2>

          <Card className="bg-white">
            <Card.Body>
              <Form onSubmit={handleSubmit((data) => onSubmit(data, eventData))}>
                <Form.Group>
                  <Form.Label>
                    Title
                  </Form.Label>
                  <input
                    type="text"
                    {...register('title')}
                    className={`form-control bg-white ${errors.title ? 'is-invalid' : ''}`}
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
                    className={`form-control bg-white ${errors.description ? 'is-invalid' : ''}`}
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
                    className={`form-control bg-white ${errors.date ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">
                    {errors.date?.message}
                  </div>
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

export default EditEventForm;
