'use client';

import { Profile } from '@prisma/client';
import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import swal from 'sweetalert';
import { redirect, useRouter } from 'next/navigation';
import { editProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EditProfileSchema } from '@/lib/validationSchemas';

type EditProfileFormData = InferType<typeof EditProfileSchema>;

interface EditProfileFormProps {
  profileData: Profile;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ profileData }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
  register,
  handleSubmit,
  reset,
  watch,
  formState: { errors },
} = useForm({
  resolver: yupResolver(EditProfileSchema),
  defaultValues: {
    id: profileData.id,
    name: profileData.name,
    image: profileData.image ?? '/images/default-image-user.jpg',
    description: profileData.description,
    groupname: profileData.groupname ?? '',
    summary: profileData.summary,
    descimage: profileData.descimage ?? '',
  },
});

  const watchedImage = watch('image');
  const watchedDescImage = watch('descimage');

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const onSubmit = async (data: EditProfileFormData, profileData: Profile) => {
  
  try {
  await editProfile({
    id: profileData.id,
    name: data.name,
    image: data.image,
    description: data.description,
    groupname: data.groupname,
    summary: data.summary,
    descimage: data.descimage,
  });

  swal('Success', 'Your event has been edited', 'success', {
    timer: 2000,
  });

  window.location.href = `/profile/${profileData.id}`;

  } catch(error) {
    console.error('Failed to update profile:', error);
    console.error("Database error updating profile:", error);
    throw new Error("Failed to update profile");
  } 
};

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <h2 className="text-center title-font">
            Edit Profile
          </h2>

          <Card className="bg-white">
            <Card.Body>
              <Form onSubmit={handleSubmit(
                (data) => onSubmit(data, profileData),
                (errors) => console.log('Validation Errors:', errors)
                )}
              >
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
                  {watchedImage && (
                                      <div className="mt-3 text-center">
                                        <Image 
                                          src={watchedImage} 
                                          alt="Profile Preview" 
                                          roundedCircle 
                                          style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                          onError={(e) => (e.currentTarget.style.display = 'none')}
                                          onLoad={(e) => (e.currentTarget.style.display = 'inline-block')}
                                        />
                                      </div>
                                    )}
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
                  <Form.Label>Description Image URL</Form.Label>
                  <input
                    type="text"
                    {...register('descimage')}
                    className={`form-control bg-white ${errors.descimage ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.descimage?.message}</div>
                  {watchedDescImage && (
                    <div className="mt-3 text-center">
                      <Image 
                        src={watchedDescImage} 
                        alt="Description Preview" 
                        fluid 
                        style={{ maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                        onLoad={(e) => (e.currentTarget.style.display = 'inline-block')}
                      />
                    </div>
                  )}
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