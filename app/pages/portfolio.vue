<script setup lang="ts">
const { data: page } = await useAsyncData('portfolio-page', () => {
  return queryCollection('pages').path('/portfolio').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: portfolio } = await useAsyncData('portfolio', () => {
  return queryCollection('portfolio').all()
})

const { global } = useAppConfig()

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
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            v-bind="page.links[0]"
          />
          <UButton
            :to="`mailto:${global.email}`"
            v-bind="page.links[1]"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <Motion
        v-for="(item, index) in portfolio"
        :key="item.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="item.title"
          :description="item.description"
          :to="item.url"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last'
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{ new Date(item.date).getFullYear() }}
            </span>
          </template>
          <template #footer>
            <div class="flex items-center justify-between">
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in item.tags"
                  :key="tag"
                  :label="tag"
                  variant="soft"
                  size="xs"
                />
              </div>
              <ULink
                v-if="item.url"
                :to="item.url"
                target="_blank"
                class="text-sm text-primary flex items-center gap-1 shrink-0"
              >
                View Details
                <UIcon
                  name="i-lucide-external-link"
                  class="size-4"
                />
              </ULink>
            </div>
          </template>
          <NuxtImg
            :src="item.image"
            :alt="item.title"
            class="object-cover w-full h-48 rounded-lg"
            sizes="sm:400px md:600px"
            loading="lazy"
          />
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
