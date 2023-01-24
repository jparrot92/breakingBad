<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';

import rickAndMortyApi from '@/api/rickAndMortyApi';
import characterStore from '@/store/characters.store';
import type { Character } from '../interfaces/character';


const route = useRoute();

const { id } = route.params as { id: string }

const getCharacterCacheFirst = async( characterId: string ):Promise<Character> => {
    if ( characterStore.checkIdInStore(characterId) ) {
        return characterStore.ids.list[characterId];
    }
    const { data } = await rickAndMortyApi.get<Character>(`/character/${ characterId }`);
    return data;
}

const { data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterCacheFirst(id),
    onSuccess(character){
        characterStore.loadedCharacter(character);
    },
})

</script>

<template>
    <h1 v-if="!character">Loading...</h1>

    <div v-else>
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