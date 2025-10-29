<script setup lang="ts">
import { z } from 'zod'

const { data: page } = await useAsyncData('contact', () => {
  return queryCollection('contact').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  inquiryType: z.enum(['tutoring', 'research', 'speaking', 'general']),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: '',
  email: '',
  phone: '',
  inquiryType: 'tutoring' as const,
  message: ''
})

const toast = useToast()
const submitting = ref(false)

async function onSubmit(event: Schema) {
  submitting.value = true

  // Simulate form submission - in production, this would send to an API
  await new Promise(resolve => setTimeout(resolve, 1000))

  toast.add({
    title: 'Message sent!',
    description: 'Thank you for reaching out. I\'ll get back to you within 24-48 hours.',
    color: 'success',
    icon: 'i-heroicons-check-circle'
  })

  // Reset form
  Object.assign(state, {
    name: '',
    email: '',
    phone: '',
    inquiryType: 'tutoring',
    message: ''
  })

  submitting.value = false
}

const inquiryOptions = [
  { value: 'tutoring', label: 'Tutoring Services' },
  { value: 'research', label: 'Research Collaboration' },
  { value: 'speaking', label: 'Speaking/Workshops' },
  { value: 'general', label: 'General Inquiry' }
]
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      class="bg-gradient-to-b from-primary/5 to-transparent"
    />

    <UPageBody>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Info & Content -->
        <div>
          <MDC
            :value="page.content"
            unwrap="p"
            class="prose prose-primary max-w-none"
          />

          <div class="mt-8 space-y-4">
            <UPageCard
              icon="i-heroicons-envelope"
              title="Email"
              description="violet@violet-teaches.me"
              :spotlight="true"
            />

            <UPageCard
              icon="i-heroicons-phone"
              title="Phone"
              description="(555) 123-4567"
              :spotlight="true"
            />

            <UPageCard
              icon="i-heroicons-map-pin"
              title="Location"
              description="Central Valley, California (Fresno/Clovis area)"
              :spotlight="true"
            />
          </div>
        </div>

        <!-- Contact Form -->
        <div>
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Send a Message</h3>
            </template>

            <UForm
              :schema="schema"
              :state="state"
              class="space-y-4"
              @submit="onSubmit"
            >
              <UFormField
                label="Name"
                name="name"
                required
              >
                <UInput
                  v-model="state.name"
                  placeholder="Your name"
                  icon="i-heroicons-user"
                />
              </UFormField>

              <UFormField
                label="Email"
                name="email"
                required
              >
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="your.email@example.com"
                  icon="i-heroicons-envelope"
                />
              </UFormField>

              <UFormField
                label="Phone (Optional)"
                name="phone"
              >
                <UInput
                  v-model="state.phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  icon="i-heroicons-phone"
                />
              </UFormField>

              <UFormField
                label="Inquiry Type"
                name="inquiryType"
                required
              >
                <USelect
                  v-model="state.inquiryType"
                  :options="inquiryOptions"
                  value-attribute="value"
                  option-attribute="label"
                />
              </UFormField>

              <UFormField
                label="Message"
                name="message"
                required
              >
                <UTextarea
                  v-model="state.message"
                  placeholder="Tell me about your needs..."
                  :rows="6"
                />
              </UFormField>

              <UButton
                type="submit"
                color="primary"
                size="lg"
                block
                :loading="submitting"
              >
                Send Message
              </UButton>
            </UForm>
          </UCard>
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
