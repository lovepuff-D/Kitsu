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
                    <template
                        v-for="trendingAnime in listTrendingAnime"
                        :key="trendingAnime.id"
                    >
                        <CardAnime
                            size="MEDIUM"
                            :anime="trendingAnime.attributes"
                        />
                    </template>
                    <section class="flex flex-col gap-2">
                        <h6 class="font-semibold">
                            Trending This Week
                        </h6>
                        <div class="flex gap-3">
                            <CardAnime
                                v-for="trendingAnime in listTrendingAnime"
                                :key="trendingAnime.id"
                                size="MEDIUM"
                                :anime="trendingAnime.attributes"
                            />
                        </div>
                    </section>
                    <section class="flex flex-col gap-2">
                        <h6 class="font-semibold">
                            Most Popular Anime
                        </h6>
                        <div class="flex gap-3">
                            <CardAnime
                                v-for="trendingAnime in listMostPopularAnime"
                                :key="trendingAnime.id"
                                size="MEDIUM"
                                :anime="trendingAnime.attributes"
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
                    <p>Favourite categories will improve your recommendations</p>
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
import { CardAnime } from '@@/src/entities/card-anime'
/*import { useCategoryStore } from '~/store/categories'*/
import { useAsyncData, useFetch, useHead } from 'nuxt/app';
import { AnimeDetails } from '@@/src/shared/types/anime';

type animeList = {
    id: string;
    attributes: AnimeDetails['details'];
}[]


useHead({
    title: 'Explore Anime'
})

const {data: listTrendingAnime} = await useFetch('https://kitsu.io/api/edge/trending/anime', {
    key: 'listTrendingAnime',
    params: {
        limit: 5
    },
    transform: (r: any): animeList => r.data.map((item: any) => ({id: item.id, attributes: item.attributes}))
})
const {data: listMostPopularAnime} = await useFetch('https://kitsu.io/api/edge/anime', {
    key: 'listMostPopularAnime',
    params: {
        'page[limit]': 5,
        sort: '-user_count'
    },
    transform: (r: any): animeList => r.data.map((item: any) => ({id: item.id, attributes: item.attributes}))
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
