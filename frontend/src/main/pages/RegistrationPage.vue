<template>
    <div class="main-container">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1>Pendaftaran</h1>
            <p>
              Pendaftaran Kejuaraan Pencak Silat [Nama Kejuaraan] Telah Dibuka!
              Jangan Lewatkan Kesempatan untuk Bertanding dengan Atlet-Atlet
              Berbakat Lainnya. Dapatkan Hadiah Menarik dan Sertifikat Peserta!
            </p>
          </div>
        </div>
        <form class="myForm" enctype="multipart/form-data">
          <div class="row">
            <div class="col-lg-6">
              <!-- Form Fields -->
              <div class="mb-3">
                <label for="contingent_name" class="form-label">Nama Kontingen</label>
                <input type="text" class="form-control rounded" id="contingent_name" name="contingent_name">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control rounded" id="email" name="email">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control rounded" id="password" name="password">
              </div>
              <div class="mb-3">
                <label for="confirm-password" class="form-label">Konfirmasi Password</label>
                <input type="password" class="form-control rounded" id="confirm-password" name="confirm-password">
              </div>
              <div class="mb-3">
                <label for="person-responsible" class="form-label">Nama Penanggung Jawab</label>
                <input type="text" class="form-control rounded" id="person-responsible" name="person-responsible">
              </div>
              <div class="mb-3">
                <label for="person-responsible-phone" class="form-label">Nomor Telpon Penanggung Jawab</label>
                <input type="text" class="form-control rounded" id="person-responsible-phone" name="person-responsible-phone">
              </div>
            </div>
            <div class="col-lg-6">
              <!-- Province Dropdown -->
              <div class="mb-3">
                <label for="province" class="form-label">Provinsi</label>
                <select
                  class="form-select"
                  id="province"
                  name="province"
                  v-model="selectedProvince"
                  @change="fetchDistricts"
                  aria-label="Pilih Provinsi"
                >
                  <option value="" disabled>Pilih Provinsi</option>
                  <option v-for="province in provinces" :key="province.id" :value="province.id">
                    {{ province.name }}
                  </option>
                </select>
              </div>
    
              <!-- District Dropdown -->
              <div class="mb-3">
                <label for="district" class="form-label">Kabupaten/Kota</label>
                <select
                  class="form-select"
                  id="district"
                  name="district"
                  v-model="selectedDistrict"
                  @change="fetchSubDistricts"
                  aria-label="Pilih Kabupaten/Kota"
                >
                  <option value="" disabled>Pilih Kabupaten/Kota</option>
                  <option v-for="district in districts" :key="district.id" :value="district.id">
                    {{ district.name }}
                  </option>
                </select>
              </div>

              <!-- Sub District Dropdown -->
              <div class="mb-3">
                <label for="sub_district" class="form-label">Kecamatan</label>
                <select
                  class="form-select"
                  id="sub_district"
                  name="sub_district"
                  v-model="selectedSubDistrict"
                  @change="fetchWards"
                  aria-label="Pilih Kecamatan"
                >
                  <option value="" disabled>Pilih Kecamatan</option>
                  <option v-for="sub_district in sub_districts" :key="sub_district.id" :value="sub_district.id">
                    {{ sub_district.name }}
                  </option>
                </select>
              </div>

              <!-- Wards Dropdown -->
              <div class="mb-3">
                <label for="ward" class="form-label">Keluarahan</label>
                <select
                  class="form-select"
                  id="ward"
                  name="ward"
                  v-model="selectedWard"
                  aria-label="Pilih Kecamatan"
                >
                  <option value="" disabled>Pilih Keluarahan</option>
                  <option v-for="ward in wards" :key="ward.id" :value="ward.id">
                    {{ ward.name }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label">Alamat</label>
                <textarea class="form-control rounded" id="address" name="address" rows="5"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 text-center">
              <button type="submit" class="btn-form">Daftar</button>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import API from "@/config/api"; // Import the API base URL configuration
  
  // Set the axios default base URL dynamically
  axios.defaults.baseURL = API.API_BASE_URL; // Ensure API_BASE_URL is defined in the config file
  
  export default {
    name: "RegistrationPage",
    data() {
      return {
        provinces: [], // Holds the list of provinces
        districts: [], // Holds the list of districts
        sub_districts: [], // Holds the list of sub-districts
        wards: [], // Holds the list of wards
        selectedProvince: "", // Tracks the selected province
        selectedDistrict: "", // Tracks the selected district
        selectedSubDistrict: "", // Tracks the selected sub-district
        selectedWard: "", // Tracks the selected ward
      };
    },
    created() {
      // Fetch province data when the component is created
      this.fetchProvinces();
    },
    methods: {
      // Fetch all provinces using the configured API base URL
      async fetchProvinces() {
        try {
          const response = await axios.get("/provinces"); // Just using the relative URL
          this.provinces = response.data;
        } catch (error) {
          console.error("Error fetching provinces:", error);
        }
      },
  
      // Fetch districts based on the selected province
      async fetchDistricts() {
        if (!this.selectedProvince) {
          this.districts = [];
          return;
        }
  
        try {
          const response = await axios.get(`/districts?province_id=${this.selectedProvince}`); // Relative URL
          this.districts = response.data;
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      },

      async fetchSubDistricts() {
        if (!this.selectedDistrict) {
          this.sub_districts = [];
          return;
        }
  
        try {
          const response = await axios.get(`/subdistricts?district_id=${this.selectedDistrict}`); // Relative URL
          this.sub_districts = response.data;
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      },

      async fetchWards() {
        if (!this.selectedSubDistrict) {
          this.wards = [];
          return;
        }
  
        try {
          const response = await axios.get(`/wards?subdistrict_id=${this.selectedSubDistrict}`); // Relative URL
          this.wards = response.data;
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      },  

      
    },
  };
  </script>
  
  <style scoped>
  /* Styles */
  .dropdown-menu {
    max-height: 200px;
    overflow-y: auto;
  }
  
  .form-control {
    border-radius: 0;
    margin-bottom: 5px;
  }
  
  .dropdown-item {
    cursor: pointer;
  }
  
  .dropdown-item:hover {
    background-color: #f8f9fa;
  }

  .myForm button {
    font-size: 1rem;
    padding: 10px 20px;
    border: none;
    background-color: #D32F2F; /* Red background for the button */
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .myForm button:hover {
    background-color: #FF5722; /* Darker red on hover */
  }
  </style>
  