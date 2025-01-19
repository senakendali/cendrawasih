<template>
  <footer class="footer py-3 text-center text-lg-start">
    <div class="footer-content text-white">
      <!-- Footer Container: Three columns -->
      <div class="container">
        <div class="row">
          <!-- First Column: Description -->
          <div class="col-md-9">
            <h5>About Us</h5>
            <p class="text-white">
              Cenderawasih Juara Manajemen, Established in 2024, we are a premier sports event promoter dedicated to delivering exceptional experiences for fans and participants alike. With a commitment to professionalism, innovation, and the spirit of sportsmanship, we organize a wide range of events, from local tournaments to national and international competitions.

            </p>
          </div>

          <!-- Third Column: Contact Info -->
          <div class="col-md-3">
            <div class="footer-contact text-start">
              <h5>Contact Us</h5>
              <p>Phone: +6285956554607</p>
              <p>Email: manajemencendrawasihjuara@gmail.com</p>
            </div>
          </div>
        </div>

        <!-- Second Row: Terms & Conditions and Privacy Policy Inline -->
        <div class="row pt-3">
          <div class="col-12">
            <div class="footer-links d-flex justify-content-center">
              
              
              <router-link to="/privacy-policy" class="footer-link" exact-active-class="active">Privacy Policy</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Text -->
      <div class="text-center pt-3 text-white">
        &copy; 2025 Your Cenderawasih Juara Manajemen. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter'
};
</script>

<style scoped>
.footer {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  background-color: #000000;
}

.footer-content {
  background-color: #000000; /* Darker background for the footer */
}


.footer-links {
  display: flex;
  justify-content: center;
  gap: 10px; /* Adds space between the links */
}

.footer-link {
  color: white;
  text-decoration: none;
  font-size: 14px;
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-link-divider {
  color: white;
  font-size: 14px;
}

.footer-contact h5 {
  color: white;
}

.footer-contact p {
  color: white;
}

@media (max-width: 768px) {
  .footer-logo-img {
    width: 120px;
  }

  .footer-links {
    text-align: center;
  }
}
</style>
