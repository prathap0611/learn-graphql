import { Context } from './context';
import { Resolvers, Employee } from 'src/generated/graphql';

// Provide resolver functions for your schema fields
export const resolvers: Resolvers = {
    Query: {
        hello: (): string => 'Hello world!',
        employees: async (_, __, context: Context): Promise<Employee[]> => {
            const allEmployees = await context.prisma.employees.findMany({
                include: {
                    departments: true,
                    designations: true,
                },
            });
            return allEmployees.map(
                ({
                    id,
                    name,
                    email,
                    departments,
                    designations,
                    location,
                }): Employee => ({
                    id: id.toString(),
                    name,
                    email,
                    department: departments.name,
                    designation: designations.name
                })
            );
        },
    },
};
