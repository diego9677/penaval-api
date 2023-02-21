import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "../src/helpers/auth";

const prisma = new PrismaClient();

async function main() {
  try {
    const userDb = await prisma.user.findFirst({ where: { username: 'Admin' } });
    if (!userDb) {
      const createdUserDb = await prisma.user.create({
        data: {
          username: 'Admin',
          password: await encryptPassword('Penaval123'),
          person: {
            create: {
              firstName: 'Penaval',
              lastName: 'Srl',
              phone: '73643689'
            }
          }
        }
      });
      return `User=${createdUserDb.id} created`;
    }
    return `User=${userDb.id} already exists`;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(console.log)
  .catch(console.log);