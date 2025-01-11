<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="mb-2 page-title">
        <i class="bi bi-file-earmark-text"></i> 
        {{ isEdit ? "Edit Navigation" : "Create Navigation" }}
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
              <label for="type" class="form-label">Navigation Type</label>
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
              <span>{{ isEdit ? "Save Changes" : "Save Menu" }}</span>
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
import ProgressBar from "@/components/admin/ProgressBar.vue";

export default {
  name: "NavigationForm",
  components: {
    ProgressBar,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    menuId: {
      type: [Number, String],
      default: null, // Pass menu ID for edit mode
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      form: {
        name: "",
        parent_id: null,
        order: 0,
        type: "public",
      },
      parents: [], // List of parent menus
      errors: {}, // Validation errors
      loading: false, // Loading state
      progress: 0, // Progress bar percentage
    };
  },
  created() {
    this.fetchParentMenus();
    if (this.isEdit && this.menuId) {
      this.fetchMenuDetail(this.menuId);
    }
  },
  methods: {
    async fetchParentMenus() {
      try {
        const response = await axios.get("/navigation-menus/fetch-all");
        this.parents = response.data || [];
      } catch (error) {
        this.toast.error("Error fetching parent menus.");
      }
    },
    async fetchMenuDetail(id) {
      this.loading = true;
      try {
        const response = await axios.get(`/navigation-menus/${id}`);
        if (response.data) {
          this.form = {
            name: response.data.name,
            parent_id: response.data.parent_id || null,
            order: response.data.order,
            type: response.data.type,
          };
        }
      } catch (error) {
        this.toast.error("Error fetching menu details.");
        console.error("Error fetching menu details:", error);
      } finally {
        this.loading = false;
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
      }, 100);

      try {
        this.errors = {};
        const endpoint = this.isEdit
          ? `/navigation-menus/${this.menuId}` // Update menu
          : "/navigation-menus"; // Create menu
        const method = this.isEdit ? "put" : "post";

        await axios[method](endpoint, this.form);
        this.toast.success(
          this.isEdit ? "Menu updated successfully!" : "Menu created successfully!"
        );
        this.$router.push("/admin/navigation");
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          this.toast.error("Error processing the form.");
        }
      } finally {
        clearInterval(progressInterval);
        this.progress = 100;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
