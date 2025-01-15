<template>
    <MemberForm :isEdit="true" :memberId="$route.params.id" />
  </template>
  
  <script>
  import MemberForm from '@/components/team-members/MemberForm.vue';
  
  export default {
    name: "MembersEditPage",
    components: {
      MemberForm,
    },
  };
  </script>
  