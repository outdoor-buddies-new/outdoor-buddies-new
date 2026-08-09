'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import Link from 'next/link';

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  if (status === 'loading') return null;
  const currentUser = session?.user?.email;
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/" className="navbar-side">
          <Image src="/images/oblogo-final.png" alt="Outdoor Buddies Logo" width={150}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto justify-content-center align-items-center text-white">
            <Nav.Link id="events-nav" href="/announcements" active={pathName === '/announcements'} className="px-4 navbar-main-link">
              Announcements
            </Nav.Link>

            <span className="navbar-divider">|</span>

            <Nav.Link id="hike-rec-nav" href="/hikes" active={pathName === '/hikes'} className="px-4 navbar-main-link">
              Hikes
            </Nav.Link>

            <span className="navbar-divider">|</span>

            <Nav.Link id="groups-nav" href="/groups" active={pathName === '/groups'} className="px-4 navbar-main-link">
              Groups
            </Nav.Link>

            <span className="navbar-divider">|</span>

            <Nav.Link id="profiles-nav" href="/profile" active={pathName === '/profile'} className="px-4 navbar-main-link">
              Profiles
            </Nav.Link>
          </Nav>
          <Nav className="navbar-side justify-content-end">
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <PersonFill />
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
