import Link from "next/link";

const menuItems = [
 { href: "/admin-panel/blogs", label: "Gestión Blogs" },
 { href: "/admin-panel/blogs/categorys", label: "Categorías" },
 { href: "/admin-panel/blogs/tags", label: "Tags" },
 { href: "/admin-panel/blogs/create-single", label: "Crear Blog" },
 { href: "/admin-panel/blogs/edit", label: "Editar Blogs" },
 { href: "/admin-panel/blogs/upload-all", label: "Subir Blogs" },
];

export default function BlogsAdminLayout({ children }: { children: React.ReactNode }) {
 return (
  <div className="flex flex-col min-h-screen">
   <nav className="flex gap-2 px-6 py-3 border-b bg-card">
    {menuItems.map((item) => (
     <Link
      key={item.href}
      href={item.href}
      className="text-sm px-3 py-2 rounded-md font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
     >
      {item.label}
     </Link>
    ))}
   </nav>
   <main className="flex-1 p-6">{children}</main>
  </div>
 );
}