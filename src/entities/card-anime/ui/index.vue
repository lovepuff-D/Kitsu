<template>
    <div :class="$attrs.class">
        <NuxtLink :to="`/anime/${anime?.slug}`" class="relative">
            <img
                :src="anime?.posterImage.medium"
                alt=""
                :class="[size === 'MEDIUM' ? 'max-w-[155px]' : 'max-w-[55px]']"
                :title="anime.canonicalTitle"
            >
            <!--<NuxtLink :to="`anime/${anime?.slug}`" class=""></NuxtLink>-->
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { defineOptions, defineProps } from 'vue';
import { AnimeDetails } from '@@/src/shared/types/anime';

interface Props {
  size: 'MEDIUM' | 'TINY',
  anime: AnimeDetails['details'],
}

defineOptions({
  name: 'Card',
  inheritAttrs: false
})
defineProps<Props>()
</script>

<style scoped>

</style>