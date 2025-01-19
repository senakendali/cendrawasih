<template>
  <header class="admin-header navbar navbar-expand-lg bg-white fixed-top">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-bell"></i>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>{{ userName || 'Guest' }}</span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <!--li><a class="dropdown-item" href="#">Profile</a></li-->
              <li><a class="dropdown-item" href="#" @click.prevent="logout">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification'; // Import Vue Toastification
import API from "@/config/api"; // Import the API base URL configuration

// Set axios base URL (if needed)
axios.defaults.baseURL = API.API_BASE_URL;

export default {
  name: 'AdminHeader',
  data() {
    return {
      userName: null, // Initialize userName as null
    };
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    // Function to check authentication on page load
    checkAuthentication() {
      const toast = useToast();
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.success('Token not found. User is not authenticated.', { position: 'top-right' });
        this.$router.push("/admin/login"); // Redirect to login page
        return;
      }

      if (userData && userData.name) {
        this.userName = userData.name; // Set userName if available
      } else {
        this.userName = 'Guest'; // Fallback if user data is not found
      }
    },

    // Logout function to clear session and user data
    async logout() {
      const toast = useToast();

      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        // Make logout request to the API
        await axios.post('/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Clear user data and token from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');

        // Show success toast
        toast.success('Logged out successfully!', { position: 'top-right' });

        // Redirect to login page
        this.$router.push('/admin/login');
      } catch (error) {
        console.error('Error during logout:', error);
        toast.error('An error occurred during logout. Please try again.', { position: 'top-right' });
      }
    },
  },
};
</script>

<style scoped>
.admin-header {
  border-radius: 5px;
}

.admin-header .navbar-brand img {
  width: 40px;
}
</style>
