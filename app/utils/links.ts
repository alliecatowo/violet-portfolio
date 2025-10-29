import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: 'Home',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'About',
  icon: 'i-lucide-user',
  to: '/about'
}, {
  label: 'Portfolio',
  icon: 'i-lucide-folder',
  to: '/portfolio'
}, {
  label: 'Research',
  icon: 'i-lucide-microscope',
  to: '/research'
}, {
  label: 'Tutoring',
  icon: 'i-lucide-graduation-cap',
  to: '/tutoring'
}, {
  label: 'Blog',
  icon: 'i-lucide-file-text',
  to: '/blog'
}, {
  label: 'Workshops',
  icon: 'i-lucide-presentation',
  to: '/speaking'
}]
