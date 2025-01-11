<template>
  <div>
    <!-- Main Banner Section -->
    <div class="image-container w-100 h-100">
      <img src="@/assets/images/main/banner/main-banner.png" alt="Logo" class="img-fluid w-100 h-100" />
      <div :class="['caption-overlay', isScrolled ? 'scrolled' : '']">
        <div class="caption-content">
          <h1 class="caption-title">Bogor Pencak Silat Series 1 Tahun 2025</h1>
          <p class="caption-description">
            Kami mengundang para pesilat berbakat untuk bergabung dalam ajang yang penuh semangat dan prestisius ini. Tunjukkan keahlian Anda dalam seni bela diri tradisional Indonesia dan buktikan bahwa Anda layak menjadi yang terbaik.
          </p>
          <router-link to="/pendaftaran" class="btn btn-primary">Daftar</router-link>
        </div>
      </div>
    </div>

    <!-- Why Us Section -->
    <TournamentInfo />

    <!-- Our Activity Section -->
    <OurActivity />
  </div>
</template>

<script>
import TournamentInfo from '@/components/main/TournamentInfo.vue';
import OurActivity from '@/components/main/OurActivity.vue';  // Ensure the correct import path

export default {
  name: 'HomePage',
  components: {
    TournamentInfo,
    OurActivity,  // Register the OurFeature component correctly
  },
  data() {
    return {
      isScrolled: false, // Flag to track whether the page has been scrolled
    };
  },
  mounted() {
    // Listen to scroll event on mounted
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    // Clean up the event listener when the component is destroyed
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Check if page has been scrolled more than 100px
      if (window.scrollY > 100) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    }
  }
};
</script>

<style scoped>
/* Container to hold the image and caption */
.image-container {
  position: relative;
  width: 100%;
  height: 100vh; /* Make the container take full viewport height */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the full container */
}

.caption-overlay {
  position: fixed; /* Start with the caption fixed */
  bottom: 0; /* Fix the caption to the bottom of the container */
  left: 50%; /* Center the caption horizontally */
  transform: translateX(-50%); /* Adjust horizontal position */
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  padding: 20px 30px;
  width: 100%; /* Full width */
  box-sizing: border-box; /* To include padding in the width */
  transition: all 0.3s ease; /* Smooth transition */
}

.caption-overlay.scrolled {
  position: absolute; /* Change to absolute when scrolled */
  bottom: 0; /* Keep it at the bottom of the image */
}

.caption-content {
  text-align: center;
}

.caption-title {
  font-family: "Urbanist", sans-serif;
  color: white;
  font-size: 2.5rem; /* Adjust font size */
  margin-bottom: 10px;
}

.caption-description {
  color: white;
  font-size: 1.2rem; /* Adjust font size */
  margin-bottom: 20px;
  font-family: "Urbanist", sans-serif;
}

.caption-overlay .btn-primary {
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  background-color: #D32F2F; /* Red background for the button */
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.caption-overlay .btn-primary:hover {
  background-color: #FF5722; /* Darker red on hover */
}
</style>
