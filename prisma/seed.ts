import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, Difficulty } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

let connectionString = process.env.DATABASE_URL || '';

// If connecting locally, forcefully strip any SSL mode from the URL string-eez
const isLocal =
  connectionString.includes('localhost') ||
  connectionString.includes('127.0.0.1') ||
  !connectionString;

if (isLocal) {
  // Strip sslmode parameters if present
  connectionString = connectionString.replace(/([?&])sslmode=[^&]*/, '');
  // Clean up dangling query params
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

const defaultTrails = [
  {
    name: 'Diamond Head',
    location: '4204 Diamond Head Road',
    difficulty: Difficulty.MODERATE,
    distance: 0.8,
    description: 'A popular hiking trail with scenic views of Waikiki.',
    image: '/diamond.head.jpg',
  },
  {
    name: 'Koko Head',
    location: '423 Kaumakani Street',
    difficulty: Difficulty.HARD,
    distance: 0.75,
    description: 'A steep climb with rewarding views at the top.',
    image: '/koko-head.jpg',
  },
  {
    name: 'Manoa Falls',
    location: '3860 Manoa Road',
    difficulty: Difficulty.EASY,
    distance: 0.8,
    description: 'A rainforest trail leading to a waterfall.',
    image: '/manoa-falls.jpg',
  },
];

const defaultEvents = [
  {
    id: 'summer-hiking-meetup',
    title: 'Summer Hiking Meetup',
    description: 'Join fellow hikers for a community hike at Manoa Falls. We will meet in the morning, hike together through the trail, and enjoy the scenery while connecting with other members of the hiking community. This event is open to hikers of all experience levels.',
    date: new Date('2026-07-30T09:00:00'),
    location: 'Manoa Falls',
    image: '/manoa-falls.jpg',
  },
  {
    id: 'trail-cleanup-day',
    title: 'Trail Cleanup Day',
    description: 'Help keep Hawaii trails beautiful with our cleanup event. Volunteers will work together to remove litter, maintain pathways, and help preserve the natural areas we enjoy. Bring water, comfortable shoes, and a willingness to help the community.',
    date: new Date('2026-08-15T09:00:00'),
    location: 'TBD',
    image: '/trail-cleanup.jpg',
  },
  {
    id: 'new-hiking-recommendations',
    title: 'New Hiking Recommendations',
    description: 'We added new trails and recommendations to explore. Check out our updated hiking collection featuring new locations, difficulty information, and recommendations for hikers looking for their next adventure.',
    date: new Date('2026-07-24T09:00:00'),
    location: 'Online',
    image: '/oblogo-better.png',
  },
];

const defaultGroups = [
  {
    id: 'ducks-default',
    name: 'Ducks',
    image: '/images/ducks.jpg',
    members: 3,
    maxmembers: 5,
    intensity: 'high',
    description: 'Looking to add a couple more members to our small group. We tend to go on more difficult hikes, so please only consider if you have more experience.',
    owner: 'john@foo.com',
    lastdate: new Date('2026-07-24T09:00:00'),
    lastlocation: 'Koko Head',
  },
  {
    id: 'math-hikes-default',
    name: 'Mathemagical Hikes',
    image: '/images/mathclub.jpeg',
    members: 10,
    maxmembers: null,
    intensity: 'easy',
    description: 'We go on hikes and talk about math. Please join if interested, we always welcome new members. Hikes typically range from relatively easy to moderate.',
    owner: 'john@foo.com',
    lastdate: new Date('2026-07-24T09:00:00'),
    lastlocation: 'Manoa Falls',
  },
  {
    id: 'hnl-hiking-default=',
    name: 'HNL Hiking Club',
    image: '/images/hnlhike.jpeg',
    members: 55,
    maxmembers: null,
    intensity: 'moderate',
    description: 'We heard about this website and wanted to branch out. Our group number is bigger than what is listed but we have only included members that have profiles here. Always welcome more and every hike is a big crowd.',
    owner: 'john@foo.com',
    lastdate: new Date('2026-07-24T09:00:00'),
    lastlocation: 'Diamond Head',
  },
];

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  /*await Promise.all(
    config.defaultAccounts.map(async (account) => {
      const role = (account.role as Role) || Role.USER;
      console.log(`  Creating user: ${account.email} with role: ${role}`);

      return prisma.user.upsert({
        where: { email: account.email },
        update: {
          password,
        },
        create: {
          email: account.email,
          password,
          role,
        },
      });
    })
  );*/

  for (const account of config.defaultAccounts) {
  const role = (account.role as Role) || Role.USER;
  console.log(`  Creating user: ${account.email} with role: ${role}`);
  
  await prisma.user.upsert({
    where: { email: account.email },
    update: { password },
    create: { email: account.email, password, role },
  });
}

  /*for (const data of config.defaultData) {
    const condition = (data.condition || 'good') as Prisma.StuffCreateInput['condition'];
    console.log(`  Adding stuff: ${JSON.stringify(data)}`);
    await prisma.stuff.upsert({
      where: { id: config.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }*/

  for (const trail of defaultTrails) {
    console.log(`Adding trail: ${trail.name}`);

    await prisma.trail.upsert({
      where: {
        name: trail.name,
      },
      update: {},
      create: trail,
    });
  }

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

  for (const group of defaultGroups) {
    console.log(`Adding group: ${group.name}`);

    const groupData = {
      name: group.name,
      image: group.image ?? '/image/default-image-user.jpg',
      members: group.members ?? 1,
      maxmembers: group.maxmembers ?? null, // Explicitly set null if undefined
      intensity: group.intensity,
      description: group.description ?? 'hello',
      owner: group.owner ?? 'admin@foo.com',
      lastdate: group.lastdate,
      lastlocation: group.lastlocation,
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
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
