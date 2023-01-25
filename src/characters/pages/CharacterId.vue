<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '../composables/useCharacter';

const router = useRouter()
const route  = useRoute();

const { id } = route.params as { id: string }
const { character, hasError, errorMessage, isLoading } = useCharacter( id );

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-else-if="hasError">{{ errorMessage }}</h1>

    <div v-else-if="character">
        <h1>{{ character.name }}</h1>
        <div class="character-container">
            <img :src="character.image" :alt="character.name">
            <ul>
                <li>Especie: {{ character.species }}</li>
                <li>Tipo: {{ character.type }}</li>
                <li>Genero: {{ character.gender }}</li>
                <li>Origen: {{ character.origin.name }}</li>
                <li>Localización: {{ character.location.name }}</li>
                <li>Estado: {{ character.status }}</li>
                <li>Epidodios: {{ character.episode.join(', ') }}</li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.character-container {
    display: flex;
    flex-direction: row;
}
img {
    width: 150px;
    height: 150px;
    border-radius: 5px;
}
</style>