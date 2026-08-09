/*
'use client';

import { signIn } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

/** The sign in page.
const SignIn = () => {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    await signIn('credentials', {
      callbackUrl: '/announcements',
      email,
      password,
    });
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col xs={5}>
            <h1 className="text-center">Sign In</h1>
            <Card className="bg-white mt-4">
              <Card.Body>
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <input name="email" type="text" className="form-control bg-white" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <input name="password" type="password" className="form-control bg-white" />
                  </Form.Group>
                  <Button type="submit" className="mt-3">
                    Sign in
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer>
                Don&apos;t have an account?
                <a href="/auth/signup">Sign up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
*/

'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

/** The sign in page. */
const SignIn = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error('Sign-in failed:', result.error);
    } else {
      router.push('/announcements');
      router.refresh();
    }
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col xs={5}>
            <h1 className="text-center">Sign In</h1>
            <Card className="bg-white mt-4">
              <Card.Body>
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <input name="email" type="email" className="form-control bg-white" required />
                  </Form.Group>
                  <Form.Group className="mt-2" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <input name="password" type="password" className="form-control bg-white" required />
                  </Form.Group>
                  <Button type="submit" className="mt-3 w-100">
                    Sign in
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center">
                Don&apos;t have an account?{' '}
                <a href="/auth/signup">Sign up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;