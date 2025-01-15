<template>
  <div class="form-signin">
    <form @submit.prevent="handleLogin">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
            <input
                type="email"
                class="form-control"
                :class="{'is-invalid': !email && validationErrors.email}"
                id="floatingInput"
                v-model="email"
                placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
            <input
                type="password"
                class="form-control"
                :class="{'is-invalid': !password && validationErrors.password}"
                id="floatingPassword"
                v-model="password"
                placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
        </div>

        <button
            class="w-100 btn btn-lg btn-submit"
            type="submit"
            :disabled="loading"
        >
            <span v-if="loading" class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
            <span v-else>Sign in</span>
        </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification"; // Import the toast module

// Set axios base URL
import API from "@/config/api";
axios.defaults.baseURL = API.API_BASE_URL;

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      validationMessage: "",
      validationErrors: {},
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      const toast = useToast(); // Initialize the toast service

      try {
        // Reset messages and errors
        this.errorMessage = "";
        this.validationErrors = {};
        this.validationMessage = "";

        // Send login request
        const response = await axios.post(
          "/login",
          { email: this.email, password: this.password },
          { withCredentials: true }
        );

        // Save the token and user data to localStorage 
        localStorage.setItem("authToken", response.data.access_token); 
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Display success toast message
        toast.success("Login successful! ");

        // Redirect to the admin page after a brief delay
        setTimeout(() => {
          this.$router.push("/admin");
        }, 2000);

      } catch (error) {
        if (error.response && error.response.data) {
          if (error.response.data.errors) {
            this.validationMessage =
              "Validation errors, please make sure all fields are filled correctly.";
            this.validationErrors = error.response.data.errors;
          } else {
            this.errorMessage =
              error.response.data.message || "An error occurred. Please try again.";
          }
        } else {
          this.errorMessage = "An error occurred. Please try again.";
        }
        
        // Show error toast with error message
        toast.error(this.errorMessage || "An error occurred. Please try again.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

/* Keep same button styling as before */
.form-signin .btn-submit {
  background-color: #1e2a57;
  color: #ffffff;
  font-family: "Urbanist", sans-serif;
  font-weight: 400;
  font-size: 16px;
  height: 50px;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}

/* Prevent hover color change */
.form-signin .btn-submit:hover {
  background-color: #385F96; 
  color: #ffffff;
}

.form-signin .btn-submit:focus,
.form-signin .btn-submit:active {
  background-color: #1e2a57; 
  color: #ffffff;
  box-shadow: none;
}

/* Alert styles (optional) */
.alert {
  margin-bottom: 20px;
}
</style>
