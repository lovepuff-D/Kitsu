<template>
    <div class="flex gap-8">
        <div>
            <div>
                <h3 class="font-bold text-[28px]">
                    {{ animeTitle }}
                    <span class="font-bold text-[17px] text-[#999]">
                        {{ anime.details.startDate.split('-')[0] }}
                    </span>
                </h3>
            </div>
            <div class="font-bold text-base my-2">
                {{ anime.details.averageRating }}% is Community Approval?
            </div>
            <div class="text-md">
                <p>{{ animeDescription }}</p>
                <button
                    v-if="isShowCroppedDescription"
                    class="mt-5 text-[#f75239]"
                    @click="readMore"
                >
                    read more
                </button>
            </div>
            <div class="flex flex-wrap gap-1 mt-8">
                <!--:to="`/category/${category.attributes.slug}`"-->
                <NuxtLink
                    v-for="category in anime.categories"
                    :key="category.id"
                    class="bg-white rounded border border-main text-sm px-2 hover:bg-[#f7f7f7]"
                >
                    {{ category.attributes.title }}
                </NuxtLink>
            </div>
            <div class="divider my-4" />
            <div class="flex justify-between">
                <div class="flex items-center gap-2 text-sm">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 1792 1792"
                        fill="#e74c3c"
                    >
                        <path d="M896 1664q-26 0-44-18l-624-602q-10-8-27.5-26T145 952.5 77 855 23.5 734 0 596q0-220 127-344t351-124q62 0 126.5 21.5t120 58T820 276t76 68q36-36 76-68t95.5-68.5 120-58T1314 128q224 0 351 124t127 344q0 221-229 450l-623 600q-18 18-44 18z" />
                    </svg>
                    Rank #{{ anime.details.popularityRank }} (Most Popular Anime)
                </div>
                <div class="flex items-center gap-2 text-sm">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 26 26"
                        fill="#f39c12"
                    >
                        <path d="M25.326 10.137a1.001 1.001 0 00-.807-.68l-7.34-1.066-3.283-6.651c-.337-.683-1.456-.683-1.793 0L8.82 8.391 1.48 9.457a1 1 0 00-.554 1.705l5.312 5.178-1.254 7.31a1.001 1.001 0 001.451 1.054L13 21.252l6.564 3.451a1 1 0 001.451-1.054l-1.254-7.31 5.312-5.178a.998.998 0 00.253-1.024z" />
                    </svg>
                    Rank {{ anime.details.ratingRank }} (Highest Rated Anime)
                </div>
            </div>
            <div class="divider my-4" />
        </div>
        <div class="flex-shrink-0 w-[300px] p-6 bg-white rounded border border-main">
            <!--<div>Play Trailer</div>-->
            <div>
                <div>
                    <h6 class="text-[15px] font-bold mb-3">
                        Anime Details
                    </h6>
                    <ul class="flex flex-col gap-1 text-sm">
                        <template
                            v-for="detail in animeDetails"
                            :key="detail.name"
                        >
                            <li
                                v-if="detail"
                                class="flex items-center gap-4"
                            >
                                <div class="w-1/4 font-bold shrink-0">
                                    {{ detail.name }}
                                </div>
                                <div class="w-full">
                                    {{ detail.value }}
                                </div>
                            </li>
                        </template>
                    </ul>
                    <!--<div class="mt-4 text-sm text-[#999]">More Info</div>-->
                </div>
                <ClientOnly>
                    <template v-if="characters">
                        <div class="divider my-4" />
                        <div>
                            <h6 class="text-[15px] font-bold mb-3">
                                Characters
                            </h6>
                            <div class="grid grid-cols-4 text-sm mb-3">
                                <template
                                    v-for="character in characters"
                                    :key="character.malId"
                                >
                                    <CardCharacter size="TINY" :character="character" />
                                </template>
                            </div>
                            <NuxtLink
                                :to="`/anime/${route.params.slug}/characters`"
                                class="text-sm text-[#999]"
                            >
                                View all characters
                            </NuxtLink>
                        </div>
                    </template>
                    <template v-if="animeSeries">
                        <div class="divider my-4" />
                        <div>
                            <h6 class="text-[15px] font-bold mb-3">
                                More from this Series
                            </h6>
                            <div class="grid grid-cols-4 text-sm mb-3">
                                <template
                                    v-for="relatedAnime in animeSeries"
                                    :key="relatedAnime.id"
                                >
                                    <CardAnime size="TINY" :anime="relatedAnime.attributes" />
                                </template>
                            </div>
                            <NuxtLink
                                :to="`/anime/${route.params.slug}/franchise`"
                                class="text-sm text-[#999]"
                            >
                                View all in Attack on Titan
                            </NuxtLink>
                        </div>
                    </template>
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CardAnime } from '@@/src/entities/card-anime'
import { CardCharacter } from '@@/src/entities/card-character'
import { useFetch, useRoute, useHead } from 'nuxt/app';
import { onMounted, Ref, ref, useAttrs } from 'vue'
import { computed } from 'vue';
import { Character } from '@@/src/shared/types/character';

const route = useRoute()
const animeSeries = ref([])

const anime = await useAttrs().anime
const animeTitle = await useAttrs().animeTitle

useHead({
  title: String(animeTitle)
})

onMounted(() => {
  getAnimeSeries(anime.id)
})

async function getAnimeSeries(id: string) {
  const response = await fetch(`https://kitsu.io/api/edge/media-relationships?filter[source_id]=${ id }&filter[source_type]=Anime&include=destination&page[limit]=4&sort=role`)
  const data = await response.json()
  animeSeries.value = data.included
}

const animeDescription = ref(checkDescriptionLength(anime.details.description) ? anime.details.description.substr(0, 475) + '...' : anime.details.description)
const isShowCroppedDescription = ref(checkDescriptionLength(anime.details.description))
const animeDetails = computed(() => {
  const detailNames = ['titles', 'subtype', 'episodeCount', 'status', 'computedRating', 'computedLength']
  const result = {}

  detailNames.forEach(detailName => {
    const value = anime.details[detailName]
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
      case 'computedRating':
        return 'Rating'
      case 'computedLength':
        return 'Length'
    }
  }

  return result
})

const { data: characters }: { data: Character[] } = await useFetch(`https://kitsu.io/api/edge/anime/${7442}/anime-characters`, {
  key: 'listOfCharacters',
  query: {
    include:'character',
    'page[limit]': 4
  },
  transform: (r) => r.included.map(item => item.attributes)
})

function checkDescriptionLength(str: string):boolean {
  return str.length > 500
}

function readMore() {
  animeDescription.value = anime.details.description
  isShowCroppedDescription.value = false
}
</script>

<style scoped>

</style>