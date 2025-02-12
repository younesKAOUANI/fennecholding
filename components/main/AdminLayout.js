'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function AdminLayout({ children }) {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <p className="text-center p-10">Loading...</p>
    }

    if (!session) {
        return <Login />
    }

    return (
        <div className="grid grid-cols-[200px_1fr] min-h-screen">
            {/* Sidebar */}
            <aside className="sticky top-0 py-6 border-r-2 shadow-lg h-screen w-[200px] bg-white flex flex-col">
                <h1 className="text-3xl font-bold text-center pb-6 mb-6 border-b-2 border-gray-500">
                    Dashboard <br /> Admin
                </h1>
                <nav>
                    <ul className="space-y-2">
                        <MenuItem href="/admin">Dashboard</MenuItem>
                        <MenuItem href="/admin/categories">Catégories</MenuItem>
                        <MenuItem href="/admin/products">Produits</MenuItem>
                    </ul>
                </nav>
                <button
                    className='w-full hover:bg-red-500 hover:text-white text-red-600 font-semibold text-xl px-4 py-2 mt-auto text-left'
                    onClick={() => signOut()}
                >Sign out</button>
            </aside>
            <main className="p-6 w-full bg-gray-100">{children}</main>
        </div>
    )
}

// Menu Item Component
const MenuItem = ({ href, children }) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <li className={`${isActive ? 'bg-primary text-white' : 'text-black'} hover:bg-primary hover:text-white text-lg font-semibold flex items-center gap-2`}>
            <Link className="w-full px-4 py-2" href={href}>
                {children}
            </Link>
        </li>
    )
}


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('email', email)
        console.log('password', password)
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (result?.error) {
            setError('Invalid email or password')
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    )
}

