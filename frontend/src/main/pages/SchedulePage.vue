<template>
    <div class="main-container">
      <div class="container">
        <!-- Header Section -->
        <div class="row">
          <div class="col-lg-12 text-center my-4">
            <h1>Jadwal Kejuaraan</h1>
            <p>
              Pendaftaran Kejuaraan Pencak Silat <strong>[Nama Kejuaraan]</strong> Telah Dibuka! 
              Jangan Lewatkan Kesempatan untuk Bertanding dengan Atlet-Atlet Berbakat Lainnya. 
              Dapatkan Hadiah Menarik dan Sertifikat Peserta!
            </p>
          </div>
        </div>
  
        <!-- Schedule Table -->
        <div class="row">
          <div class="col-lg-12">
            <table class="table table-bordered table-dark schedule-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Waktu</th>
                  <th>Kategori</th>
                  <th>Lokasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10 Januari 2024</td>
                  <td>08:00 - 12:00</td>
                  <td>Junior</td>
                  <td>Gelanggang Olahraga A</td>
                </tr>
                <tr>
                  <td>10 Januari 2024</td>
                  <td>13:00 - 17:00</td>
                  <td>Senior</td>
                  <td>Gelanggang Olahraga A</td>
                </tr>
                <tr>
                  <td>11 Januari 2024</td>
                  <td>08:00 - 12:00</td>
                  <td>Exhibition</td>
                  <td>Gelanggang Olahraga B</td>
                </tr>
                <tr>
                  <td>12 Januari 2024</td>
                  <td>09:00 - 15:00</td>
                  <td>Final</td>
                  <td>Gelanggang Utama</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SchedulePage',
  };
  </script>
  
  <style scoped>
  
  
  .schedule-table {
    width: 100%;
    margin-top: 20px;
    border-color: #444; /* Darker border color */
  }
  
  .table {
    background-color: #181818; /* Dark table background */
    color: #fff; /* White text for table content */
  }
  
  .table thead {
    background-color: #333; /* Slightly darker header for the table */
  }
  
  .table tbody tr:hover {
    background-color: #444; /* Dark gray background on hover */
  }
  </style>
  