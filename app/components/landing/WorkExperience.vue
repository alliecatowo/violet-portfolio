<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    class="border-l-4 border-primary pl-6"
    :ui="{
      container: '!p-0',
      title: 'text-left text-2xl sm:text-3xl font-semibold mb-6',
      description: 'mt-2'
    }"
  >
    <template #title>
      <span class="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
        {{ page.experience.title }}
      </span>
    </template>
    <template #description>
      <div class="flex flex-col gap-6">
        <Motion
          v-for="(experience, index) in page.experience.items"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <div class="flex flex-col gap-2">
            <div class="flex flex-wrap items-center gap-2 text-sm text-muted">
              <span class="font-medium">{{ experience.date }}</span>
            </div>
            <ULink
              class="flex flex-wrap items-center gap-2"
              :to="experience.company.url"
              target="_blank"
            >
              <span class="text-base sm:text-lg font-medium">
                {{ experience.position }}
              </span>
              <UTooltip
                v-if="experience.company.fullName"
                :text="experience.company.fullName"
              >
                <UBadge
                  :label="experience.company.name"
                  :ui="{
                    base: 'inline-flex items-center gap-1.5 px-3 py-1.5',
                    label: 'font-semibold text-sm'
                  }"
                  :style="{ backgroundColor: `${experience.company.color}15`, color: experience.company.color, borderColor: experience.company.color }"
                  variant="outline"
                >
                  <template #trailing>
                    <UIcon :name="experience.company.logo" class="size-4" />
                  </template>
                </UBadge>
              </UTooltip>
              <UBadge
                v-else
                :label="experience.company.name"
                :ui="{
                  base: 'inline-flex items-center gap-1.5 px-3 py-1.5',
                  label: 'font-semibold text-sm'
                }"
                :style="{ backgroundColor: `${experience.company.color}15`, color: experience.company.color, borderColor: experience.company.color }"
                variant="outline"
              >
                <template #trailing>
                  <UIcon :name="experience.company.logo" class="size-4" />
                </template>
              </UBadge>
            </ULink>
          </div>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>

</style>
