import { reactive } from "vue";
import type { Character, ResponseData } from "@/characters/interfaces/character";
import rickAndMortyApi from "@/api/rickAndMortyApi";

interface Store {
    characters: {
        list: Character[];
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },
    ids: {
        list: {
            [id: string]: Character;
        };
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },

    // Métodos de Characters
    startLoadingCharacters: () => void;
    loadedCharacters: ( data: Character[] ) => void;
    loadCharactersFailed: ( error: any ) => void;

    // Métodos de Characters por IDs
    startLoadingCharacter: () => void;
    checkIdInStore: (id: string) => boolean;
    loadedCharacter: (character: Character) => void;
}

// Initial State
const characterStore = reactive<Store>({
    characters: {
        count: 0,
        errorMessage: null,
        hasError: false,
        isLoading: true,
        list: []
    },

    ids: {
        list: {},
        isLoading: false,
        hasError: false,
        errorMessage: null
    },

    // Métodos
    async startLoadingCharacters() {
        const { data } = await rickAndMortyApi.get<ResponseData>('/character')
        this.loadedCharacters(data.results)
    },
    loadedCharacters( data: Character[] ) {
        this.characters = {
            count: data.length,
            errorMessage: null,
            hasError: false,
            isLoading: false,
            list: data,
        }
    },
    loadCharactersFailed( error: any ) {
        this.characters = {
            count: 0,
            errorMessage: error.response.data.error,
            hasError: true,
            isLoading: false,
            list: []
        }
    },

    // Métodos de Characters por IDs
    startLoadingCharacter(){
        this.ids = {
            ...this.ids,
            isLoading: true,
            hasError: false,
            errorMessage: null,
        }
    },
    checkIdInStore(id: string) {
        return !!this.ids.list[id];
    },
    loadedCharacter(character: Character) {
        this.ids.isLoading = false;
        this.ids.list[character.id] = character;
    }
});

characterStore.startLoadingCharacters();

export default characterStore;