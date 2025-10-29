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
    />
    <UPageSection
      v-if="page.specialties"
      :ui="{
        container: 'pb-12'
      }"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="(specialty, index) in page.specialties"
          :key="index"
          :ui="{
            body: 'space-y-3'
          }"
        >
          <div class="flex items-center space-x-3">
            <UIcon :name="specialty.icon" class="size-6 text-primary" />
            <h3 class="text-lg font-semibold">{{ specialty.title }}</h3>
          </div>
          <p class="text-muted text-sm">{{ specialty.description }}</p>
        </UCard>
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
        <UCard
          v-for="(testimonial, index) in page.testimonials"
          :key="index"
          :ui="{
            body: 'space-y-4'
          }"
        >
          <p class="italic text-muted">"{{ testimonial.quote }}"</p>
          <p class="text-sm font-semibold">— {{ testimonial.author }}</p>
        </UCard>
      </div>
    </UPageSection>
  </UPage>
</template>
