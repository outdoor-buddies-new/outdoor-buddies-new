'use server';

import { Condition } from '@prisma/client';
import { Stuff } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

/**
 * Adds a new group  to the database.
 * @param group, an object with the following properties: id, name, description, image, members
 */
export async function addGroup(group: { name: string; image: string; members: number; maxmembers?: number | null; intensity: string; description: string; owner: string; }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.group.create({
    data: {
      name: group.name,
      image: group.image,
      members: group.members,
      maxmembers: group.maxmembers ?? null,
      intensity: group.intensity,
      description: group.description ?? null,
      owner: group.owner,
    },
  });
  redirect('/groups');
}

export async function editGroup(group: {id: string; name: string; image: string; members: number; maxmembers?: number | null; intensity: string; description: string; owner: string; }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.group.update({
    where: { id: group.id },
    data: {
      name: group.name,
      image: group.image,
      members: group.members,
      maxmembers: group.maxmembers ?? null,
      intensity: group.intensity,
      description: group.description ?? null,
      owner: group.owner,
    },
  });
  redirect('/groups');
}

/**
 * Edits an existing group in the database.
 * @param group, an object with the following properties: id, name, description, image, members
 */
/*export async function editProfile(profile: Profile) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.group.update({
    where: { id: profile.id },
    data: {
      name: profile.name,
      description: profile.description,
      image: profile.image,
    },
  });
}*/

//do a delete profile/account but later
export async function getTrails() {
  return prisma.trail.findMany();
}

/**
 * Gets all events from the database.
 */
export async function getEvents() {
  return prisma.event.findMany();
}

/**
 * Gets all groups from the database.
 */
export async function getGroups() {
  return prisma.group.findMany();
}

/**
 * Adds a new event to the database.
 * @param event, an object with the following properties: title, description, date.
 */
export async function addEvent(event: { title: string; description: string; date: Date; }) {
  await prisma.event.create({
    data: {
      title: event.title,
      description: event.description,
      date: event.date,
    },
  });
  redirect('/announcements');
}

/**
 * Edits an existing event in the database.
 * @param event, an object with the following properties: id, title, description, date.
 */
export async function editEvent(event: { id: string; title: string; description: string; date: Date }) {
  await prisma.event.update({
    where: { id: event.id },
    data: {
      title: event.title,
      description: event.description,
      date: event.date,
    },
  });
  redirect('/announcements');
}

export async function deleteEvent(id: string) {
  // console.log(`deleteEvent id: ${id}`);
  await prisma.event.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/announcements');
}

/**
 * Searches for trails based on a search term.
 * @param searchTerm, the term to search for.
 * @returns a list of trails matching the search term in name and location.
 */
export async function searchTrails(searchTerm: string) {
  return prisma.trail.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          location: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
  });
}

/**
 * Searches for groups based on a search term.
 * @param searchTerm, the term to search for.
 * @returns a list of groups matching the search term in name.
 */
export async function searchGroups(searchTerm: string) {
  return prisma.group.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
  });
}