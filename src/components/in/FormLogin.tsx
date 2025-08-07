import type { LangParams } from '@/types/interfaces/lang.interfaces'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'




export const FormLogin = async (
 { params }: { params: LangParams }
) => {
 return (
  <div className=''>
   <form>
    <div className=''>
     <Label>a</Label>
     <Input></Input>
    </div>
    <div className=''>
     <Label>a</Label>
     <Input></Input>
    </div>
    <div className=''>
     <Button>d</Button>
    </div>
   </form>
   <div className='mt-4'>
    <Separator />
    <div className='mt-4 w-full flex justify-between items-center'>
     <Button>asd</Button>
     <Button>asd</Button>
     <Button>asd</Button>
    </div>
   </div>
  </div>
 )
}