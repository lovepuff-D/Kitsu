<template>
    <div :class="$attrs.class">
        <NuxtLink
            v-if="anime"
            :to="`/anime/${anime?.slug}`"
            class="relative"
            @mouseenter="isHover = true"
            @mouseleave="isHover = false"
        >
            <img
                :src="anime?.posterImage.medium"
                alt="Poster image of anime"
                :class="imgClasses"
                :title="anime.canonicalTitle"
            >
            <div
                v-if="(anime.description && isHover)"
                class="absolute -top-2 left-full min-h-[200px] z-10 w-[350px] bg-[#332532] text-[#cebccd] rounded p-3 flex flex-col gap-1 translate-x-3"
            >
                <h3 class="font-bold text-md">
                    {{ getAnimeTitle(anime) }} year
                    <!--TODO-->
                    <!--<span class="font-bold text-[17px] text-[#999]">
                        {{ anime.details.startDate.split('-')[0] }}
                    </span>-->
                </h3>
                <div v-if="anime.averageRating" class="text-[#1abc9c] text-md">
                    {{ anime.averageRating }}%
                </div>
                <div class="flex justify-between gap-2">
                    <div v-if="anime.popularityRank" class="flex items-center gap-2 w-1/2 text-sm">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 1792 1792"
                            fill="#e74c3c"
                            class="shrink-0"
                        >
                            <path d="M896 1664q-26 0-44-18l-624-602q-10-8-27.5-26T145 952.5 77 855 23.5 734 0 596q0-220 127-344t351-124q62 0 126.5 21.5t120 58T820 276t76 68q36-36 76-68t95.5-68.5 120-58T1314 128q224 0 351 124t127 344q0 221-229 450l-623 600q-18 18-44 18z"/>
                        </svg>
                        #{{ anime.popularityRank }} Most Popular
                    </div>
                    <div v-if="anime.ratingRank" class="flex items-center justify-end gap-2 w-1/2 text-sm">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 26 26"
                            fill="#f39c12"
                            class="shrink-0"
                        >
                            <path d="M25.326 10.137a1.001 1.001 0 00-.807-.68l-7.34-1.066-3.283-6.651c-.337-.683-1.456-.683-1.793 0L8.82 8.391 1.48 9.457a1 1 0 00-.554 1.705l5.312 5.178-1.254 7.31a1.001 1.001 0 001.451 1.054L13 21.252l6.564 3.451a1 1 0 001.451-1.054l-1.254-7.31 5.312-5.178a.998.998 0 00.253-1.024z"/>
                        </svg>
                        #{{ anime.ratingRank }} Highest Rated
                    </div>
                </div>
                <div class="text-sm max-h-[125px] overflow-hidden">
                    {{ anime.description }}
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { defineOptions } from '#imports';
import { AnimeDetails } from '~/types/anime';
import getAnimeTitle from '~/utils/animeHelpers';

interface Props {
    size: 'MEDIUM' | 'TINY',
    anime: AnimeDetails['details'] | null,
    noRounded?: boolean,
}

defineOptions({
    name: 'Card',
    inheritAttrs: false
})
const props = withDefaults(defineProps<Props>(), {
    size: 'MEDIUM',
    anime: null,
    noRounded: false,
})

const isHover = ref(false)

const imgClasses = computed(() => {
    return {
        'max-w-[155px]': props.size === 'MEDIUM',
        'max-w-[55px]': props.size === 'TINY',
        'rounded': !props.noRounded
    }
})

</script>

<style scoped>

</style>
