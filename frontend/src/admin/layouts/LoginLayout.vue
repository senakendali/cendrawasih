<template>
    
    <div class="login-layout">
      
        <!-- First Column: Image -->
        <div class="login-image d-flex justify-content-center">
            <img src="@/assets/images/silat.png" alt="">
        </div>
        <!-- Second Column: Login Form -->
        <div class="login-form">
            <div class="form-container">
                <router-view></router-view>
            </div>
        </div>
            
       
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginLayout'
  };
  </script>
  
  <style scoped>
  .login-layout {
    height: 100vh;
    display: flex;
    align-items: center;
  }

  .login-image {
    padding: 0;
    width: 70%;
  }

  .login-image img{
    width:600px;
  }

  .login-form {
    padding: 0;
    width: 30%;
  }
  
  .form-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
   
  }
  </style>
  