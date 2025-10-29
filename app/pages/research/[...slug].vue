<script setup lang="ts">
const route = useRoute()

const slug = route.path.split('/').pop()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('researchProjects').path(route.path).first()
})

const { data: articles } = await useAsyncData(`articles-${slug}`, () => {
  return queryCollection('researchArticles').where('project', '=', slug).order('date', 'DESC').all()
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

      <div v-if="articles && articles.length > 0" class="mt-12">
        <h2 class="text-2xl font-bold mb-6 text-primary">Publications & Presentations</h2>
        <div class="grid grid-cols-1 gap-4">
          <UPageCard
            v-for="(article, index) in articles"
            :key="index"
            :title="article.title"
            :description="article.description"
            :to="article.url"
            target="_blank"
            :spotlight="true"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <UBadge
                  v-if="article.type"
                  :label="article.type"
                  color="primary"
                  variant="soft"
                  size="xs"
                />
                <span class="text-xs text-muted">
                  {{ new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) }}
                </span>
              </div>
            </template>
          </UPageCard>
        </div>
      </div>

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
