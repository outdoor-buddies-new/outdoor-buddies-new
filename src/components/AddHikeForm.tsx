'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addHike } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddHikeSchema } from '@/lib/validationSchemas';
import { Difficulty } from '@prisma/client';

type AddHikeFormData = {
  name: string;
  location: string;
  description: string;
  difficulty: Difficulty;
  distance: number;
  image: string;
};

// Sends validated form data to the server action,
// which creates a new Trail record in Prisma.
const onSubmit = async (data: AddHikeFormData) => {
  await addHike({
    name: data.name,
    location: data.location,
    description: data.description,
    difficulty: data.difficulty,
    distance: data.distance,
    image: data.image,
  });
  swal('Success', 'Your hike has been added', 'success', {
    timer: 2000,
  });
};

/**
 * Form component for administrators to add new hiking trails.
 * Uses React Hook Form with Yup validation and submits data
 * through the server-side addHike database action.
 */
const AddHikeForm: React.FC = () => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddHikeFormData>({
    resolver: yupResolver(AddHikeSchema),
  });
  // Only authenticated administrators can access trail creation.
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  if (role !== 'ADMIN') {
    redirect('/hikes');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <h2 className="text-center mb-4 title-font">
            Create Hike
          </h2>

          <Card className="bg-white">
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label htmlFor="name">
                        Hike Name
                      </Form.Label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Enter hike name"
                        {...register('name')}
                        className={`form-control bg-white ${errors.name ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">
                        {errors.name?.message}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label htmlFor="location">
                        Location
                      </Form.Label>
                      <input
                        id="location"
                        type="text"
                        placeholder="Ex. 1234 Place St."
                        {...register('location')}
                        className={`form-control bg-white ${errors.location ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">
                        {errors.location?.message}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mt-3">
                  <Form.Label htmlFor="description">
                    Description
                  </Form.Label>
                  <textarea
                    id="description"
                    placeholder="Tell us about the hike, what to expect, and any other details. (Dangers, wildlife, rules, what to bring)"
                    {...register('description')}
                    className={`form-control bg-white ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">
                    {errors.description?.message}
                  </div>
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mt-3">
                      <Form.Label htmlFor="distance">
                        One-Way Distance (miles)
                      </Form.Label>

                      <input
                        id="distance"
                        type="number"
                        step="0.1"
                        {...register('distance', { valueAsNumber: true })}
                        className={`form-control bg-white ${errors.distance ? 'is-invalid' : ''}`}
                      />

                      <div className="invalid-feedback">
                        {errors.distance?.message}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mt-3">
                      <Form.Label>
                        Difficulty
                      </Form.Label>

                      <Form.Select {...register('difficulty')}>
                        <option value="EASY">Easy</option>
                        <option value="MODERATE">Moderate</option>
                        <option value="HARD">Hard</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mt-3">
                  <Form.Label>
                    Image URL
                  </Form.Label>

                  <input
                    id="image"
                    type="text"
                    {...register('image')}
                    className="form-control bg-white"
                  />
                </Form.Group>

                <Row className="pt-3">
                  <Col>
                    <Button type="submit" className="admin-button">
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

export default AddHikeForm;
