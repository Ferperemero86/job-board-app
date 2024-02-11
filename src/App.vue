<script setup>
import { onMounted } from 'vue'

//const serverData = ref(null)

const fetchServerData = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/data', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const result = await response.json()
    console.log('RESULT', result)
    //serverData.value = result.message
  } catch (error) {
    console.error('There was a problem fetching server data:', error)
  }
}

// Fetch data when the component is mounted
onMounted(fetchServerData)
</script>

<template>
  <div>
    <h1 class="text-3xl">Job board app</h1>
  </div>
</template>
