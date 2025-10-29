<script setup lang="ts">
const { data: page } = await useAsyncData('tutoring', () => {
  return queryCollection('tutoring').first()
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
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      class="bg-gradient-to-b from-primary/5 to-transparent border-b border-primary/10"
      :ui="{
        title: 'text-primary',
        container: 'py-16'
      }"
    />
    <UPageSection
      v-if="page.specialties"
      :ui="{
        container: 'pb-12'
      }"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UPageCard
          v-for="(specialty, index) in page.specialties"
          :key="index"
          :icon="specialty.icon"
          :title="specialty.title"
          :description="specialty.description"
          :spotlight="true"
          spotlight-color="primary"
        />
      </div>
    </UPageSection>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <MDC
        :value="page.content"
        unwrap="p"
      />
    </UPageSection>
    <UPageSection
      v-if="page.testimonials"
      title="What Parents & Students Say"
      :ui="{
        container: 'py-12'
      }"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UPageCard
          v-for="(testimonial, index) in page.testimonials"
          :key="index"
          :description="testimonial.quote"
          variant="subtle"
          :spotlight="true"
        >
          <template #footer>
            <p class="text-sm font-semibold text-muted">
              — {{ testimonial.author }}
            </p>
          </template>
        </UPageCard>
      </div>
    </UPageSection>
  </UPage>
</template>
