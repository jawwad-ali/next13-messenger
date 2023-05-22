import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client"

const useOtherUser = (conversation: FullConversationType | { user: User[] }) => {
    const session = useSession()

    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email

        const otherUser = conversation.user?.filter((u) => u.email !== currentUserEmail)
        return otherUser[0]

    }, [session?.data?.user?.email, conversation.user])
    return otherUser
}

export default useOtherUser