<template>
  <div class="mb-4">
    <h3 class="font-bold text-[28px]">
      {{ animeTitle }} Characters
    </h3>
    <p>The following is a full list of characters for the anime {{ animeTitle }}</p>
  </div>
  <template v-if="pending">
    <Loader></Loader>
  </template>
  <template v-else>
    <template v-if="characters">
      <div class="grid grid-cols-5 gap-4">
        <div v-for="character in characters" class="flex flex-col items-center bg-white shadow rounded">
          <div>
            <img :src="character.image.original" alt="" class="h-[266px]">
          </div>
          <div class="px-1 py-2 text-sm text-center whitespace-nowrap text-ellipsis overflow-hidden w-full" :title="character.name">
            {{ character.name }}
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="text-center mt-12 text-lg font-bold">
        Ops... We don't have this information
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { defineOptions } from '@vue/runtime-core';
import { useFetch, useHead, useRoute } from 'nuxt/app';
import { computed } from '@vue/reactivity';
import { Character } from '../../../src/shared/types/character';
import { Ref, useAttrs } from 'vue';
import Loader from '../../../src/shared/ui/loader.vue';

let route = useRoute()

defineOptions({
  name: 'anime-page-episodes'
})

let animeTitle = await useAttrs().animeTitle

useHead({
  title: `Characters | ${ animeTitle }`
})


let {
  data: characters,
  pending
}: { data: Ref<Character[]> } = await useFetch(`https://kitsu.io/api/edge/anime-characters`, {
  query: {
    'filter[animeId]': useAttrs().anime.id,
    'include': 'character',
    'page[limit]': 20,
    'page[offset]': 0
  },
  lazy: true,
  key: 'characters',
  transform: (r: { included: any }) => r.included.map(character => character.attributes)
})
</script>

<style scoped>

</style>