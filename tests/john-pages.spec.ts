import { test, expect } from './auth-utils';

test.slow();

test('test user access to available pages', async ({ getUserPage }) => {
  // Authenticate as a regular user
  const userPage = await getUserPage('john@foo.com', 'changeme');

  // Navigate home
  await userPage.goto('http://localhost:3000/');

  // Confirm logged in
  await expect(
    userPage.getByRole('button', { name: 'john@foo.com' })
  ).toBeVisible({ timeout: 10000 });

  // Check navigation links
  await expect(
    userPage.getByRole('link', { name: 'Announcements' })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    userPage.getByRole('link', { name: 'Hike Recommendation' })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    userPage.getByRole('link', { name: 'Groups' })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    userPage.getByRole('link', { name: 'Profiles' })
  ).toBeVisible({ timeout: 5000 });

  // Test Announcements page
  await userPage.goto('http://localhost:3000/announcements');

  await expect(
    userPage.getByRole('heading', { name: 'Announcements & Events' })
  ).toBeVisible({ timeout: 5000 });

  // Test Hike Recommendations page
  await userPage.goto('http://localhost:3000/hikes');

  await expect(
    userPage.getByRole('heading', { name: 'Hiking Recommendations' })
  ).toBeVisible({ timeout: 5000 });

  // Test Hike Recommendations search
  await userPage.goto('http://localhost:3000/hikes');

  await expect(
    userPage.getByRole('heading', { name: 'Hiking Recommendations' })
  ).toBeVisible({ timeout: 5000 });

  const searchBox = userPage.getByPlaceholder('Find your place');

  await searchBox.fill('Manoa');

  await userPage.getByRole('button', { name: 'Search' }).click();

  await expect(
    userPage.getByText('Manoa Falls')
  ).toBeVisible({ timeout: 5000 });
});
