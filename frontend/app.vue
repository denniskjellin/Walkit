<template>
  <div>
    <NuxtWelcome />
  </div>
</template>


<script setup lang="ts">
const client = useSupabaseClient();

const { data: users } = await useAsyncData('users', async () => client.from('users').select('*').order('created_at', { ascending: true }))

console.log(users.value)
</script>
