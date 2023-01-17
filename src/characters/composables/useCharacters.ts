import rickAndMortyApi from "@/api/rickAndMortyApi"
import { ref } from "vue"
import type { Character, ResponseData } from "../interfaces/character"

export const useCharacters = () => {

    const characters = ref<Character[]>([])
    const isLoading = ref<boolean>(true)

    rickAndMortyApi.get<ResponseData>('/character').then(resp => {
        // const name = resp.data.results[0].name
        // console.log(name)

        characters.value = resp.data.results
        isLoading.value = false
    })


    return {
        characters,
        isLoading
    }
}