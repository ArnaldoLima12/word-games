'use client'
import { signOut} from 'next-auth/react';

export default function ButtonLogout()
{
    return (

        <button className='text-white bg-blue-400 p-2 rounded-md' onClick={() => signOut()}>Logout</button>
    )
}