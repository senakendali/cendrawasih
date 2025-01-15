<template>
  <div class="dashboard-container">
    <!-- Loader: Top Progress Bar -->
    <div
      v-if="loading"
      class="progress-bar"
      :style="{ width: progress + '%' }"
    ></div>

    <div class="container">
      <!-- Form Title -->
      <div class="mb-2 page-title">
        <i class="bi bi-file-earmark-text"></i>
        {{ isEdit ? "Edit Contingent" : "Add Contingent" }}
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="admin-form mt-4">
        <div class="row">
          <!-- Contingent Name -->
          <div class="col-lg-6">
            <div class="mb-3">
              <label for="name" class="form-label">Nama Kontingen</label>
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
              <label for="pic_name" class="form-label">Nama Penanggung Jawab</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.pic_name }"
                id="pic_name"
                v-model="form.pic_name"
              />
              <div class="invalid-feedback">{{ errors.pic_name }}</div>
            </div>

            <div class="mb-3">
              <label for="pic_phone" class="form-label">Nomor Telpon Penanggung Jawab</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.pic_phone }"
                id="pic_phone"
                v-model="form.pic_phone"
              />
              <div class="invalid-feedback">{{ errors.pic_phone }}</div>
            </div>

            <div class="mb-3">
              <label for="pic_email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.pic_email }"
                id="pic_email"
                v-model="form.pic_email"
              />
              <div class="invalid-feedback">{{ errors.pic_email }}</div>
            </div>
          </div>

          <!-- Person Responsible -->
          <div class="col-lg-6">
            <div class="mb-3">
              <label for="province_id" class="form-label">Provinsi</label>
              <select
                class="form-select"
                id="province_id"
                name="province_id"
                v-model="form.province_id"
                @change="fetchDistricts"
                :class="{ 'is-invalid': errors.province_id }"
              >
                <option value="" disabled>Pilih Provinsi</option>
                <option v-for="province in provinces" :key="province.id" :value="province.id">
                  {{ province.name }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors.province_id }}</div>
            </div>

            <div class="mb-3">
              <label for="district_id" class="form-label">Kabupaten/Kota</label>
              <select
                class="form-select"
                id="district_id"
                name="district_id"
                v-model="form.district_id"
                @change="fetchSubDistricts"
                :class="{ 'is-invalid': errors.district_id }"
              >
                <option value="" disabled>Pilih Kabupaten/Kota</option>
                <option v-for="district in districts" :key="district.id" :value="district.id">
                  {{ district.name }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors.district_id }}</div>
            </div>

            <div class="mb-3">
              <label for="subdistrict_id" class="form-label">Kecamatan</label>
              <select
                class="form-select"
                id="subdistrict_id"
                name="subdistrict_id"
                v-model="form.subdistrict_id"
                @change="fetchWards"
                :class="{ 'is-invalid': errors.subdistrict_id }"
              >
                <option value="" disabled>Pilih Kecamatan</option>
                <option v-for="sub_district in sub_districts" :key="sub_district.id" :value="sub_district.id">
                  {{ sub_district.name }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors.subdistrict_id }}</div>
            </div>

            <div class="mb-3">
              <label for="ward_id" class="form-label">Kelurahan</label>
              <select
                class="form-select"
                id="ward_id"
                name="ward_id"
                v-model="form.ward_id"
                :class="{ 'is-invalid': errors.ward_id }"
              >
                <option value="" disabled>Pilih Kelurahan</option>
                <option v-for="ward in wards" :key="ward.id" :value="ward.id">
                  {{ ward.name }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors.ward_id }}</div>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">Alamat</label>
              <textarea
                class="form-control"
                :class="{ 'is-invalid': errors.address }"
                id="address"
                v-model="form.address"
              ></textarea>
              <div class="invalid-feedback">{{ errors.address }}</div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row">
          <div class="col-lg-12 text-center">
            <button type="submit" class="button button-primary" :disabled="loading">
              <i class="bi bi-floppy"></i>
              <span>{{ isEdit ? "Update Contingent" : "Add Contingent" }}</span>
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

