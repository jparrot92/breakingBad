<script setup lang="ts">
import rickAndMortyApi from '@/api/rickAndMortyApi';


rickAndMortyApi.get('/character').then(resp => {
    console.log({resp})
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