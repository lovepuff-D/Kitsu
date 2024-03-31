<template>
    <template v-if="pending">
        <Loader />
    </template>
    <template v-else>
        <template v-if="episodes">
            <div class="grid grid-cols-3 gap-4">
                <div v-for="episode in episodes" class="flex flex-col items-center bg-white shadow rounded">
                    <div class="w-full h-full">
                        <img
                            :src="episode.thumbnail.original"
                            alt=""
                            class="w-full h-full"
                        >
                    </div>
                    <div class="px-2 py-2  text-center whitespace-nowrap text-ellipsis overflow-hidden w-full" :title="episode.canonicalTitle">
                        <span class="font-bold">Episode: {{ episode.number }}</span> {{ episode.canonicalTitle }}
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

import { useFetch, useHead } from 'nuxt/app';
import { Episodes } from '@@/src/shared/types/episodes';
import Loader from '@@/src/shared/ui/loader.vue';
import { Ref, useAttrs } from 'vue';

const anime = await useAttrs().anime
const animeTitle = await useAttrs().animeTitle

useHead({
  title: `Episodes | ${animeTitle}`
})

const {data: episodes, pending}: { data: Ref<Episodes[]> } = useFetch('https://kitsu.io/api/edge/episodes', {
  key: 'episodes',
  query: {
    'filter[mediaType]': 'Anime',
    'filter[media_id]': anime.id,
    'sort': 'number',
    'page[limit]': 20
  },
  transform: (r) => {
    return r.data.map(data => {
      return {
        ...data.attributes,
        id: data.id,
      }
    })
  },
  lazy: true
})

</script>

<style scoped>

</style>