export default {
  name: "ContingentForm",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    contingentId: {
      type: [Number, String],
      required: true,
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      internalContingentId: this.contingentId,
      provinces: [],
      districts: [],
      sub_districts: [],
      wards: [],
      form: {
        name: "",
        pic_email: "",
        pic_name: "",
        pic_phone: "",
        province_id: null,
        district_id: null,
        subdistrict_id: null,
        ward_id: null,
        address: null,
      },
      errors: {},
      loading: false,
      progress: 0,
    };
  },

  created() {
    this.fetchProvinces();
    if (this.isEdit && this.contingentId) {
      this.fetchContingentDetail(this.contingentId);
    }
  },

  beforeRouteUpdate(to, from, next) {
    if (this.isEdit && to.params.id !== this.contingentId) {
      this.fetchContingentDetail(to.params.id);
    }
    next();
  },

  watch: {
    // Watch for changes to the contingentId from the route params
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        // Fetch contingent data when route param changes
        if (this.isEdit && newId) {
          this.fetchContingentDetail(newId); 
        }
      },
    }
  },

  methods: {
    async fetchProvinces() {
      try {
        const response = await axios.get("/provinces");
        this.provinces = response.data;
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    },
    async fetchDistricts() {
      if (!this.form.province_id) {
        this.districts = [];
        return;
      }
      try {
        const response = await axios.get(`/districts?province_id=${this.form.province_id}`);
        this.districts = response.data;
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    },
    async fetchSubDistricts() {
      if (!this.form.district_id) {
        this.sub_districts = [];
        return;
      }
      try {
        const response = await axios.get(`/subdistricts?district_id=${this.form.district_id}`);
        this.sub_districts = response.data;
      } catch (error) {
        console.error("Error fetching sub-districts:", error);
      }
    },
    async fetchWards() {
      if (!this.form.subdistrict_id) {
        this.wards = [];
        return;
      }
      try {
        const response = await axios.get(`/wards?subdistrict_id=${this.form.subdistrict_id}`);
        this.wards = response.data;
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    },
    async fetchContingentDetail(id) {
      this.loading = true;
      try {
        const response = await axios.get(`/contingents/${id}`);
        if (response.data) {
          this.form = {
            name: response.data.name,
            pic_email: response.data.pic_email,
            pic_name: response.data.pic_name,
            pic_phone: response.data.pic_phone,
            province_id: response.data.province_id,
            district_id: response.data.district_id,
            subdistrict_id: response.data.subdistrict_id,
            ward_id: response.data.ward_id,
            address: response.data.address,
          };
        }
      } catch (error) {
        this.toast.error("Error fetching contingent details.");
      } finally {
        this.loading = false;
      }
    },
    async submitForm() {
      this.loading = true;
      this.progress = 0;
      const progressInterval = setInterval(() => {
        if (this.progress < 90) {
          this.progress += 10;
        } else {
          clearInterval(progressInterval);
        }
      }, 100);

      try {
        const endpoint = this.isEdit ? `/contingents/${this.internalContingentId}` : "/contingents";
        const method = this.isEdit ? "put" : "post";

        await axios[method](endpoint, this.form);
        this.toast.success(this.isEdit ? "Contingent updated successfully!" : "Contingent added successfully!");
        this.$router.push("/admin/contingent");
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
          this.toast.error("An error occurred while submitting the form.");
        } else {
          this.toast.error("An error occurred while submitting the form.");
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
.dashboard-container {
  background-color: #ffffff;
  margin-top: 80px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* For positioning progress bar */
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  background-color: #388E3C;
  transition: width 0.3s ease-in-out;
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.invalid-feedback {
  display: block;
  color: #dc3545;
}
</style>
