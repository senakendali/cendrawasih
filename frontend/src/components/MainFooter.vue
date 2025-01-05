<template>
  <footer class="footer py-3 text-center text-lg-start">
    <div class="footer-content text-white">
      <!-- Footer Container: Three columns -->
      <div class="container">
        <div class="row">
          <!-- First Column: Logo and Description -->
          <div class="col-md-2">
            <div class="footer-logo">
              <img src="@/assets/app-logo.png" alt="Company Logo" class="footer-logo-img"/>
            </div>
          </div>

          <div class="col-md-7">
            <h5>About Us</h5>
            <p class="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, sapiente. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, ducimus.
            </p>
          </div>

          <!-- Third Column: Contact Info -->
          <div class="col-md-3">
            <div class="footer-contact text-start">
              <h5>Contact Us</h5>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Email: info@yourcompany.com</p>
            </div>
          </div>
        </div>

        <!-- Second Row: Terms & Conditions and Privacy Policy Inline -->
        <div class="row pt-3">
          <div class="col-12">
            <div class="footer-links d-flex justify-content-center">
              <a href="/terms" class="footer-link">Terms & Conditions</a>
              <span class="footer-link-divider mx-2">|</span> 
              <a href="/privacy" class="footer-link">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Text -->
      <div class="text-center pt-3 text-white">
        &copy; 2023 Your Company. All rights reserved.
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
