/**
 * Our seed.ts file imports seed data from defaultTrails, defaultEvents, defaultGroups, and defaultProfiles
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';
import { defaultTrails } from './seedData/defaultTrails';
import { defaultEvents } from './seedData/defaultEvents';
import { defaultGroups } from './seedData/defaultGroups';
import { defaultProfiles } from './seedData/defaultProfiles';

let connectionString = process.env.DATABASE_URL || '';

const isLocal =
  connectionString.includes('localhost') ||
  connectionString.includes('127.0.0.1') ||
  !connectionString;

/*vercel database gets picky if there isn't an ssl=required or ssl=verify-full
on the end of our database, but this is a bit painful to work with in a local setting.
Hence, this code turns that part off for the local machine*/
if (isLocal) {
  connectionString = connectionString.replace(/([?&])sslmode=[^&]*/, '');
  if (connectionString.endsWith('?') || connectionString.endsWith('&')) {
    connectionString = connectionString.slice(0, -1);
  }
}

console.log('Connecting with URL:', connectionString);

const pool = new Pool({
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  //seeding the default Users that are in settings.development.json
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
  
    await prisma.user.upsert({
      where: { email: account.email },
      update: { password },
      create: { email: account.email, password, role },
    });
  }

  //seeding the default Trails that are in defaultTrails.tsx
  for (const trail of defaultTrails) {
    console.log(`Adding trail: ${trail.name}`);

    await prisma.trail.upsert({
      where: {
        name: trail.name,
      },
      update: {
        location: trail.location,
        difficulty: trail.difficulty,
        distance: trail.distance,
        description: trail.description,
        image: trail.image,
      },
      create: trail,
    });
  }

  //seeding the default Events that are in defaultEvents.tsx
  for (const event of defaultEvents) {
    console.log(`Adding event: ${event.title}`);

    await prisma.event.upsert({
      where: {
        id: event.id,
      },
      update: {},
      create: event,
    });
  }

  //seeding the default Groups that are in defaultGroups.tsx
  for (const group of defaultGroups) {
    console.log(`Adding group: ${group.name}`);

    const groupData = {
      name: group.name,
      image: group.image ?? '/image/default-image-user.jpg',
      members: group.members ?? 1,
      maxmembers: group.maxmembers ?? null, // Explicitly set null if undefined
      intensity: group.intensity,
      description: group.description ?? 'hello',
      lastdate: group.lastdate,
      lastlocation: group.lastlocation,
      userId: group.userId,
    };

    await prisma.group.upsert({
      where: {
        id: group.id,
      },
      update: groupData,
      create: {
        id: group.id,
        ...groupData,
      },
    });
  }

  //seeding the default Profiles that are in defaultProfiles.tsx
  for (const profile of defaultProfiles) {
    console.log(`Adding profile: ${profile.name}`);

    const profileData = {
      name: profile.name,
      image: profile.image ?? '/image/default-image-user.jpg',
      summary: profile.summary,
      description: profile.description ?? 'hello',
      groupname: profile.groupname ?? null,
      descimage: profile.descimage ?? null,
      userId: profile.userId
    };

    await prisma.profile.upsert({
      where: {
        id: profile.id,
      },
      update: profileData,
      create: {
        id: profile.id,
        ...profileData,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
