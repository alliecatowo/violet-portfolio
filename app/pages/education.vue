<script setup lang="ts">
const { data: page } = await useAsyncData('education', () => {
  return queryCollection('education').first()
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
      class="bg-gradient-to-b from-primary/5 to-transparent"
      :ui="{
        title: 'text-left',
        description: 'text-left'
      }"
    />
    <UPageSection
      v-if="page.education"
      title="Academic Credentials"
      :ui="{
        container: 'pb-12',
        title: 'text-left'
      }"
    >
      <div class="grid grid-cols-1 gap-6">
        <UCard
          v-for="(edu, index) in page.education"
          :key="index"
          class="transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
          :ui="{
            body: 'space-y-3'
          }"
        >
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-semibold">
                {{ edu.degree }}
              </h3>
              <p class="text-sm text-primary font-medium">
                {{ edu.institution }}
              </p>
            </div>
            <UBadge
              :label="edu.status"
              :color="edu.status === 'Completed' ? 'success' : 'primary'"
              variant="soft"
              size="xs"
            />
          </div>
          <p class="text-sm text-muted">
            {{ edu.year }}
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
        class="prose prose-primary max-w-none"
      />
    </UPageSection>
  </UPage>
</template>
