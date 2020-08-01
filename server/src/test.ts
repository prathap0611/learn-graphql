import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const allUsers = await prisma.employees.findMany({
        include: {
            designations: true,
            departments: true,
            employees: true
        }
    });
    console.dir(allUsers, { depth: null });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.disconnect();
    });