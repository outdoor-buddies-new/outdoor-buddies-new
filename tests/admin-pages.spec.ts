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
    adminPage.getByRole('link', { name: 'Hikes' })
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

  // Ensure fields and buttons exist

  await expect(
    adminPage.getByLabel('Title')
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByLabel('Description')
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByLabel('Event Date')
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByRole('button', { name: 'Submit' })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByRole('button', { name: 'Reset' })
  ).toBeVisible({ timeout: 5000 });

  // Add some data to test reset

  await adminPage.getByLabel('Title').fill('Playwright Test Event');

  await adminPage.getByLabel('Description').fill('This event was created by the admin Playwright test.');

  await adminPage.getByLabel('Event Date').fill('2026-08-20');

  await adminPage.getByRole('button', { name: 'Reset' }).click();

  await expect(
    adminPage.getByLabel('Title')
  ).toHaveValue('');

  await expect(
    adminPage.getByLabel('Description')
  ).toHaveValue('');

  await expect(
    adminPage.getByLabel('Event Date')
  ).toHaveValue('');

  // Fill out form, Submit, and ensure the data got added to the announcements page

  await adminPage.getByLabel('Title').fill('Playwright Test Event');

  await adminPage.getByLabel('Description').fill('This event was created by the admin Playwright test.');

  await adminPage.getByLabel('Event Date').fill('2026-08-20');

  await adminPage.getByRole('button', { name: 'Submit' }).click();

  await expect(
    adminPage.getByText('Your event has been added')
  ).toBeVisible({ timeout: 5000 });

  await adminPage.goto('http://localhost:3000/announcements');

  await expect(
    adminPage.getByText('Playwright Test Event')
  ).toBeVisible({ timeout: 5000 });

  // Test edit event page
  const eventCard = adminPage.locator('.card').filter({
    hasText: 'Playwright Test Event',
  });

  await expect(eventCard).toBeVisible({ timeout: 5000 });

  // Confirm Edit button exists
  await expect(
    eventCard.getByRole('button', { name: 'Edit' })
  ).toBeVisible({ timeout: 5000 });

  // Open the edit page
  await eventCard.getByRole('button', { name: 'Edit' }).click();

  // Confirm Edit Event page loaded
  await expect(
    adminPage.getByRole('heading', { name: 'Edit Event' })
  ).toBeVisible({ timeout: 5000 });

  // Test Reset
  await adminPage.getByRole('button', { name: 'Reset' }).click();

  await expect(
    adminPage.getByLabel('Title')
  ).toHaveValue('');

  await expect(
    adminPage.getByLabel('Description')
  ).toHaveValue('');

  await expect(
    adminPage.getByLabel('Event Date')
  ).toHaveValue('');
});