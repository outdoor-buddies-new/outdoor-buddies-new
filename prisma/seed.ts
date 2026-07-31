import { Prisma, PrismaClient, Role, Difficulty } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; // <--- Add this import
import pg from 'pg';                          // <--- Add this import
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

// Initialize the native pg driver pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
// Wrap it in the Prisma Driver Adapter
const adapter = new PrismaPg(pool);
// Pass the adapter into the Prisma Client constructor
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

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  
  config.defaultAccounts.forEach(async (account) => {
    const role = (account.role as Role) || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
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
  });

  for (const data of config.defaultData) {
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
  }

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
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });