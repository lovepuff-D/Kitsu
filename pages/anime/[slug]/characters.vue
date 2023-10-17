<template>
  <div class="mb-4">
    <h3 class="font-bold text-[28px]">
      {{ animeTitle }} Characters
    </h3>
    <p>The following is a full list of characters for the anime {{ animeTitle }}</p>
  </div>
  <div class="grid grid-cols-5 gap-4">
    <div v-for="character in characters" class="flex flex-col items-center bg-white">
      <div>
        <img :src="character.image.original" alt="">
      </div>
      <div class="px-1 py-2 text-sm text-center">
        {{ character.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineOptions } from '@vue/runtime-core';
import { useFetch } from 'nuxt/app';
import { computed } from '@vue/reactivity';
import { Character } from '../../../src/shared/types/character';
import { useAttrs } from 'vue';

defineOptions({
  name: 'anime-page-episodes'
})

const animeTitle = computed(() => {
  return useAttrs().anime.details.titles.en ? useAttrs().anime.details.titles.en : useAttrs().anime.details.titles.en_jp
})

let {data: characters}: { data: Character[] } = await useFetch(`https://kitsu.io/api/edge/anime-characters?filter[animeId]=${useAttrs().anime.id}&include=character&page[limit]=20&page[offset]=0`, {
  key: 'characters',
  transform: (r: { included: any }) => r.included.map(character => character.attributes)
})
</script>

<style scoped>

</style>