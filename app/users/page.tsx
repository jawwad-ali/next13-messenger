'use client'
import { signOut } from "next-auth/react"

const Users = () => {
  return (
    <div> 
         <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default Users
// 2.08.00