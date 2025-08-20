'use client'
import Link from 'next/link'
import { useRolePermissions } from '@/hooks/auth/useRolePermissions'
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
 DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, Settings, Users, FileEdit, Shield } from 'lucide-react'

interface AdminNavigationProps {
 userRole?: string
}

export function AdminNavigation({ userRole }: AdminNavigationProps) {
 const { hasPermission, hasRole } = useRolePermissions()

 // Si no tiene permisos administrativos, no mostrar nada
 if (!hasPermission('canAccessAdminPanel')) {
  return null
 }

 return (
  <DropdownMenu>
   <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm" className="gap-1">
     <Settings className="h-4 w-4" />
     Administración
     <ChevronDown className="h-4 w-4" />
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent align="end" className="w-48">

    {/* Panel principal de administración */}
    <DropdownMenuItem asChild>
     <Link href="/es/admin-panel" className="flex items-center gap-2">
      <Shield className="h-4 w-4" />
      Panel de Control
     </Link>
    </DropdownMenuItem>

    {/* Gestión de contenido - COLABORADOR y superiores */}
    {hasRole('COLABORADOR') && (
     <>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
       <Link href="/es/admin-panel/content" className="flex items-center gap-2">
        <FileEdit className="h-4 w-4" />
        Gestión de Contenido
       </Link>
      </DropdownMenuItem>
     </>
    )}

    {/* Gestión de usuarios - Solo ADMINISTRADOR y ROOT */}
    {hasRole('ADMINISTRADOR') && (
     <>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
       <Link href="/es/admin-panel/users" className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        Gestión de Usuarios
       </Link>
      </DropdownMenuItem>
     </>
    )}

    {/* Configuración del sistema - Solo ROOT */}
    {hasRole('ROOT') && (
     <>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
       <Link href="/es/admin-panel/system" className="flex items-center gap-2">
        <Settings className="h-4 w-4" />
        Configuración del Sistema
       </Link>
      </DropdownMenuItem>
     </>
    )}
   </DropdownMenuContent>
  </DropdownMenu>
 )
}