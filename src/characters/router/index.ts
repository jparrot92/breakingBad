import type { RouteRecordRaw } from "vue-router";

import CharacterLayout from "@/characters/layout/CharacterLayout.vue";
import CharacterId from "@/characters/pages/CharacterId.vue";
import CharacterList from "@/characters/pages/CharacterSearch.vue";
import CharacterSearch from "@/characters/pages/CharacterSearch.vue";

export const characterRoute: RouteRecordRaw = {
    path: '/characters',
    redirect: '/characters/list',
    component: CharacterLayout,
    children: [
        { path: 'by/id', name: 'character-id', component: CharacterId },
        { path: 'list', name: 'character-list', component: CharacterList },
        { path: 'search', name: 'character-search', component: CharacterSearch },
    ]
}