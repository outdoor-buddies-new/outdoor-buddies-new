'use client';

import { Group } from '@prisma/client';
import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { editGroup } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EditGroupSchema } from '@/lib/validationSchemas';

type EditGroupFormData = InferType<typeof EditGroupSchema>;

interface EditGroupFormProps {
  groupData: Group;
}

const onSubmit = async (data: EditGroupFormData, groupData: Group) => {
  await editGroup({
    id: data.id,
    name: data.name,
    image: data.image,
    members: data.members,
    maxmembers: data.maxmembers ?? null,
    intensity: data.intensity,
    description: data.description ?? "",
    owner: data.owner,
  });

  swal('Success', 'Your event has been edited', 'success', {
    timer: 2000,
  });
};

const EditGroupForm: React.FC<EditGroupFormProps> = ({ groupData }) => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: yupResolver(EditGroupSchema),
  defaultValues: {
    id: groupData.id,
    name: groupData.name,
    image: groupData.image,
    members: groupData.members,
    maxmembers: groupData.maxmembers ?? null,
    intensity: groupData.intensity,
    description: groupData.description,
    owner: groupData.owner,
  },
});
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  /*if (role !== 'ADMIN') {
    redirect('/announcements'); fix later maybe
  }*/

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <h2 className="text-center">
            Edit Profile
          </h2>

          <Card className="bg-white">
            <Card.Body>
              <Form onSubmit={handleSubmit((data) => onSubmit(data, groupData))}>
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
                  <Form.Label>Members</Form.Label>
                  <input
                    type="number"
                    {...register('members')}
                    className={`form-control bg-white ${errors.members ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.members?.message}</div>
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

export default EditGroupForm;