<template>
  <div class="dashboard">
    <div class="dashboard-container mb-3">

    
      <p v-if="userName">Welcome, {{ userName }}! Senang bertemu lagi.</p>
      <p v-else>Loading user data...</p>
      <p>Dibawah ini adalah kejuaran yang bisa Anda ikuti. Silahkan klik tombol daftar untuk mendaftarkan kontingen Anda.</p>
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <!-- Tournament Cards -->
      <div
        class="col"
        v-for="tournament in tournaments"
        :key="tournament.id"
      >
        <div class="card">
          <div class="card-image">
            <img src="@/assets/images/admin/silat.png" alt="" class="img-fluid">
          </div>
         
          <div class="card-body">
            
            <h5 class="card-title">{{ tournament.name }}</h5>
            <p class="card-text">{{ tournament.description }}</p>
           
            <div class="d-flex gap-2 justify-content-start">
              <router-link
              :to="{ name: 'contingent-registration', params: { id: tournament.id } }"
              class="button button-secondary"
              >
              Daftar
              </router-link>
              <button @click="downloadDocument(tournament.document)" class="button button-secondary">Download</button>
            </div>
            
          
          </div>
        </div>
      </div>
      <!-- End of Tournament Cards -->
    </div>

    
  </div>
</template>

<script>
import axios from "axios";
import API from "@/config/api"; // Import the API base URL configuration

// Set axios base URL (if needed)
axios.defaults.baseURL = API.API_BASE_URL;

export default {
  name: "DashboardPage",
  data() {
    return {
      userName: null, // Store user's name here
      tournaments: [], // Store tournament data
      searchQuery: "", // User's search input
      currentPage: 1, // Current page of results
      perPage: 10, // Results per page
      totalPages: 0, // Total number of pages
      prevPageUrl: null, // URL of the previous page
      nextPageUrl: null, // URL of the next page
      loading: false,
    };
  },
  mounted() {
    this.loadUserData(); // Call method to load user data when component is mounted
    this.loadTournamentData(); // Load sample tournament data
  },
  methods: {
    async loadUserData() {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          console.error("Token not found. User is not authenticated.");
          this.userName = "Guest";
          return;
        }

        // Fetch user data from the server
        const response = await axios.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token with the request
          },
        });

        if (response.data) {
          this.userName = response.data.user.name || "Guest";
        } else {
          console.log("User data is unavailable.");
          this.userName = "Guest"; // Fallback to "Guest"
        }
      } catch (error) {
        console.error("Error fetching user data:", error);

        // Handle specific errors, such as "Unauthenticated"
        if (error.response && error.response.status === 401) {
          console.warn("Unauthenticated request. Redirecting to login page.");
          this.$router.push("/admin/login"); // Redirect to login if unauthenticated
        } else {
          this.userName = "Guest"; // Default if another error occurs
        }
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
    // Sample method to load tournament data
    async loadTournamentData(page = 1) {
      this.loading = true;
      console.log(this.loading);
      try {
        const response = await axios.get("/tournaments", {
          params: {
            page,
            perPage: this.perPage,
            search: this.searchQuery.trim(),
          },
        });
        const {
          current_page,
          last_page,
          data,
          next_page_url,
          prev_page_url,
        } = response.data;

        this.tournaments = data; // Assign team members
        this.currentPage = current_page; // Current page
        this.totalPages = last_page; // Total pages
        this.nextPageUrl = next_page_url; // Next page URL
        this.prevPageUrl = prev_page_url; // Previous page URL
        this.loading = false;
      } catch (error) {
        console.error("Error loading members:", error);
      }
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.loadTournamentData(page);
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  background-color:transparent;
  margin-top: 80px;
 
  
}

.card {
  border: none;
  border-top: 5px solid #388E3C;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-image {
  margin-top: 20px;
  max-height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  margin-bottom: 15px;
}

.list-unstyled {
  margin-bottom: 15px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  font-size: 14px;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
