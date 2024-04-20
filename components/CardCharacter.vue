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
import { defineOptions } from '#imports';
// import { Character } from '~/types/character';


interface Props {
  size: 'MEDIUM' | 'TINY',
  character: Character,
}

defineOptions({name: 'Card'})
defineProps<Props>()
</script>

<style scoped>

</style>
