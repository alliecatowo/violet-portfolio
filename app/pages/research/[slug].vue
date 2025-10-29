<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(`research-${route.params.slug}`, () => {
  return queryCollection('researchProjects').path(`/research/projects/${route.params.slug}`).first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Research project not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
  ogImage: page.value?.image
})
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
    >
      <template #headline>
        <UBadge
          :label="page.status"
          :color="page.status === 'Completed' ? 'success' : 'primary'"
          variant="soft"
        />
        <span class="text-muted">•</span>
        <span class="text-sm text-muted">{{ page.role }} at {{ page.institution }}</span>
      </template>
    </UPageHeader>

    <UPageBody>
      <img
        v-if="page.image"
        :src="page.image"
        :alt="page.title"
        class="w-full h-64 object-cover rounded-lg mb-8"
      >

      <ContentRenderer :value="page" class="prose prose-primary max-w-none" />

      <div class="mt-12 pt-8 border-t border-default">
        <NuxtLink
          to="/research"
          class="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <UIcon name="i-heroicons-arrow-left" class="size-4" />
          Back to Research
        </NuxtLink>
      </div>
    </UPageBody>
  </UPage>
</template>
