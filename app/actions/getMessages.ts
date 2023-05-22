import prisma from "@/app/libs/prismadb"

const getMessages = async (conversationId: string) => {
    const messages = await prisma.message.findMany({
        where: {
            conversationId: conversationId
        },
        include: {
            sender: true,
            seen: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
    return messages
}
export default getMessages