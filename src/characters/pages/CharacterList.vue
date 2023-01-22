<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import characterStore from '@/store/characters.store';

import rickAndMortyApi from '@/api/rickAndMortyApi';
import CardList from '@/characters/components/CardList.vue'
import type { ResponseData, Character } from '@/characters/interfaces/character';


const props = defineProps<{ title: string, visible: boolean}>()

const getCharacters = async(): Promise<Character[]> => {
    const { data } = await rickAndMortyApi.get<ResponseData>('/character')
    return data.results
}

const { isLoading, data } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
    onSuccess(data){
        characterStore.loadedCharacters(data)
    }
})

</script>

<template>
    <h1 v-if="characterStore.characters.isLoading">Loading...</h1>

    <template v-else>
        <h2>{{ props.title }}</h2>

        <CardList :characters="characterStore.characters.list"/>
    </template>

</template>


<style scoped>

</style>