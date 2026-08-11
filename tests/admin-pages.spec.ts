import { test, expect } from './auth-utils';

test.slow();

test('test admin access to hike and event management', async ({ getUserPage }) => {
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

  // Test add hike page
  await adminPage.goto('http://localhost:3000/hikes/add');

  await expect(
    adminPage.getByRole('heading', { name: 'Create Hike' })
  ).toBeVisible({ timeout: 5000 });

  // Ensure fields and buttons exist (hike)

  await expect(
    adminPage.getByLabel('Hike Name')
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByLabel('Location')
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByLabel('Description')
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByLabel('One-Way Distance (miles)')
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByLabel('Difficulty')
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByLabel('Image URL')
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByRole('button', { name: 'Submit' })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    adminPage.getByRole('button', { name: 'Reset' })
  ).toBeVisible({ timeout: 5000 });

  // Add some data to test reset

  await adminPage.getByLabel('Hike Name').fill('Playwright Test Hike');

  await adminPage.getByLabel('Location').fill('Manoa, Oahu');

  await adminPage.getByLabel('Description').fill(
    'This hike was created by the admin Playwright test.'
  );

  await adminPage.getByLabel('One-Way Distance (miles)').fill('1.5');

  await adminPage.getByLabel('Difficulty').selectOption('MODERATE');

  await adminPage.getByLabel('Image URL').fill(
    'https://t3.ftcdn.net/jpg/03/48/91/92/360_F_348919233_S2C1VQ5xbJQCzIDkSJ20lBHQiLX9DYvW.jpg'
  );

  // Test Reset Button

  await adminPage.getByRole('button', { name: 'Reset' }).click();

  await expect(
    adminPage.getByLabel('Hike Name')
  ).toHaveValue('');

  await expect(
    adminPage.getByLabel('Location')
  ).toHaveValue('');

  await expect(
    adminPage.getByLabel('Description')
  ).toHaveValue('');

  await expect(
    adminPage.getByLabel('One-Way Distance (miles)')
  ).toHaveValue('');

  await expect(
    adminPage.getByLabel('Difficulty')
  ).toHaveValue('EASY');

  await expect(
    adminPage.getByLabel('Image URL')
  ).toHaveValue('');  

  // Add the data back and submit
  await adminPage.getByLabel('Hike Name').fill('Playwright Test Hike');
  await adminPage.getByLabel('Location').fill('Manoa, Oahu');
  await adminPage.getByLabel('Description').fill(
    'This hike was created by the admin Playwright test.'
  );
  await adminPage.getByLabel('One-Way Distance (miles)').fill('1.5');
  await adminPage.getByLabel('Difficulty').selectOption('MODERATE');
  await adminPage.getByLabel('Image URL').fill(
    'https://t3.ftcdn.net/jpg/03/48/91/92/360_F_348919233_S2C1VQ5xbJQCzIDkSJ20lBHQiLX9DYvW.jpg'
  );
  await adminPage.getByRole('button', { name: 'Submit' }).click();

  // Give the server action time to finish
  await adminPage.waitForTimeout(1000);

  // Go to the hikes page
  await adminPage.goto('http://localhost:3000/hikes', {
    waitUntil: 'domcontentloaded',
  });

  // Ensure the data got added
  await expect(
    adminPage.getByText('Playwright Test Hike')
  ).toBeVisible({ timeout: 10000 });

  // Test edit hike page
  const hikeCard = adminPage.locator('.card').filter({
    hasText: 'Playwright Test Hike',
  }).first();

  await expect(hikeCard).toBeVisible({ timeout: 5000 });

  // Confirm Edit button exists
  await expect(
    hikeCard.getByRole('button', { name: 'Edit' })
  ).toBeVisible({ timeout: 5000 });

  // Open the edit page
  await hikeCard.getByRole('button', { name: 'Edit' }).click();

  // Confirm Edit Hike page loaded
  await expect(
    adminPage.getByRole('heading', { name: 'Edit Hike' })
  ).toBeVisible({ timeout: 5000 });

  // Test Reset
  await adminPage.getByRole('button', { name: 'Reset' }).click();

  await expect(
    adminPage.getByLabel('Hike Name')
  ).toHaveValue('Playwright Test Hike');

  await expect(
    adminPage.getByLabel('Location')
  ).toHaveValue('Manoa, Oahu');

  await expect(
    adminPage.getByLabel('Description')
  ).toHaveValue('This hike was created by the admin Playwright test.');

  await expect(
    adminPage.getByLabel('One-Way Distance (miles)')
  ).toHaveValue('1.5');

  await expect(
    adminPage.getByLabel('Difficulty')
  ).toHaveValue('MODERATE');

  await expect(
    adminPage.getByLabel('Image URL')
  ).toHaveValue('https://t3.ftcdn.net/jpg/03/48/91/92/360_F_348919233_S2C1VQ5xbJQCzIDkSJ20lBHQiLX9DYvW.jpg');  

  // Fill form with edited data and submit

  await adminPage.getByLabel('Hike Name').fill('Playwright Edited Hike');

  await adminPage.getByLabel('Location').fill('A Real Place');

  await adminPage.getByLabel('Description').fill(
    'This hike was edited by the admin Playwright test.'
  );

  await adminPage.getByLabel('One-Way Distance (miles)').fill('1.7');

  await adminPage.getByLabel('Difficulty').selectOption('HARD');

  await adminPage.getByLabel('Image URL').fill(
    'fake-image'
  );

  await adminPage.getByRole('button', { name: 'Save Changes' }).click();

  // Give the update time to finish
  await adminPage.waitForTimeout(1000);

  // Confirm the updates were made
  await adminPage.goto('http://localhost:3000/hikes', {
    waitUntil: 'domcontentloaded',
  });

  await expect(
    adminPage.getByText('Playwright Edited Hike')
  ).toBeVisible({ timeout: 10000 });

  const editedHikeCard = adminPage.locator('.card').filter({
    hasText: 'Playwright Edited Hike',
  }).first();

  await expect(editedHikeCard).toBeVisible({ timeout: 5000 });

  // Confirm Edit button exists (and go to page to delete)
  await expect(
    editedHikeCard.getByRole('button', { name: 'Edit' })
  ).toBeVisible({ timeout: 5000 });

  // Open the edit page
  await editedHikeCard.getByRole('button', { name: 'Edit' }).click();

  await expect(
    adminPage.getByRole('button', { name: 'Delete Hike' })
  ).toBeVisible({ timeout: 5000 });

  // Accept the delete confirmation
  adminPage.once('dialog', async dialog => {
    await dialog.accept();
  });

  // Delete the hike and confirm
  await adminPage.getByRole('button', { name: 'Delete Hike' }).click();

  await adminPage.goto('http://localhost:3000/hikes')

  await expect(
    adminPage.getByText('Playwright Edited Hike')
  ).not.toBeVisible({ timeout: 5000 });

  // Test add event page
  await adminPage.goto('http://localhost:3000/announcements/add');

  await expect(
    adminPage.getByRole('heading', { name: 'Create Announcement or Event' })
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

  // Give the server action time to finish
  await adminPage.waitForTimeout(1000);

  await adminPage.goto('http://localhost:3000/announcements', {
    waitUntil: 'domcontentloaded',
  });

  await expect(
    adminPage.getByText('Playwright Test Event').first()
  ).toBeVisible({ timeout: 10000 });

  // Test edit event page
  const eventCard = adminPage.locator('.card').filter({
    hasText: 'Playwright Test Event',
  }).first();

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
  ).toHaveValue('Playwright Test Event');

  await expect(
    adminPage.getByLabel('Description')
  ).toHaveValue('This event was created by the admin Playwright test.');

  await expect(
    adminPage.getByLabel('Event Date')
  ).toHaveValue('2026-08-20');

  // Fill form with edited data and submit

  await adminPage.getByLabel('Title').fill('Playwright Edited Event');

  await adminPage.getByLabel('Description').fill(
    'This event has been edited by the admin Playwright test.'
  );

  await adminPage.getByLabel('Event Date').fill('2026-08-25');

  await adminPage.getByRole('button', { name: 'Submit' }).click();

  // Give the update time to finish
  await adminPage.waitForTimeout(1000);

  // Go back to announcements page
  await adminPage.goto('http://localhost:3000/announcements', {
    waitUntil: 'domcontentloaded',
  });

  await expect(
    adminPage.getByText('Playwright Edited Event').first()
  ).toBeVisible({ timeout: 10000 });

  // Test edit event page

  // Test edit event page
  const editedEventCard = adminPage.locator('.card').filter({
    hasText: 'Playwright Edited Event',
  }).first();

  await expect(editedEventCard).toBeVisible({ timeout: 5000 });

  // Confirm Delete button exists
  await expect(
    editedEventCard.getByRole('button', { name: 'Delete Event' })
  ).toBeVisible({ timeout: 5000 });

  // Accept the delete confirmation
  adminPage.once('dialog', async dialog => {
    await dialog.accept();
  });

  // Delete the event and confirm
  await editedEventCard.getByRole('button', { name: 'Delete Event' }).click();

  await adminPage.waitForTimeout(1000);
  await adminPage.reload();

  await expect(
    adminPage.getByText('Playwright Edited Event').first()
  ).not.toBeVisible({ timeout: 5000 });
});