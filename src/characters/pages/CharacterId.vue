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
    const { data } = await rickAndMortyApi.get<Character>(`/characters/${ characterId }`);
    return data;
}

const { data: character } = useQuery({
    queryKey: ['characters', id],
    queryFn: () => getCharacterCacheFirst(id),
    onSuccess(character){
        characterStore.loadedCharacter(character);
    },
})

</script>

<template>
    <div>
        <h1>Character #{{ id }}</h1>
    </div>
</template>


<style scoped>

</style>