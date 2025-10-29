<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :description="page.about.description"
    class="bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-lg border border-primary/10 p-8"
    :ui="{
      container: '!p-0',
      title: 'text-left text-2xl sm:text-3xl font-semibold text-primary mb-4',
      description: 'text-left text-base sm:text-lg leading-relaxed text-foreground/80'
    }"
  />
</template>

<style scoped>

</style>
