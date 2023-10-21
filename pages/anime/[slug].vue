<template>
  <div class="">
    <img :src="anime.details.coverImage.original" alt="" class="w-full h-[400px] object-cover">
  </div>
  <div class="bg-[#f7f7f7]">
    <div class="container">
      <div class="flex items-start gap-8">
        <div class="flex-shrink-0 w-[200px] relative top-[-80px]">
          <div class="">
            <div class="mb-4 rounded overflow-hidden">
              <img :src="anime.details.posterImage.medium" alt="">
            </div>
          </div>
          <div>Watch on</div>
        </div>
        <div class="flex-1">
          <div class="bg-white rounded mb-4">
            <div class="flex w-max text-center rounded overflow-hidden">
              <NuxtLink
                :to="`/anime/${route.params.slug}`"
                class="py-4 px-7 flex-1 hover:bg-black hover:text-white"
                disabled="true"
              >
                Summary
              </NuxtLink>
              <NuxtLink
                :to="`/anime/${route.params.slug}/episodes`"
                class="py-4 px-7 text-[#999] flex-1 hover:bg-black hover:text-white"
              >
                Episodes
              </NuxtLink>
              <NuxtLink
                :to="`/anime/${route.params.slug}/characters`"
                class="py-4 px-7 text-[#999] flex-1 hover:bg-black hover:text-white"
              >
                Characters
              </NuxtLink>
              <!--<NuxtLink
                :to="`/anime/${route.params.slug}/reactions`"
                class="py-4 px-7 text-[#999] flex-1 hover:bg-black hover:text-white"
              >
                Reactions
              </NuxtLink>
              <NuxtLink
                :to="`/anime/${route.params.slug}/franchise`"
                class="py-4 px-7 text-[#999] flex-1 hover:bg-black hover:text-white"
              >
                Franchise
              </NuxtLink>-->
            </div>
          </div>
          <NuxtPage :anime="anime" :animeTitle="animeTitle"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CardAnime } from '../../src/entities/card-anime'
import { CardCharacter } from '../../src/entities/card-character'
import { defineOptions } from '@vue/runtime-core';
import { useFetch, useRoute } from 'nuxt/app';
import { onMounted, Ref, ref, useAttrs } from 'vue'
import { computed } from '@vue/reactivity';
import { AnimeDetails } from '../../src/shared/types/anime';
defineOptions({
  name: 'anime-page'
})

let route = useRoute()
let animeSeries = ref([])
let {data: anime}: { data: Ref<AnimeDetails> } = await useFetch(`https://kitsu.io/api/edge/anime`, {
  key: 'animeDetails',
  query: {
    'fields[categories]': 'slug,title',
    'include': 'categories',
    'filter[slug]': route.params.slug
  },
  transform: (r): AnimeDetails => {
    return {
      id: r.data[0].id,
      details: r.data[0].attributes,
      categories: r.included?.filter(v => v.type === 'categories'),
    }
  }
})

const animeTitle = computed(() => {
  return anime.value.details.titles.en ? anime.value.details.titles.en : anime.value.details.titles.en_jp
})


onMounted(() => {
  getAnimeSeries(anime.value.id)
})

async function getAnimeSeries(id: string) {
  let response = await fetch(`https://kitsu.io/api/edge/media-relationships?filter[source_id]=${ id }&filter[source_type]=Anime&include=destination&page[limit]=4&sort=role`)
  let data = await response.json()
  animeSeries.value = data.included
}

let animeDescription = ref(checkDescriptionLength(anime.value.details.description) ? anime.value.details.description.substr(0, 475) + '...' : anime.value.details.description)
let isShowCroppedDescription = ref(checkDescriptionLength(anime.value.details.description))
const animeDetails = computed(() => {
  const detailNames = ['titles', 'subtype', 'episodeCount', 'status', 'ageRating', 'ageRatingGuide', 'episodeLength', 'totalLength']
  const result = {}

  detailNames.forEach(detailName => {
    const value = anime.value.details[detailName]
    if (value) {
      if (detailName === 'titles') {
        Object.entries(value).forEach(([key, el]) => {
          result[key] = {
            name: getKeyName(key),
            value: el
          }
        })
      } else {
        result[detailName] = {
          name: getKeyName(detailName),
          value: value
        }
      }
    }
  })

  function getKeyName(propertyName) {
    switch (propertyName) {
      case 'en':
        return 'English'
      case 'en_jp':
        return 'Japanese (Romaji)'
      case 'en_us':
        return 'English (American)'
      case 'ja_jp':
        return 'Japanese'
      case 'subtype':
        return 'Type'
      case 'episodeCount':
        return 'Episodes'
      case 'status':
        return 'Status'
      case 'ageRating':
        return 'Rating'
      case 'ageRatingGuide':
        return 'Rating'
      case 'episodeLength':
        return 'Length'
      case 'totalLength':
        return 'Length'
    }
  }

  return result
})

function checkDescriptionLength(str: string):boolean {
  return str.length > 500
}

function readMore() {
  animeDescription.value = anime.value.details.description
  isShowCroppedDescription.value = false
}

/*
let { data } = useFetch(`https://kitsu.io/api/edge/anime`, {
  params: {
    slug: route.params.slug
  }
})*/
</script>

<style scoped>

</style>