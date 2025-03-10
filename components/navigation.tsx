'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/ui/icons'
import { ThemeToggle } from '@/components/theme-toggle'

const navigation = [
  { name: 'Posts', href: '/posts', icon: Icons.code },
  { name: 'Tags', href: '/tags', icon: Icons.chevronRight },
  { name: 'About', href: '/about', icon: Icons.github },
  { name: 'Search', href: '/search', icon: Icons.search },
]

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

export function Navigation() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="text-2xl font-mono font-bold tracking-tight">
        aranyaadheu
      </Link>
      <div className="flex items-center space-x-6">
        <nav>
          <motion.ul
            className="flex items-center space-x-6 text-sm font-medium"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            {navigation.map((item) => (
              <motion.li key={item.href} variants={itemVariants}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1 text-zinc-500 hover:text-zinc-300 transition-colors',
                    pathname === item.href && 'text-zinc-300'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
        <ThemeToggle />
      </div>
    </div>
  )
} 