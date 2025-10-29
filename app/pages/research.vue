<script setup lang="ts">
const { data: page } = await useAsyncData('research', () => {
  return queryCollection('research').first()
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
      v-if="page.projects"
      :ui="{
        container: 'pb-12'
      }"
    >
      <h2 class="text-2xl font-bold mb-6">Active Research Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard
          v-for="(project, index) in page.projects"
          :key="index"
          :ui="{
            body: 'space-y-3'
          }"
        >
          <div class="flex items-start justify-between">
            <h3 class="text-lg font-semibold">{{ project.title }}</h3>
            <UBadge
              v-if="project.status"
              :label="project.status"
              color="primary"
              variant="soft"
              size="xs"
            />
          </div>
          <p class="text-muted text-sm">{{ project.description }}</p>
          <p v-if="project.role" class="text-xs text-muted">
            <span class="font-semibold">Role:</span> {{ project.role }}
          </p>
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
  </UPage>
</template>
