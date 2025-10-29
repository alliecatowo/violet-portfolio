export default defineAppConfig({
  icon: {
    mode: 'css'
  },
  ui: {
    icons: {
      dark: 'i-lucide-moon',
      light: 'i-lucide-sun'
    },
    colors: {
      primary: 'violet',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  global: {
    picture: {
      dark: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      light: 'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Violet Gash - Educator & Researcher'
    },
    meetingLink: 'https://cal.com/violet-gash',
    email: 'violet@violet-teaches.me',
    available: true
  },
  footer: {
    credits: `© ${new Date().getFullYear()} Violet Gash • Built with Nuxt UI`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/violet-gash',
      'target': '_blank',
      'aria-label': 'Violet Gash on LinkedIn'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://twitter.com/violetgash',
      'target': '_blank',
      'aria-label': 'Violet Gash on X'
    }, {
      'icon': 'i-heroicons-envelope',
      'to': 'mailto:violet@violet-teaches.me',
      'aria-label': 'Email Violet Gash'
    }]
  }
})
