<template>
  <div class="dashboard-container">
    <h1>Admin Dashboard</h1>
    <p v-if="userName">Welcome, {{ userName }}!</p>
    <p v-else>Loading user data...</p>
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
    };
  },
  mounted() {
    this.loadUserData(); // Call method to load user data when component is mounted
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
          this.userName = response.data.name || "Guest";
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
  },
};
</script>

<style scoped>
.dashboard-container {
  background-color: #FFFFFF;
  margin-top: 80px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
