'use client'

import Link from 'next/link'
import { ChevronDown, LayoutGrid, LogOut, Plus, Settings, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="hidden h-10 gap-1 rounded-full bg-[#AE2448] px-4 text-white shadow-[0_16px_30px_rgba(174,36,72,0.24)] hover:bg-[#8e1b3b] sm:flex">
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)]">
          {SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#6b584d] hover:bg-[#efe6df] hover:text-[#2a211c]"
            aria-label="Account and sign out"
          >
            <Avatar className="h-9 w-9 border border-[#e5d9cf]">
              <AvatarImage src={user?.avatar} alt="" />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-[#e5d9cf] bg-[#fffdf9] p-2">
          <div className="flex items-center gap-3 rounded-lg border border-[#eadfd6] bg-[#faf6f2] p-3">
            <Avatar className="h-10 w-10 border border-[#e5d9cf]">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex flex-col">
              <span className="truncate text-sm font-medium text-[#2a211c]">{user?.name}</span>
              <span className="truncate text-xs text-[#6b584d]">{user?.email}</span>
            </div>
          </div>
          <DropdownMenuItem asChild className="mt-2 rounded-md">
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-2 bg-[#eadfd6]" />
          <DropdownMenuItem
            onClick={() => logout()}
            className="mt-1 flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#A98E7B] text-white focus:bg-[#957a68] focus:text-white data-[highlighted]:bg-[#957a68] data-[highlighted]:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
