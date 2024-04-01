//pages/protected-page.js

import { useSession, signOut, getSession } from "next-auth/react"

export default function ProtectedPage() {
    const { data: session } = useSession()

    return (
        <>
            <button onClick={() => signOut()}>Sign out</button>
            <div>
                {session?.user.name}
                <img
                    src={session?.user.image}
                    alt={session?.user.name}
                    width="96"
                    height="96"
                />
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const Admin_Email = process.env.Admin_Email;
    const userEmail = session?.user?.email
    console.log("userEmail ", userEmail)
    if (!session) {
        // Якщо користувач не авторизований, перенаправити на сторінку входу
        console.log("користувач не авторизований, перенаправити на сторінку входу")
        return {
            redirect: {
                destination: '/', // Вказати шлях до вашої сторінки авторизації
                permanent: false,
            },
        };
    }
    // Перевірка електронної адреси користувача
    if (userEmail && userEmail !== Admin_Email) {
        // Якщо електронна адреса не співпадає, перенаправити на сторінку заборони
        console.log("електронна адреса не співпадає, перенаправити на сторінку входу")
        return {
            redirect: {
                destination: '/', // Вказати шлях до сторінки заборони доступу
                permanent: false,
            },
        };
    }
    console.log("Admin_Email правильний")
    // Передаємо об'єкт сесії як prop у наш компонент
    return {
        props: {},
    };
}
