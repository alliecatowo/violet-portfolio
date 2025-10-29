<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.experience.title"
    class="border-l-4 border-primary pl-4"
    :ui="{
      container: '!p-0 gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium text-primary',
      description: 'mt-2'
    }"
  >
    <template #description>
      <div class="flex flex-col gap-2">
        <Motion
          v-for="(experience, index) in page.experience.items"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * index }"
          :in-view-options="{ once: true }"
          class="text-muted"
        >
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <p class="text-sm shrink-0">
              {{ experience.date }}
            </p>
            <USeparator class="hidden sm:block" orientation="vertical" />
            <ULink
              class="flex flex-wrap items-center gap-1"
              :to="experience.company.url"
              target="_blank"
            >
              <span class="text-sm">
                {{ experience.position }}
              </span>
              <UTooltip
                v-if="experience.company.fullName"
                :text="experience.company.fullName"
              >
                <div
                  class="inline-flex items-center gap-1 flex-wrap"
                  :style="{ color: experience.company.color }"
                >
                  <span class="font-medium">{{ experience.company.name }}</span>
                  <UIcon :name="experience.company.logo" class="shrink-0" />
                </div>
              </UTooltip>
              <div
                v-else
                class="inline-flex items-center gap-1 flex-wrap"
                :style="{ color: experience.company.color }"
              >
                <span class="font-medium">{{ experience.company.name }}</span>
                <UIcon :name="experience.company.logo" class="shrink-0" />
              </div>
            </ULink>
          </div>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>

</style>
