import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: 'Home',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'About',
  icon: 'i-lucide-user',
  children: [{
    label: 'About Me',
    description: 'Learn about my teaching philosophy and background',
    icon: 'i-lucide-heart',
    to: '/about'
  }, {
    label: 'Education & Experience',
    description: 'My academic journey and teaching credentials',
    icon: 'i-lucide-graduation-cap',
    to: '/education'
  }, {
    label: 'Contact',
    description: 'Get in touch about tutoring or collaboration',
    icon: 'i-lucide-mail',
    to: '/contact'
  }]
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
  icon: 'i-lucide-book-open',
  to: '/tutoring'
}, {
  label: 'Blog',
  icon: 'i-lucide-file-text',
  to: '/blog'
}]
