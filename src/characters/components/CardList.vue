<script setup lang="ts">
import { ref } from 'vue';
import CharacterCard from '@/characters/components/CharacterCard.vue';

import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { ResponseData, Character } from '@/characters/interfaces/character';
import { useCharacters } from '../composables/useCharacters';
import { useQuery } from '@tanstack/vue-query';

//! 1- Normal suspense
// const { results: characters } = (await rickAndMortyApi.get<ResponseData>('/character')).data
// const characters = ref<Character[]>(data)

//! 2- Composable functions
// const { isLoading, characters, hasError, errorMessage } = useCharacters()

//! 3- TanStack Query
const getCharactersSlow = async():Promise<Character[]> => {

    return new Promise( (resolve) => {
        setTimeout( async() => {
            const results = await rickAndMortyApi.get<ResponseData>('/character')
            resolve (results.data.results)
        }, 1000)
    })

    
}

const { isLoading, isError, data: characters, error } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharactersSlow,
    cacheTime: 1000 * 60,
    refetchOnReconnect: 'always'
})

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    
    <div class="card-list">
        <CharacterCard
            v-for="character of characters"
            :key="character.id"
            :character="character"
        />
    </div>
</template>

<style scoped>
.card-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>