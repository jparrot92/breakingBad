<script setup lang="ts">
import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { Character } from '@/characters/interfaces/character';


rickAndMortyApi.get<Character>('/character').then(resp => {

    const name = resp.data.results[0].name
    console.log({name})
})

</script>

<template>
    <ul>
        <li>Hola</li>
        <li>Hola</li>
        <li>Hola</li>
    </ul>
</template>

<style scoped>

</style>