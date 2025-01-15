<template>
  <div class="dashboard-container">
    <div class="mb-2 page-title">
      <i class="bi bi-file-earmark-text"></i> Contingent List
    </div>

    <div class="mb-2 d-flex justify-content-between align-items-center">
      <!-- Search Bar -->
      <input 
        v-model="searchQuery" 
        type="text" 
        class="form-control w-auto" 
        placeholder="Search contingents..." 
        @input="searchContingents" 
      />

      <!-- Create Contingent Button -->
      <router-link to="/admin/contingent/create" class="button button-primary">
        <i class="bi bi-plus-square"></i> Add Contingent
      </router-link>
    </div>

    <!-- Table to display contingent data -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Contingent Name</th>
          <th>PIC</th>
          <th>PIC Phone</th>
          <th>PIC Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contingent in contingents.data" :key="contingent.id">
          <td class="number-column">{{ contingent.id }}</td>
          <td>{{ contingent.name }}</td>
          <td>{{ contingent.pic_name }}</td>
          <td>{{ contingent.pic_phone }}</td>
          <td>{{ contingent.pic_email }}</td>
          <td class="action-column">
            <div class="btn-group" role="group">
              <button type="button" class="button button-primary" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-card-checklist"></i> Action
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click.prevent="editContingent(contingent.id)"><i class="bi bi-pencil-square"></i> Edit</a></li>
                <li><a class="dropdown-item" href="#" @click.prevent="deleteContingent(contingent.id)"><i class="bi bi-trash"></i> Delete</a></li>
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
  name: "ContingentList",
  data() {
    return {
      contingents: { data: [] }, // Paginated contingent data
      currentPage: 1, // Current page number
      totalPages: 1, // Total number of pages
      perPage: 10, // Records per page
      searchQuery: "", // Search query
    };
  },
  mounted() {
    this.loadContingents(); // Fetch contingents when the component loads
  },
  methods: {
    async loadContingents(page = 1) {
      try {
        const response = await axios.get("/contingents", {
          params: {
            page: page,
            perPage: this.perPage,
            search: this.searchQuery, // Search query
          },
        });

        if (response.data) {
          this.contingents = response.data; // Store contingent data
          this.currentPage = response.data.current_page || 1; // Update current page
          this.totalPages = response.data.total_pages || 1; // Update total pages
        }
      } catch (error) {
        console.error("Error fetching contingents:", error);
      }
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.loadContingents(page); // Fetch data for the selected page
      }
    },

    searchContingents() {
      this.loadContingents(); // Refresh data on search
    },

    async editContingent(id) {
      this.$router.push({ name: "EditContingent", params: { id } });
    },
    

    async deleteContingent(id) {
      try {
        await axios.delete(`/contingents/${id}`);
        this.loadContingents(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting contingent:", error);
      }
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

.pagination button {
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 10px;
}

.form-control {
  width: 250px;
}
</style>
