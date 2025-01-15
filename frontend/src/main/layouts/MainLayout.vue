<template>
  <div>
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="loading-bar"></div>

    <MainHeader />
    
    <main v-if="!isLoading">
      <router-view></router-view>
    </main>

    <MainFooter />
  </div>
</template>

<script>
import MainHeader from '../../components/main/MainHeader.vue';
import MainFooter from '../../components/main/MainFooter.vue';

export default {
  name: 'MainLayout',
  components: {
    MainHeader,
    MainFooter
  },
  data() {
    return {
      isLoading: true, // Flag to indicate loading status
    };
  },
  mounted() {
    // Simulate a delay for loading the content (you can replace it with your actual loading logic)
    setTimeout(() => {
      this.isLoading = false; // Hide loader once the content is ready
    }, 1000); // Adjust the timeout to match your content loading time
  }
};
</script>

<style scoped>
/* Loading Bar Style */
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #D32F2F; /* Red color for the loader */
  z-index: 9999; /* Ensure the loader stays on top */
  animation: loading 1s infinite linear; /* Animation for the loader */
}

/* Define animation for the loading bar */
@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

main {
  display: block; /* Ensure the main content is hidden until loading is done */
  transition: opacity 0.3s ease-in-out;
}
</style>
