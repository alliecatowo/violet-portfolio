<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    class="bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-lg border border-primary/10 p-8"
    :ui="{
      container: '!p-0',
      title: 'text-left text-2xl sm:text-3xl font-semibold mb-4',
      description: 'text-left text-base sm:text-lg leading-relaxed text-foreground/80'
    }"
  >
    <template #title>
      <span class="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
        {{ page.about.title }}
      </span>
    </template>
    <template #description>
      {{ page.about.description }}
    </template>
  </UPageSection>
</template>

<style scoped>

</style>
