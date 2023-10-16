<template>
  <div class="flex flex-wrap gap-2">
    <div v-for="character in characters" class="flex flex-col items-center w-[120px] bg-white">
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
import { Character } from '../../../src/shared/types/character';

defineOptions({
  name: 'anime-page-episodes'
})

let {data: characters}: { data: Character[] } = await useFetch('https://kitsu.io/api/edge/anime-characters?filter[animeId]=7442&include=character', {
  key: 'characters',
  transform: (r: { included: any }) => r.included.map(character => character.attributes)
})
</script>

<style scoped>

</style>