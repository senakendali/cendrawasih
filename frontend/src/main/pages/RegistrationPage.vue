<template>
  <div class="main-container">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h1>Pendaftaran</h1>
          <p>
            Pendaftaran Telah Dibuka!
            Jangan Lewatkan Kesempatan untuk Bertanding dengan Atlet-Atlet
            Berbakat Lainnya. Dapatkan Hadiah Menarik dan Sertifikat Peserta!
          </p>
        </div>
      </div>
      
      <!-- Registration Form -->
      <form class="myForm" enctype="multipart/form-data">
        <div class="row">
          <div class="col-lg-6">
            <img src="@/assets/images/main/banner/bogor-pencak-silat.jpg" class="img-fluid" />
          </div>
          <div class="col-lg-6">
            <!-- Form Fields -->
            <div class="mb-3">
              <label for="person-responsible" class="form-label">Nama Penanggung Jawab</label>
              <input type="text" class="form-control rounded" id="person-responsible" name="person-responsible" />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control rounded" id="email" name="email" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control rounded" id="password" name="password" />
            </div>
            <div class="mb-3">
              <label for="confirm-password" class="form-label">Konfirmasi Password</label>
              <input type="password" class="form-control rounded" id="confirm-password" name="confirm-password" />
            </div>
            <div class="mb-3">
              <button type="submit" class="btn-form">Daftar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegistrationPage",
};
</script>

<style scoped>
/* Styles */
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

.form-control {
  border-radius: 0;
  margin-bottom: 5px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  border-left: 5px solid #D32F2F;
}
</style>
