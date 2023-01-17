<script setup lang="ts">
import { ref } from 'vue';
import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { ResponseData, Character } from '@/characters/interfaces/character';

// const { results: characters } = (await rickAndMortyApi.get<ResponseData>('/character')).data
// const characters = ref<Character[]>(data)

const characters = ref<Character[]>([])

rickAndMortyApi.get<ResponseData>('/character').then(resp => {

    const name = resp.data.results[0].name
    console.log({name})

    characters.value = resp.data.results
})

</script>

<template>
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