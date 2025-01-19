<template>
  <ContingentForm :isEdit="true" :contingentId="$route.params.id" />
</template>

<script>
import ContingentForm from "@/components/contingent/ContingentForm.vue";

export default {
  name: "ContingentEditPage",
  components: {
    ContingentForm,
  },
};
</script>
