<template>

  <div class="dashboard-container">
    
    <div class="container">
      <div class="mb-2 page-title">
        <i class="bi bi-file-earmark-text"></i> Create Navigation
      </div>
      <form @submit.prevent="submitForm" class="admin-form mt-4">   
        <div class="row">
          <div class="col-lg-6">
           
            <div class="mb-3">
              <label for="name" class="form-label">Navigation Name</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                id="name"
                v-model="form.name"
              />
              <div class="invalid-feedback">{{ errors.name }}</div>
            </div>
        
            <div class="mb-3">
              <label for="parent_id" class="form-label">Parent Menu</label>
              <select
                class="form-select"
                :class="{ 'is-invalid': errors.parent_id }"
                id="parent_id"
                v-model="form.parent_id"
              >
                <option value="" selected>Without Parent</option>
                <option
                  v-for="parent in parents"
                  :key="parent.id"
                  :value="parent.id"
                >
                  {{ parent.name || "Unnamed Menu" }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors.parent_id }}</div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="mb-3">
              <label for="order" class="form-label">Sequence</label>
              <input
                type="number"
                class="form-control"
                :class="{ 'is-invalid': errors.order }"
                id="order"
                v-model.number="form.order"
                placeholder="Enter sequence"
              />
              <div class="invalid-feedback">{{ errors.order }}</div>
            </div>
            <div class="mb-3">
              <label for="type" class="form-label">Navigation </label>
              <select
                class="form-select"
                :class="{ 'is-invalid': errors.type }"
                id="type"
                v-model="form.type"
              >
                <option value="public">Public</option>
                <option value="admin">Admin</option>
              </select>
              <div class="invalid-feedback">{{ errors.type }}</div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="row mb-3">
          <div class="col-lg-12">
            <ProgressBar :progress="progress" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 text-center">
            <button type="submit" class="button button-primary" :disabled="loading">
              <i class="bi bi-floppy"></i>
              <span>Save Menu</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  name: "AddMenuPage",
  components: {
    ProgressBar
  },
  setup() {
    const toast = useToast(); // Use the toast instance
    return { toast };
  },
  data() {
    return {
      form: {
        name: "",
        url: "",
        parent_id: null,
        order: 0,
        type: "public",
      },
      parents: [], // List of parent menu items
      errors: {}, // Holds validation errors for each input
      loading: false, // Add loading state
      progress: 0, // Progress bar value
    };
  },
  created() {
    this.fetchParentMenus();
  },
  methods: {
    async fetchParentMenus() {
      try {
        const response = await axios.get("/navigation-menus/fetch-all");
        this.parents = response.data || []; // Ensure it's an array even if the API returns null/undefined
      } catch (error) {
        this.toast.error("Error fetching parent menus.");
        console.error("Error fetching parent menus:", error);
      }
    },
    updateProgress(step) {
      this.progress += step;
    },
    resetProgress() {
      this.progress = 0;
    },
    async submitForm() {
      this.loading = true;
      this.resetProgress();

      const progressInterval = setInterval(() => {
        if (this.progress < 100) {
          this.updateProgress(10);
        } else {
          clearInterval(progressInterval);
        }
      }, 100); // Increment progress every 300ms

      try {
        // Ensure `parent_id` is handled safely
        this.form.parent_id = this.form.parent_id || null;

        // Clear existing errors
        this.errors = {};

        // Simulate request
        await new Promise((resolve) => setTimeout(resolve, 3000));

        await axios.post("/navigation-menus", this.form);
        this.toast.success("Menu berhasil ditambahkan!");
        this.$router.push("/admin/navigation");
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.toast.error("Gagal menambahkan menu. Periksa input Anda.");
          this.errors = error.response.data.errors;
        } else {
          this.toast.error("Gagal menambahkan menu. Periksa input Anda.");
        }
      } finally {
        clearInterval(progressInterval);
        this.progress = 100; // Ensure progress is full when process completes
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.progress-bar {
  transition: width 0.3s ease;
}
</style>
