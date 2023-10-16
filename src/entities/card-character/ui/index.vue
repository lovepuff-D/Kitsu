<template>
  <div class="">
    <NuxtLink :to="`anime/${character?.slug}`" class="relative">
      <img
        :src="character?.posterImage.medium"
        alt=""
        :class="[size === 'MEDIUM' ? 'max-w-[155px]' : 'max-w-[55px]']"
      >
      <!--<NuxtLink :to="`anime/${anime?.slug}`" class=""></NuxtLink>-->
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { defineOptions, defineProps } from '@vue/runtime-core';

interface Props {
  size: 'MEDIUM' | 'TINY',
  character: any,
}

defineOptions({name: 'card'})
defineProps<Props>()
</script>

<style scoped>

</style>