'use client'
import { useState } from 'react'
import { ProfileHeader } from '@/components/account/profile/ProfileHeader'
import { ProfileInfo } from '@/components/account/profile/ProfileInfo'
import { ReadingHistory } from '@/components/account/profile/ReadingHistory'
import { InterestsList } from '@/components/account/profile/InterestList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface User {
 id: string
 name: string
 email: string | null
 image: string | null
 description: string | null
 interests: string[]
 cloudinaryImageId?: string | null
 isActive?: boolean
 role?: any
 emailVerified?: Date | null
 socialMedia?: any[]
}

export const WrapperProfile = ({ user }: { user: User }) => {
 return (
  <div className="max-w-4xl mx-auto p-6">
   <ProfileHeader user={user} />

   <Tabs defaultValue="info" className="mt-6">
    <TabsList className="grid w-full grid-cols-3">
     <TabsTrigger value="info">Información</TabsTrigger>
     <TabsTrigger value="history">Historial</TabsTrigger>
     <TabsTrigger value="interests">Intereses</TabsTrigger>
    </TabsList>

    <TabsContent value="info">
     <ProfileInfo user={user} />
    </TabsContent>

    <TabsContent value="history">
     <ReadingHistory userId={user.id} />
    </TabsContent>

    <TabsContent value="interests">
     <InterestsList user={user} />
    </TabsContent>
   </Tabs>
  </div>
 )
}