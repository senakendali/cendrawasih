<template>
    <NavigationForm :isEdit="true" :menuId="$route.params.id" />
  </template>
  
  <script>
  import NavigationForm from "@/components/navigation/NavigationForm.vue";
  
  export default {
    name: "NavigationEditPage",
    components: {
      NavigationForm,
    },
  };
  </script>
  