<template>
  <div>
    <h1 class="text-green-700">Hello world</h1>
    {{ response }}
  </div>
</template>


<script setup lang="ts">
import {ref} from "vue"
const test = "123";
const {data: api} = await useFetch(`/api/hello?param1=${test}`);

const info = ref(api);

const client = useSupabaseClient();

const { data: users } = await useAsyncData('users', async () => client.from('users').select('*').order('created_at', { ascending: true }))

console.log(users.value)

const response = await $fetch('/api/hello')
</script>
