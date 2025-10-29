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
      <h2 class="text-2xl font-bold mb-6 text-primary">Active Research Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UPageCard
          v-for="(project, index) in page.projects"
          :key="index"
          :title="project.title"
          :description="project.description"
          :to="project.slug ? `/research/${project.slug}` : undefined"
          :spotlight="true"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <UBadge
                v-if="project.status"
                :label="project.status"
                :color="project.status === 'Completed' ? 'success' : 'primary'"
                variant="soft"
                size="xs"
              />
              <span v-if="project.role" class="text-xs text-muted">
                {{ project.role }}
              </span>
            </div>
          </template>
        </UPageCard>
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
