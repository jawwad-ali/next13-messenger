import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await req.json()
        const { image, conversationId, message } = body

        if (!currentUser?.id || !currentUser?.email) {
            return new Response('Unathorized Message', { status: 401 })
        }

        const newMessage = prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seen: true,
                sender: true
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: (await newMessage)?.id
                    }
                }
            },
            include: {
                user: true,
                messages: {
                    include: { seen: true }
                }
            }
        })
        return NextResponse.json(newMessage) 
    }
    catch (err) {
        console.log(err)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
// 4.50.24