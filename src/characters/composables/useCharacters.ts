import axios from "axios"
import { onMounted, ref } from "vue"

import type { Character, ResponseData } from "../interfaces/character"
import rickAndMortyApi from "@/api/rickAndMortyApi"

const characters = ref<Character[]>([])
const isLoading = ref<boolean>(true)
const hasError = ref<boolean>(false)
const errorMessage = ref<string>()

export const useCharacters = () => {

    onMounted(async()=>{
        await loadCharacters()
    })

    const loadCharacters = async () => {
        if( characters.value.length ) return

        isLoading.value = true
        try {
            const { data } = await rickAndMortyApi.get<ResponseData>('/character')
            characters.value = data.results
            isLoading.value = false

        } catch (error) {
            hasError.value = true
            isLoading.value = false
            
            if(axios.isAxiosError(error)){
                return errorMessage.value = error.message
            }
            errorMessage.value = JSON.stringify(error)
        }
    }


    return {
        characters,
        isLoading,
        hasError,
        errorMessage
    }
}