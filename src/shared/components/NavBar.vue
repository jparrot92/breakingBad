<script setup lang="ts">
import type { RouterLink } from '@/router/link-routes';


interface Props {
    title: string
    links: RouterLink[]
}

const props = defineProps<Props>()

</script>

<template>
    <nav>
        <img src="@/assets/logo.svg" alt="Vue Logo" height="25" width="25" />
        <span>{{props.title || 'no title'}}</span>

        <RouterLink
            v-for="link of props.links"
            :key="link.path"
            :to="link.path"
        >
            {{ link.title }}
        </RouterLink>

        <!-- <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/about">Sobre</RouterLink> -->
    </nav>
</template>

<style scoped>
nav {
    align-items: flex-start;
    display: flex;
    font-size: 12px;
    margin-top: 10px;
    text-align: center;
    width: 100%;
}
img {
    margin-right: 5px;
}
span {
    margin-right: 10px;
}
a {
   margin-right: 5px; 
}
</style>