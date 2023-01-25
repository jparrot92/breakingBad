import { computed, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import type { Character } from '@/characters/interfaces/character';
import rickAndMortyApi from '@/api/rickAndMortyApi';

const characterSet  = ref<{[id: string]:Character}>({});
const hasError      = ref<boolean>(false);
const errorMessage  = ref<string | null>(null);

const getCharacter = async( id: string ):Promise<Character> => {
    if ( characterSet.value[id] ) return characterSet.value[id];
    
    const { data } = await rickAndMortyApi.get<Character>(`/character/${ id }`);
    return data;
}

const loadedCharacter = ( character: Character ) => {
    hasError.value      = false;
    errorMessage.value  = null;

    characterSet.value[character.id] = character;

}

const loadedWithError = (error: any) => {
    hasError.value     = true;
    errorMessage.value = error.response.data.error;
}

const useCharacter = ( id: string ) => {

    const { isLoading } = useQuery({
        queryKey: ['character', id],
        queryFn: () => getCharacter(id),
        onSuccess: loadedCharacter,
        onError: loadedWithError,
    })

    return {
        // Properties
        list: characterSet,
        hasError,
        errorMessage,
        isLoading,

        // Getters
        character: computed<Character | null>( () => characterSet.value[id] ),

        // Methods
    }
}

export default useCharacter;