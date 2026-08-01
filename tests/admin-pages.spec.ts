import { test, expect } from './auth-utils';

test.slow();

test('test admin access to event management', async ({ getUserPage }) => {
  // Authenticate as admin
  const adminPage = await getUserPage('admin@foo.com', 'changeme');

  // Navigate home
  await adminPage.goto('http://localhost:3000/');

  // Confirm logged in
  await expect(
    adminPage.getByRole('button', { name: 'admin@foo.com' })
  ).toBeVisible({ timeout: 10000 });

  // Check navigation links
  await expect(
    adminPage.getByRole('link', { name: 'Announcements' })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByRole('link', { name: 'Hike Recommendation' })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByRole('link', { name: 'Groups' })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByRole('link', { name: 'Profiles' })
  ).toBeVisible({ timeout: 5000 });

  // Test add event page
  await adminPage.goto('http://localhost:3000/announcements/add');

  await expect(
    adminPage.getByRole('heading', { name: 'Create Event' })
  ).toBeVisible({ timeout: 5000 });

  // Test edit event page
  await adminPage.goto(
    'http://localhost:3000/announcements/edit/summer-hiking-meetup',
    { waitUntil: 'networkidle' }
  );

  await expect(
    adminPage.getByRole('heading', { name: 'Edit Event' })
  ).toBeVisible({ timeout: 5000 });
});