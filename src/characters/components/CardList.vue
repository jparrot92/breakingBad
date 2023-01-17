<script setup lang="ts">
import { ref } from 'vue';
import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { ResponseData, Character } from '@/characters/interfaces/character';
import { useCharacters } from '../composables/useCharacters';

// const { results: characters } = (await rickAndMortyApi.get<ResponseData>('/character')).data
// const characters = ref<Character[]>(data)

const { isLoading, characters, hasError, errorMessage } = useCharacters()

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-if="hasError">{{ errorMessage }}</h1>
    <ul>
        <li
            v-for="{ id, name } of characters"
            :key="id"
        >
            {{ name }}
        </li>
    </ul>
</template>

<style scoped>

</style>