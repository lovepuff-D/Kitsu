<template>
  <div>
    <NuxtLink :to="`anime/${anime?.slug}`" class="relative">
      <img
        :src="anime?.posterImage.medium"
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
  anime: any,
}

defineOptions({name: 'card'})
defineProps<Props>()
</script>

<style scoped>

</style>