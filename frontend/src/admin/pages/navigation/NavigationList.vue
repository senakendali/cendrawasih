<template>
  <div class="dashboard-container">
    <div class="mb-2 page-title">
      <i class="bi bi-file-earmark-text"></i> Navigation Menu List
    </div>

    <div class="mb-2 d-flex justify-content-between align-items-center">
      <!-- Search Bar -->
      <input 
        v-model="searchQuery" 
        type="text" 
        class="form-control w-auto" 
        placeholder="" 
        @input="searchMenus" 
      />

      

      <!-- Create Menu Button -->
      <router-link to="/admin/navigation/create" class="button button-primary">
        <i class="bi bi-plus-square"></i> Create Menu
      </router-link>
    </div>


    <!-- Table to display navigation data -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="menu in menus.data" :key="menu.id">
          <td class="number-column">{{ menu.id }}</td>
          <td>{{ menu.name }}</td>
          <td>{{ menu.type }}</td>
          <td class="action-column">
            <div class="btn-group" role="group">
              <button type="button" class="button button-primary" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-card-checklist"></i> Action
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click="editMenu(menu.id)" ><i class="bi bi-pencil-square"></i> Edit</a></li>
                <li><a class="dropdown-item" href="#" @click="deleteMenu(menu.id)"><i class="bi bi-trash"></i> Delete</a></li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="pagination mt-4">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="btn btn-secondary">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="btn btn-secondary">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API from "@/config/api";

axios.defaults.baseURL = API.API_BASE_URL;

export default {
  name: "NavigationList",
  data() {
    return {
      menus: { data: [] }, // Store paginated menu data here
      currentPage: 1, // Current page in pagination
      totalPages: 1, // Total number of pages
      perPage: 10, // Records per page
      searchQuery: "", // Store search query
    };
  },
  mounted() {
    this.loadNavigationMenus(); // Load menu data when the component is mounted
  },
  methods: {
    async loadNavigationMenus(page = 1) {
      try {
        const response = await axios.get("/navigation-menus", {
          params: {
            page: page,
            perPage: this.perPage,
            search: this.searchQuery, // Include search query in the request
            },
          });

        if (response.data) {
          this.menus = response.data; // Store paginated data
          this.currentPage = response.data.current_page; // Update current page
          this.totalPages = response.data.total_pages; // Update total number of pages
        }
      } catch (error) {
        console.error("Error loading menus:", error);
      }
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.loadNavigationMenus(page); // Load data for the new page
      }
    },

    searchMenus() {
      this.loadNavigationMenus(); // Fetch data again when the search query changes
    },

    editMenu(id) {
      console.log("Edit menu with ID:", id);
      // Implement logic to edit the menu
    },

    deleteMenu(id) {
      console.log("Delete menu with ID:", id);
      // Implement logic to delete the menu (e.g., API call)
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  background-color: #ffffff;
  margin-top: 80px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  padding: 10px;
}

.navbar {
  background-color: #1E2A57 !important; /* Base color */
}

.navbar-toggler-icon {
  background-color: white; /* Ensure toggle icon is visible */
}

.nav-link {
  color: white !important; /* Navigation link color */
}

.pagination button {
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 10px;
}

.form-control {
  width: 250px;
}
</style>
