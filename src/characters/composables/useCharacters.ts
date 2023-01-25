import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import type { Character, ResponseData } from '@/characters/interfaces/character';
import rickAndMortyApi from '@/api/rickAndMortyApi';

const characters    = ref<Character[]>([]);
const hasError      = ref<boolean>(false);
const errorMessage  = ref<string | null>(null);

const getCharacters = async(): Promise<Character[]> => {

    if(characters.value.length > 0){
        return characters.value
    }

    const { data } = await rickAndMortyApi.get<ResponseData>('/character')
    return data.results
}

const loadedCharacters = ( data: Character[] ) => {
    errorMessage.value = null;
    hasError.value = false;
    characters.value = data;
}

const loadCharactersFailed = ( error: any ) => {
    errorMessage.value = error.response.data.error;
    hasError.value = true;
    characters.value = [];
}

const useCharacters = () => {

    const { isLoading } = useQuery({
        queryKey: ['characters'],
        queryFn: getCharacters,
        onSuccess: loadedCharacters,
        onError: loadCharactersFailed
    })

    return {
        // Properties
        characters,
        isLoading,
        hasError,
        errorMessage, 

        // Getters
        count: characters.value.length

        // Methods
    }
}

export default useCharacters;