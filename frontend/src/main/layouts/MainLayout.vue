<template>
  <div>
    <!-- Loading Overlay and Indicator -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-bar"></div>
    </div>

    <MainHeader />
    
    <main :class="{ 'fade-in': !isLoading }">
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
/* Loading Container */
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1); /* Black color for the overlay */
  z-index: 9999; /* Ensure the overlay stays on top */
}

/* Loading Bar Style */
.loading-bar {
  position: absolute;
  top: 0; /* Position at the top */
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #D32F2F; /* Red color for the loader */
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

/* Fade-in Transition for Main Content */
main {
  opacity: 0; /* Start with opacity 0 */
  transition: opacity 0.5s ease-in-out; /* Smooth transition for opacity */
}

main.fade-in {
  opacity: 1; /* Fade to opacity 1 */
}
</style>
