<template>
  <div class="dashboard-container">
    <div v-if="loading" class="loader-bar"></div>
    <div class="container">
      <div class="mb-2 page-title">
        <i class="bi bi-file-earmark-text"></i> 
        {{ isEdit ? "Edit Team Member" : "Add Member" }}
      </div>
      <form @submit.prevent="submitForm" class="admin-form mt-4" enctype="multipart/form-data">
        <div class="row">
          <div class="col-lg-6">
            <div class="mb-3">
              <label for="contingent_id" class="form-label">Kontingen</label>
              <select
                class="form-select"
                id="contingent_id"
                name="contingent_id"
                v-model="form.contingent_id"
                :class="{ 'is-invalid': errors.contingent_id }"
              >
                <option value="" disabled>Pilih Kontingen</option>
                <option v-for="contingent in contingents" :key="contingent.id" :value="contingent.id">
                  {{ contingent.name }}
                </option>
              </select>
              <div class="invalid-feedback">{{ errors.contingent_id }}</div>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">Nama</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                id="name"
                name="name"
                v-model="form.name"
              />
              <div class="invalid-feedback">{{ errors.name }}</div>
            </div>

            <div class="mb-3">
              <label for="birth_place" class="form-label">Birth Place</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.birth_place }"
                id="birth_place"
                v-model="form.birth_place"
              />
              <div class="invalid-feedback">{{ errors.birth_place }}</div>
            </div>
            
            <div class="mb-3">
              <label for="birth_date" class="form-label">Birth Date</label>
              <input
                type="date"
                class="form-control"
                :class="{ 'is-invalid': errors.birth_date }"
                id="birth_date"
                v-model="form.birth_date"
              />
              <div class="invalid-feedback">{{ errors.birth_date }}</div>
            </div>
            <div class="mb-3">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                :class="{ 'is-invalid': errors.type }"
                id="gender"
                v-model="form.gender"
              >
                <option value="M">Laki-laki</option>
                <option value="F">Perempuan</option>
              </select>
              <div class="invalid-feedback">{{ errors.gender }}</div>
            </div>
            <div class="mb-3">
              <label for="body_weight" class="form-label">Body Weight</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.body_weight }"
                id="body_weight"
                v-model="form.body_weight"
              />
              <div class="invalid-feedback">{{ errors.body_weight }}</div>
            </div>
            <div class="mb-3">
              <label for="body_height" class="form-label">Body Height</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.body_height }"
                id="body_height"
                v-model="form.body_height"
              />
              <div class="invalid-feedback">{{ errors.body_height }}</div>
            </div>
            <div class="mb-3">
              <label for="nik" class="form-label">ID Card Number (Nomor KTP)</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.nik }"
                id="nik"
                v-model="form.nik"
              />
              <div class="invalid-feedback">{{ errors.nik }}</div>
            </div>
            <div class="mb-3">
              <label for="family_card_number" class="form-label">Fammily Card Number (Nomor KK)</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.family_card_number }"
                id="family_card_number"
                v-model="form.family_card_number"
              />
              <div class="invalid-feedback">{{ errors.family_card_number }}</div>
            </div>
          </div>
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
            <div class="mb-3">
              <label for="category" class="form-label">Kategori</label>
              <select
                class="form-select"
                :class="{ 'is-invalid': errors.type }"
                id="category"
                v-model="form.category"
              >
                <option value="Tanding">Tanding</option>
                <option value="Seni">Seni</option>
              </select>
              <div class="invalid-feedback">{{ errors.category }}</div>
            </div>
            <div class="mb-3">
              <label for="id_card_document" class="form-label">KTP</label>
              <input 
                class="form-control" 
                type="file" 
                id="id_card_document" 
                @change="handleFileUpload('id_card_document', $event)" 
              />
            </div>
            <div class="mb-3">
              <label for="family_card_document" class="form-label">Kartu Keluarga</label>
              <input 
                class="form-control" 
                type="file" 
                id="family_card_document" 
                @change="handleFileUpload('family_card_document', $event)" 
              />
            </div>
            <div class="mb-3">
              <label for="certificate_of_health" class="form-label">Surat Sehat</label>
              <input 
                class="form-control" 
                type="file" 
                id="certificate_of_health" 
                @change="handleFileUpload('certificate_of_health', $event)" 
              />
            </div>
            <div class="mb-3">
              <label for="recomendation_letter" class="form-label">Surat Rekomendasi</label>
              <input 
                class="form-control" 
                type="file" 
                id="recomendation_letter" 
                @change="handleFileUpload('recomendation_letter', $event)" 
              />
            </div>
            <div class="mb-3">
              <label for="parental_permission_letter" class="form-label">Surat Izin Orang Tua</label>
              <input 
                class="form-control" 
                type="file" 
                id="parental_permission_letter" 
                @change="handleFileUpload('parental_permission_letter', $event)" 
              />
            </div>

            
          </div>
          
        </div>
       
        <div class="row">
          <div class="col-lg-12 text-center">
            <button type="submit" class="button button-primary" :disabled="loading">
              <i class="bi bi-floppy"></i>
              <span>{{ isEdit ? "Save Changes" : "Save Data" }}</span>
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
  name: "MemberForm",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      memberId: null,
      contingents: [],
      provinces: [],
      districts: [],
      sub_districts: [],
      wards: [],
      form: {
        contingent_id: null,
        name: "",
        birth_place: "",
        birth_date: "",
        gender: "",
        body_weight: "",
        body_height: "",
        blood_type: "",
        nik: "",
        family_card_number: "",
        province_id: null,
        district_id: null,
        subdistrict_id: null,
        ward_id: null,
        address: "",
        category: "",
        files: {},
      },
      errors: {},
      loading: false,
      progress: 0,
    };
  },
  created() {
    this.memberId = this.$route.params.id;
    this.fetchProvinces();
    this.fetchContingents();
    if (this.isEdit && this.memberId) {
      this.fetchMemberDetail(this.memberId);
    }
  },
  methods: {
    handleFileUpload(field, event) {
      this.form.files[field] = event.target.files[0];
    },
    async fetchContingents() {
      try {
        const response = await axios.get("/contingents/fetch-all");
        this.contingents = response.data.data;
      } catch (error) {
        console.error("Error fetching contingents:", error);
      }
    },
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
        this.form.district_id = null;
        this.form.subdistrict_id = null;
        this.form.ward_id = null;
        this.sub_districts = [];
        this.wards = [];
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
        this.form.subdistrict_id = null;
        this.form.ward_id = null;
        this.wards = [];
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
        this.form.ward_id = null;
        return;
      }
      try {
        const response = await axios.get(`/wards?subdistrict_id=${this.form.subdistrict_id}`);
        this.wards = response.data;
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    },
    async fetchMemberDetail(id) {
      this.loading = true;
      try {
        const response = await axios.get(`/team-members/${id}`);
        if (response.data) {
          this.form = {
            name: response.data.name || "",
            contingent_id: response.data.contingent_id || null,
            birth_place: response.data.birth_place || "",
            birth_date: response.data.birth_date || "",
            gender: response.data.gender || "",
            body_weight: response.data.body_weight || "",
            body_height: response.data.body_height || "",
            blood_type: response.data.blood_type || "",
            nik: response.data.nik || "",
            family_card_number: response.data.family_card_number || "",
            province_id: response.data.province_id || null,
            district_id: response.data.district_id || null,
            subdistrict_id: response.data.subdistrict_id || null,
            ward_id: response.data.ward_id || null,
            address: response.data.address || "",
            category: response.data.category || "",
            files: {},
          };

          if (this.form.province_id) {
            await this.fetchDistricts();
          }
          if (this.form.district_id) {
            await this.fetchSubDistricts();
          }
          if (this.form.subdistrict_id) {
            await this.fetchWards();
          }
        }
      } catch (error) {
        this.toast.error("Error fetching member details.");
        console.error("Error fetching member details:", error);
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
      const formData = new FormData();

      // Append form fields to formData
      Object.keys(this.form).forEach((key) => {
        if (key === "files") {
          for (const [field, file] of Object.entries(this.form.files)) {
            formData.append(field, file);
          }
        } else {
          formData.append(key, this.form[key]);
        }
      });

      try {
        this.errors = {};
        const endpoint = this.isEdit ? `/team-members/${this.memberId}` : "/team-members";
        const method = this.isEdit ? "put" : "post";

        await axios[method](endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.toast.success(
          this.isEdit ? "Member updated successfully!" : "Member created successfully!"
        );
        this.$router.push("/admin/team-members");
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          this.toast.error("Error processing the form.");
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


<style scoped>
.dashboard-container {
  position: relative;
}

.loader-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 0;
  background-color: #388E3C; /* Warna loader */
  animation: loader-animation 1.5s infinite;
}

/* Animasi garis loader */
@keyframes loader-animation {
  0% {
    width: 0;
    background-color: #388E3C; /* Warna awal */
  }
  50% {
    width: 50%;
    background-color: #388E3C; /* Warna saat animasi */
  }
  100% {
    width: 100%;
    background-color: #388E3C;
  }
}
</style>
