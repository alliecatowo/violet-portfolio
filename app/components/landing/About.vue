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
    class="border-l-4 border-primary pl-6"
    :ui="{
      container: '!p-0',
      title: 'text-left text-2xl sm:text-3xl font-semibold mb-4 text-primary',
      description: 'text-left text-base sm:text-lg leading-relaxed'
    }"
  />
</template>

<style scoped>

</style>
