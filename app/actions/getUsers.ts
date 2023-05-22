import prisma from '@/app/libs/prismadb';
import getSession from './getSession';

const getUsers = async () => {
    const session = await getSession()

    if (!session?.user?.email) {
        return []
    }

    try {
        // find other users who are using messenger
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            // excluding our own account/email
            where: {
                NOT: {
                    email: session.user?.email
                }
            }
        })
        return users
    }
    catch (err) {
        return []
    }
}
export default getUsers