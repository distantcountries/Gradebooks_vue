<template>
  <nav v-if="numberOfPages > 1">
  
      <div :class="{ 'active': currentPage === page }" v-for="page in numberOfPages" :key="page">

      </div>
      <button @click="selectPage(page)">Load more</button>
    
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    numberOfPages: {
      type: Number,
      required: true,
      default: 0
    },
    currentPage: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    selectPage(page) {
      this.$emit('selected-page', page)
    }
  }
}
</script>