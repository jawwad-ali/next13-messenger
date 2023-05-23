import getCurrentUser from "@/app/actions/getCurrentUser"

import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"

interface IParams {
    conversationId: string
}

export async function POST(req: Request, { params }: { params: IParams }) {
    try {
        const currentUser = await getCurrentUser()
        const {
            conversationId
        } = params;

        if (!currentUser?.id || currentUser?.email) {
            return new NextResponse('Unathorized', { status: 401 })
        }

        const conversation = await prisma?.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                user: true
            }
        })

        if (!conversation) return new NextResponse('Invalid ID', { status: 400 })

        const lastMessage = conversation.messages[conversation.messages.length - 1]

        if (!lastMessage) return NextResponse.json(conversation)

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })

    }
    catch (err) {
        console.log(err, 'ERROR MESSAGES SEEN')
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
// 5.20.27