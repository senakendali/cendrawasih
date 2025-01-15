<template>
  <div class="dashboard">
    <h1>Admin Dashboard</h1>
    <p v-if="userName">Welcome, {{ userName }}!</p>
    <p v-else>Loading user data...</p>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <!-- Tournament Cards -->
      <div
        class="col"
        v-for="tournament in tournaments"
        :key="tournament.id"
      >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ tournament.name }}</h5>
            <p class="card-text">{{ tournament.details }}</p>
            <ul class="list-unstyled">
              <li><strong>Location:</strong> {{ tournament.location }}</li>
              <li><strong>Start Date:</strong> {{ tournament.startDate }}</li>
              <li><strong>Participants:</strong> {{ tournament.participants.join(', ') }}</li>
            </ul>
            <button class="btn btn-primary">View Details</button>
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
    // Sample method to load tournament data
    loadTournamentData() {
      this.tournaments = [
        {
          id: 1,
          name: "Spring Martial Arts Tournament",
          details: "This tournament features multiple martial arts disciplines including karate, judo, and taekwondo.",
          location: "Tokyo, Japan",
          startDate: "2025-04-15",
          participants: ["Alice", "Bob", "Charlie", "David"],
        },
        {
          id: 2,
          name: "Summer Fighting Championship",
          details: "A high-stakes fighting championship with intense competition among the world's best fighters.",
          location: "Las Vegas, USA",
          startDate: "2025-06-10",
          participants: ["Eve", "Frank", "Grace", "Henry"],
        },
        {
          id: 3,
          name: "Winter Martial Arts League",
          details: "A prestigious tournament that brings together martial artists from around the world.",
          location: "Moscow, Russia",
          startDate: "2025-12-01",
          participants: ["Ivy", "Jack", "Kathy", "Liam"],
        },
      ];
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
  border-top: 3px solid #1E2A57;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  border-radius: 10px 10px 0 0;
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
