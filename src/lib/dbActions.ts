'use server';

import { Condition, Stuff, Difficulty } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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
export async function addGroup(group: {
    name: string;
    image: string;
    members: number;
    maxmembers?: number | null;
    intensity: string;
    description: string;
    owner: string;
  }) {
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
      user: {
        connect: { id: profile }, // or email: profile.owner
      },
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
    },
  });
  redirect('/groups');
}

/**
 * Adds a new group  to the database.
 * @param profile, an object with the following properties: id, name, description, image, members
 */
export async function addProfile(profile: {
    name: string;
    image: string;
    description: string;
    groupname?: string | null;
    summary: string;
    descimage?: string | null;
    userId: number;
  }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  const existingProfile = await prisma.profile.findFirst({
    where: { userId: profile.userId },
  });

  if (existingProfile) {
    throw new Error('PROFILE_EXISTS');
  }
  const newProfile = await prisma.profile.create({
    data: {
      name: profile.name,
      image: profile.image,
      description: profile.description,
      groupname: profile.groupname ?? null,
      summary: profile.summary,
      descimage: profile.descimage ?? null,
      userId: profile.userId,
    },
  });
  return newProfile;
}

/**
 * Edits an existing profile in the database.
 * @param profile, an object with the following properties: id, title, description, date
 */
export async function editProfile(profile: {
    id: string;
    name: string;
    image: string;
    description: string;
    groupname?: string | null;
    summary: string;
    descimage?: string | null; }) {
  await prisma.profile.update({
    where: { id: profile.id },
    data: {
      name: profile.name,
      image: profile.image,
      description: profile.description,
      groupname: profile.groupname ?? null,
      summary: profile.summary,
      descimage: profile.descimage ?? null,
    },
  });
  redirect(`/profile/${profile.id}`);
}

export async function deleteProfile(id: string) {
  // console.log(`deleteProfile id: ${id}`);
  await prisma.profile.delete({
    where: { id },
  });
  revalidatePath('/profile');
  revalidatePath(`/profile/${id}`);
  redirect('/profile');
}

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
 * Gets all profiles from the database.
 */
export async function getProfiles() {
  return prisma.profile.findMany();
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
 * Adds a new event to the database.
 * @param event, an object with the following properties: title, description, date.
 */
export async function addHike(trail: { name: string; location: string; description: string; difficulty: Difficulty; distance: number; image: string }) {
  await prisma.trail.create({
    data: {
      name: trail.name,
      location: trail.location,
      description: trail.description,
      difficulty: trail.difficulty,
      distance: trail.distance,
      image: trail.image,
    },
  });
  redirect('/hikes');
}

/**
 * Edits an existing event in the database.
 * @param event, an object with the following properties: id, title, description, date.
 */
export async function editHike(trail: { id: string; name: string; location: string; description: string; difficulty: Difficulty; distance: number; image: string }) {
  await prisma.trail.update({
    where: { id: trail.id },
    data: {
      name: trail.name,
      location: trail.location,
      description: trail.description,
      difficulty: trail.difficulty,
      distance: trail.distance,
      image: trail.image,
    },
  });
  redirect('/hikes');
}

export async function deleteHike(id: string) {
  // console.log(`deleteHike id: ${id}`);
  await prisma.trail.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/hikes');
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

/**
 * Searches for groups based on a search term.
 * @param searchTerm, the term to search for.
 * @returns a list of groups matching the search term in name.
 */
export async function searchProfiles(searchTerm: string) {
  return prisma.profile.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          summary: {
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
        {
          groupname: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
  });
}
