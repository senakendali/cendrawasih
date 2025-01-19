<template>
  <div>
    <!-- Loader -->
    <div v-if="isLoading" class="loading-bar"></div>

    <!-- Main Banner Section -->
    <div class="image-container w-100 h-100">
      <img src="@/assets/images/main/banner/main-banner.png" alt="Logo" class="img-fluid w-100 h-100" />
      <div v-if="!isLoading" :class="['caption-overlay', isScrolled ? 'scrolled' : '']">
        <div class="caption-content">
          <h1 class="caption-title">{{ tournamentName }}</h1>
          <p class="caption-description">
            {{ tournamentDescription }}
          </p>
          <div class="d-flex gap-2 justify-content-center">
            
            <router-link
              v-if="slug"
              :to="{ name: 'registration', params: { slug: slug } }"
              class="btn btn-primary"
            >
            Daftar
          </router-link>
            <button @click="downloadDocument(document)" class="btn btn-primary">Download</button>
          </div>
        </div>
      </div>
    </div>

    <TournamentInfo
      :tournament="{
        location: tournamentLocation,
        event_date: tournamentDate,
        matchCategories:matchCategories,
        ageCategories:ageCategories
      }"
    />

    <!-- Our Activity Section -->
    <OurActivity :activities="activities"/>
  </div>
</template>


<script>
import TournamentInfo from '@/components/main/TournamentInfo.vue';
import OurActivity from '@/components/main/OurActivity.vue';
import axios from 'axios'; // Axios for API requests

export default {
  name: 'HomePage',
  components: {
    TournamentInfo,
    OurActivity,
  },
  data() {
    return {
      isScrolled: false,
      isLoading: false, // State to manage loader visibility
      tournamentId: null,
      tournamentName: '',
      slug: '',
      tournamentDescription: '',
      tournamentDate: '',
      tournamentLocation: '',
      dateStart: '',
      dateEnd: '',
      document: '',
      matchCategories: [],
      ageCategories: [],
      activities: [],
    };
  },

  created() {
    this.fetchTournamentDetail();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 100;
    },

    async fetchTournamentDetail() {
      this.isLoading = true; // Show loader
      try {
        const response = await axios.get(`/tournaments/highlight`);
        if (response.data) {
          this.tournamentId = response.data.id;
          this.tournamentName = response.data.name;
          this.slug = response.data.slug;
          this.tournamentDescription = response.data.description;
          this.tournamentDate = response.data.event_date;
          this.tournamentLocation = response.data.location;
          this.dateStart = response.data.start_date;
          this.dateEnd = response.data.end_date;
          this.matchCategories = response.data.categories;
          this.ageCategories = response.data.age_categories;
          this.document = response.data.document;
          this.activities = response.data.activities;
        }
      } catch (error) {
        this.toast.error("Error fetching contingent details.");
      } finally {
        this.isLoading = false;
      }
    },
    async downloadDocument(filename) {
      this.isLoading = true; // Show loader
      try {
        const response = await axios.get(
          `/download-document/${filename}`,
          { responseType: 'blob' } // Ensure the file is treated as binary data
        );

        // Create a link element and trigger a download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // Set the downloaded file name
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('Error downloading the document:', error);
        alert('Failed to download the document. Please try again later.');
      } finally {
        this.isLoading = false; // Hide loader
      }
    },
  },
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
