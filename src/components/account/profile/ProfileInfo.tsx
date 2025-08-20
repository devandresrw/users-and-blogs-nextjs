'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Edit2, Save, X, Plus, Trash2, ExternalLink } from 'lucide-react'
import { changeUserDescription } from '@/lib/profile/change-description.service'
import { updateUserSocialMedia } from '@/lib/profile/change-or-add-social.service'
import { useRouter } from 'next/navigation'

interface SocialMedia {
 id?: string;
 platform: string;
 url: string;
 username?: string;
}

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
 socialMedia?: SocialMedia[]
}

const SOCIAL_PLATFORMS = [
 'Twitter',
 'Facebook',
 'Instagram',
 'LinkedIn',
 'GitHub',
 'YouTube',
 'TikTok',
 'Discord',
 'Twitch',
 'Website'
];

export const ProfileInfo = ({ user }: { user: User }) => {
 const [isEditingDescription, setIsEditingDescription] = useState(false)
 const [isEditingSocial, setIsEditingSocial] = useState(false)
 const [description, setDescription] = useState(user.description || '')
 const [tempDescription, setTempDescription] = useState(description)
 const [socialMedia, setSocialMedia] = useState<SocialMedia[]>(user.socialMedia || [])
 const [tempSocialMedia, setTempSocialMedia] = useState<SocialMedia[]>(socialMedia)
 const [isUpdating, setIsUpdating] = useState(false)
 const [error, setError] = useState<string | null>(null)
 const router = useRouter()

 const handleSaveDescription = async () => {
  setIsUpdating(true)
  setError(null)

  try {
   const result = await changeUserDescription(user.id, tempDescription)

   if (result.success) {
    setDescription(tempDescription)
    setIsEditingDescription(false)
    router.refresh()
   } else {
    setError(result.message || 'Error al actualizar la descripción')
   }
  } catch (error) {
   console.error('Error updating description:', error)
   setError('Error inesperado al actualizar la descripción')
  } finally {
   setIsUpdating(false)
  }
 }

 const handleCancelDescription = () => {
  setTempDescription(description)
  setIsEditingDescription(false)
  setError(null)
 }

 const handleSaveSocial = async () => {
  setIsUpdating(true)
  setError(null)

  try {
   console.log('🔍 Client: Starting social media save');

   // Filtrar y validar redes sociales que tengan al menos plataforma y URL
   const validSocialMedia = tempSocialMedia
    .map(social => ({
     platform: social.platform?.trim() || '',
     url: social.url?.trim() || '',
     username: social.username?.trim() || ''
    }))
    .filter(social => {
     const isValid = social.platform && social.url;
     console.log('🔍 Client: Validating social media:', social, 'Valid:', isValid);
     return isValid;
    });

   console.log('📋 Client: Valid social media to send:', validSocialMedia);

   // Validar URLs en el cliente
   for (const social of validSocialMedia) {
    try {
     new URL(social.url);
    } catch {
     setError(`URL inválida para ${social.platform}: ${social.url}`);
     return;
    }
   }

   // Validar plataformas duplicadas
   const platforms = validSocialMedia.map(s => s.platform.toLowerCase());
   const duplicates = platforms.filter((platform, index) => platforms.indexOf(platform) !== index);
   if (duplicates.length > 0) {
    setError(`Solo puedes tener una cuenta por plataforma: ${duplicates.join(', ')}`);
    return;
   }

   const result = await updateUserSocialMedia(user.id, validSocialMedia)

   if (result.success) {
    setSocialMedia(validSocialMedia);
    setTempSocialMedia(validSocialMedia);
    setIsEditingSocial(false);
    router.refresh();
   } else {
    setError(result.message || 'Error al actualizar las redes sociales')
   }
  } catch (error) {
   console.error('💥 Client: Error updating social media:', error);
   setError('Error inesperado al actualizar las redes sociales');
  } finally {
   setIsUpdating(false);
  }
 }

 const handleCancelSocial = () => {
  setTempSocialMedia(socialMedia)
  setIsEditingSocial(false)
  setError(null)
 }

 const addSocialMedia = () => {
  setTempSocialMedia([...tempSocialMedia, { platform: '', url: '', username: '' }])
 }

 const removeSocialMedia = (index: number) => {
  setTempSocialMedia(tempSocialMedia.filter((_, i) => i !== index))
 }

 const updateSocialMedia = (index: number, field: keyof SocialMedia, value: string) => {
  const updated = [...tempSocialMedia]
  updated[index] = { ...updated[index], [field]: value }
  setTempSocialMedia(updated)
 }

 const getAvailablePlatforms = (currentIndex: number) => {
  const usedPlatforms = tempSocialMedia
   .map((social, index) => index !== currentIndex ? social.platform : null)
   .filter(Boolean)

  return SOCIAL_PLATFORMS.filter(platform => !usedPlatforms.includes(platform))
 }

 return (
  <div className="space-y-6">
   {error && (
    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
     {error}
    </div>
   )}

   {/* Descripción */}
   <Card>
    <CardHeader className="flex flex-row items-center justify-between">
     <CardTitle>Sobre mí</CardTitle>
     {!isEditingDescription ? (
      <Button
       variant="ghost"
       size="sm"
       onClick={() => setIsEditingDescription(true)}
       disabled={isEditingSocial}
      >
       <Edit2 className="h-4 w-4" />
      </Button>
     ) : (
      <div className="flex gap-2">
       <Button
        variant="ghost"
        size="sm"
        onClick={handleSaveDescription}
        disabled={isUpdating}
       >
        <Save className="h-4 w-4" />
       </Button>
       <Button
        variant="ghost"
        size="sm"
        onClick={handleCancelDescription}
        disabled={isUpdating}
       >
        <X className="h-4 w-4" />
       </Button>
      </div>
     )}
    </CardHeader>
    <CardContent>
     {!isEditingDescription ? (
      <p className="text-sm text-muted-foreground">
       {description || 'Añade una descripción sobre ti...'}
      </p>
     ) : (
      <Textarea
       value={tempDescription}
       onChange={(e) => setTempDescription(e.target.value)}
       placeholder="Cuéntanos sobre ti..."
       className="min-h-[100px]"
       maxLength={500}
       disabled={isUpdating}
      />
     )}
    </CardContent>
   </Card>

   {/* Redes Sociales */}
   <Card>
    <CardHeader className="flex flex-row items-center justify-between">
     <CardTitle>Redes Sociales</CardTitle>
     {!isEditingSocial ? (
      <Button
       variant="ghost"
       size="sm"
       onClick={() => setIsEditingSocial(true)}
       disabled={isEditingDescription}
      >
       <Edit2 className="h-4 w-4" />
      </Button>
     ) : (
      <div className="flex gap-2">
       <Button
        variant="ghost"
        size="sm"
        onClick={handleSaveSocial}
        disabled={isUpdating}
       >
        <Save className="h-4 w-4" />
       </Button>
       <Button
        variant="ghost"
        size="sm"
        onClick={handleCancelSocial}
        disabled={isUpdating}
       >
        <X className="h-4 w-4" />
       </Button>
      </div>
     )}
    </CardHeader>
    <CardContent>
     {!isEditingSocial ? (
      <div className="space-y-2">
       {socialMedia.length === 0 ? (
        <p className="text-sm text-muted-foreground">
         No has agregado redes sociales aún...
        </p>
       ) : (
        socialMedia.map((social, index) => (
         <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <span className="font-medium text-sm min-w-[80px]">{social.platform}:</span>
          <a
           href={social.url}
           target="_blank"
           rel="noopener noreferrer"
           className="text-sm text-primary hover:underline truncate flex items-center gap-1"
          >
           {social.username ? `@${social.username}` : social.url}
           <ExternalLink className="h-3 w-3" />
          </a>
         </div>
        ))
       )}
      </div>
     ) : (
      <div className="space-y-3">
       {tempSocialMedia.map((social, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
         <Select
          value={social.platform}
          onValueChange={(value) => updateSocialMedia(index, 'platform', value)}
          disabled={isUpdating}
         >
          <SelectTrigger>
           <SelectValue placeholder="Plataforma" />
          </SelectTrigger>
          <SelectContent>
           {getAvailablePlatforms(index).map((platform) => (
            <SelectItem key={platform} value={platform}>
             {platform}
            </SelectItem>
           ))}
          </SelectContent>
         </Select>

         <Input
          placeholder="URL completa"
          value={social.url}
          onChange={(e) => updateSocialMedia(index, 'url', e.target.value)}
          disabled={isUpdating}
         />

         <Input
          placeholder="@username (opcional)"
          value={social.username || ''}
          onChange={(e) => updateSocialMedia(index, 'username', e.target.value)}
          disabled={isUpdating}
         />

         <Button
          variant="ghost"
          size="sm"
          onClick={() => removeSocialMedia(index)}
          disabled={isUpdating}
         >
          <Trash2 className="h-4 w-4 text-red-500" />
         </Button>
        </div>
       ))}

       <Button
        variant="outline"
        size="sm"
        onClick={addSocialMedia}
        disabled={isUpdating || tempSocialMedia.length >= SOCIAL_PLATFORMS.length}
        className="w-full"
       >
        <Plus className="h-4 w-4 mr-2" />
        Agregar Red Social
       </Button>
      </div>
     )}
    </CardContent>
   </Card>
  </div>
 )
}