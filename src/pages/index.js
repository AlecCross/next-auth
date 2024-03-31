//pages/index.js

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return < >
            {console.log(session.user)}
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>

            <div>
                {session.user.name}
                <img
                    src={session.user.image}
                    alt={session.user.name}
                    width="96"
                    height="96"
                />
                <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width="96"
                    height="96"
                    layout="responsive"
                />
            </div>
        </>
    }
    return <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
    </>
}