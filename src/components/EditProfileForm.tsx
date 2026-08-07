'use client';

import { Profile } from '@prisma/client';
import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { editProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EditProfileSchema } from '@/lib/validationSchemas';

type EditProfileFormData = InferType<typeof EditProfileSchema>;

interface EditProfileFormProps {
  profileData: Profile;
}

const onSubmit = async (data: EditProfileFormData, profileData: Profile) => {
  await editProfile({
    id: profileData.id,
    name: data.name,
    image: data.image,
    description: data.description,
    groupname: data.groupname,
    owner: data.owner,
    summary: data.summary,
    descimage: data.descimage,
  });

  swal('Success', 'Your event has been edited', 'success', {
    timer: 2000,
  });
};

const EditProfileForm: React.FC<EditProfileFormProps> = ({ profileData }) => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: yupResolver(EditProfileSchema),
    defaultValues: {
      id: profileData.id,
      name: profileData.name,
      image: profileData.image,
      description: profileData.description,
      groupname: profileData.groupname ?? null,
      owner: profileData.owner,
      summary: profileData.summary,
      descimage: profileData.descimage ?? null,
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
              <Form onSubmit={handleSubmit((data) => onSubmit(data, profileData))}>
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

export default EditProfileForm;