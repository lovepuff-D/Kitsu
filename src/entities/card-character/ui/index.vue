<template>
  <div class="">
    <div class="relative">
      <img
        :src="character.image.original"
        alt=""
        :class="[size === 'MEDIUM' ? 'max-w-[155px]' : 'max-w-[55px]']"
        :title="character.name"
      >
      <!--<NuxtLink :to="`anime/${anime?.slug}`" class=""></NuxtLink>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineOptions, defineProps } from '@vue/runtime-core';
import { AnimeDetails } from '@@/shared/types/anime';

interface Props {
  size: 'MEDIUM' | 'TINY',
  character: AnimeDetails['details'],
}

defineOptions({name: 'card'})
defineProps<Props>()
</script>

<style scoped>

</style>