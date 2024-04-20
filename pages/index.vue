<template>
    <div class="container mt-[84px]">
        <div class="w-full flex gap-8 h-full ">
            <div class="flex flex-col gap-12 flex-1">
                <div class="flex flex-col gap-3">
                    <h2 class="text-2xl font-semibold">
                        Explore Anime
                    </h2>
                    <input
                        type="text"
                        class="p-2"
                        placeholder="What are you searching for?"
                    >
                    <div>
                        Or, browse with the
                        <a href="" class="text-[#f75239]">advanced search</a>
                    </div>
                </div>
                <div class="flex flex-col gap-8">
                    <section class="flex flex-col gap-2">
                        <h6 class="font-semibold">
                            Trending This Week
                        </h6>
                        <div class="flex gap-3">
                            <ComponentsCardAnime
                                v-for="anime in trendingAnime"
                                :key="anime.id"
                                size="MEDIUM"
                                :anime="anime.attributes"
                                no-rounded
                            />
                        </div>
                    </section>
                    <section class="flex flex-col gap-2">
                        <h6 class="font-semibold">
                            Top Airing Anime
                        </h6>
                        <div class="flex gap-3">
                            <ComponentsCardAnime
                                v-for="anime in airingAnime"
                                :key="anime.id"
                                size="MEDIUM"
                                :anime="anime.attributes"
                            />
                        </div>
                    </section>
                    <section class="flex flex-col gap-2">
                        <h6 class="font-semibold">
                            Upcoming Anime
                        </h6>
                        <div class="flex gap-3">
                            <ComponentsCardAnime
                                v-for="anime in upcomingAnime"
                                :key="anime.id"
                                size="MEDIUM"
                                :anime="anime.attributes"
                            />
                        </div>
                    </section>
                    <section class="flex flex-col gap-2">
                        <h6 class="font-semibold">
                            Highest Rated Anime
                        </h6>
                        <div class="flex gap-3">
                            <ComponentsCardAnime
                                v-for="anime in highestRateAnime"
                                :key="anime.id"
                                size="MEDIUM"
                                :anime="anime.attributes"
                            />
                        </div>
                    </section>
                    <section class="flex flex-col gap-2">
                        <h6 class="font-semibold">
                            Most Popular Anime
                        </h6>
                        <div class="flex gap-3">
                            <ComponentsCardAnime
                                v-for="anime in popularAnime"
                                :key="anime.id"
                                size="MEDIUM"
                                :anime="anime.attributes"
                            />
                        </div>
                    </section>
                </div>
            </div>
            <div class="flex flex-col gap-8 bg-white self-start p-6">
                <div>
                    <h5 class="mb-4">
                        MY FAVORITE CATEGORIES
                    </h5>
                    <!--TODO Add favorites via localStorage-->
                    <p>Favoriting categories will improve your recommendations. (Add via localStorage)</p>
                </div>
                <div>
                    <h5 class="mb-4">
                        MY FAVORITE CATEGORIES
                    </h5>
                    <!--<ul class="flex flex-wrap mb-4">
                      <li v-for="category in categories" :key="category.id" class="basis-1/2">
                        {{ category.attributes.title }}
                      </li>
                    </ul>-->
                    <a
                        href=""
                        class="block text-right"
                    >More categories…</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// TODO нормально типитизировать
// import { useCategoryStore } from '~/store/categories'
import { useFetch, useHead } from '#imports';
import { AnimeDetails } from '~/types/anime';

type animeList = {
    id: string;
    attributes: AnimeDetails['details'];
}[]


useHead({
    title: 'Explore Anime'
})

function fetchTransform(response: any): animeList {
    return response.data.map((item: any) => ({id: item.id, attributes: item.attributes}));
}

const {data: trendingAnime} = await useFetch('https://kitsu.io/api/edge/trending/anime', {
    key: 'trendingAnime',
    params: {
        limit: 5
    },
    transform: fetchTransform
})
const {data: airingAnime} = await useFetch('https://kitsu.io/api/edge/anime', {
    key: 'airingAnime',
    params: {
        'filter[status]': 'current',
        'page[limit]': 5,
        sort: '-user_count'
    },
    transform: fetchTransform
})
const {data: upcomingAnime} = await useFetch('https://kitsu.io/api/edge/anime', {
    key: 'upcomingAnime',
    params: {
        'filter[status]': 'upcoming',
        'page[limit]': 5,
        sort: '-user_count'
    },
    transform: fetchTransform
})
const {data: highestRateAnime} = await useFetch('https://kitsu.io/api/edge/anime', {
    key: 'highestRateAnime',
    params: {
        'page[limit]': 5,
        sort: '-average_rating'
    },
    transform: fetchTransform
})
const {data: popularAnime} = await useFetch('https://kitsu.io/api/edge/anime', {
    key: 'popularAnime',
    params: {
        'page[limit]': 5,
        sort: '-user_count'
    },
    transform: fetchTransform
})
/*let {data: categories} = await useFetch('https://kitsu.io/api/edge/categories')*/

/*let {categories} = useCategoryStore()*/

/*const listTrendingAnime = ref([])*/
/*const listMostPopularAnime = ref([])*/
/*async function getTrendingAnime() {
  let response = await fetch(`${ 'https://kitsu.io/api/edge' }/trending/anime?limit=5`, {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  })
  let responseData = await response.json()
  return responseData.data
  listTrendingAnime.value = responseData.data
}
async function getMostPopularAnime() {
  let response = await fetch(`${ 'https://kitsu.io/api/edge' }/anime?page[limit]=5&`, {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  })
  let responseData = await response.json()
  listMostPopularAnime.value = responseData.data
}

onMounted(() => {
  /!*getTrendingAnime()
  getMostPopularAnime()*!/
})*/

</script>

<style>

</style>
