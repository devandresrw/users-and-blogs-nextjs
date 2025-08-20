'use client'
import { useSession } from 'next-auth/react'

type Role = 'USER' | 'LECTOR' | 'COLABORADOR' | 'ADMINISTRADOR' | 'ROOT'

interface RolePermissions {
 canAccessAdminPanel: boolean
 canAccessProfile: boolean
 canAccessAccount: boolean
 canManageUsers: boolean
 canCreateContent: boolean
 canModerateContent: boolean
}

const ROLE_HIERARCHY: Record<Role, number> = {
 USER: 1,
 LECTOR: 2,
 COLABORADOR: 3,
 ADMINISTRADOR: 4,
 ROOT: 5
}

const PERMISSIONS: Record<Role, RolePermissions> = {
 USER: {
  canAccessAdminPanel: false,
  canAccessProfile: true,
  canAccessAccount: true,
  canManageUsers: false,
  canCreateContent: false,
  canModerateContent: false
 },
 LECTOR: {
  canAccessAdminPanel: false,
  canAccessProfile: true,
  canAccessAccount: true,
  canManageUsers: false,
  canCreateContent: false,
  canModerateContent: false
 },
 COLABORADOR: {
  canAccessAdminPanel: true,
  canAccessProfile: true,
  canAccessAccount: true,
  canManageUsers: false,
  canCreateContent: true,
  canModerateContent: false
 },
 ADMINISTRADOR: {
  canAccessAdminPanel: true,
  canAccessProfile: true,
  canAccessAccount: true,
  canManageUsers: true,
  canCreateContent: true,
  canModerateContent: true
 },
 ROOT: {
  canAccessAdminPanel: true,
  canAccessProfile: true,
  canAccessAccount: true,
  canManageUsers: true,
  canCreateContent: true,
  canModerateContent: true
 }
}

export function useRolePermissions() {
 const { data: session } = useSession()
 const userRole = (session?.user?.role as Role) || 'USER'

 const permissions = PERMISSIONS[userRole]
 const roleLevel = ROLE_HIERARCHY[userRole]

 const hasRole = (requiredRole: Role): boolean => {
  return roleLevel >= ROLE_HIERARCHY[requiredRole]
 }

 const hasPermission = (permission: keyof RolePermissions): boolean => {
  return permissions[permission]
 }

 return {
  userRole,
  roleLevel,
  permissions,
  hasRole,
  hasPermission
 }
}