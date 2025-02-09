import Link from 'next/link'
import { useRouter } from 'next/router'

export default function AdminLayout({ children }) {
    return (
        <div className="grid grid-cols-[200px_1fr] min-h-screen">
            {/* Sidebar */}
            <aside className="sticky top-0 py-6 border-r-2 shadow-lg h-screen w-[200px] bg-white">
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
            </aside>

            {/* Main Content */}
            <main className="p-6 w-full bg-gray-100">{children}</main>
        </div>
    )
}

// Menu Item Component
const MenuItem = ({ href, children }) => {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
        <li className={`${isActive ? 'bg-primary text-white' : 'text-black'} hover:bg-primary hover:text-white  text-lg font-semibold flex items-center gap-2`}>
            <Link className='w-full px-4 py-2' href={href}>{children}</Link>
        </li>
    )
}
