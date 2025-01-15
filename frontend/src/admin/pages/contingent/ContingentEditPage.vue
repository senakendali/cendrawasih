<template>
  <ContingentForm :key="contingentId" :isEdit="true" :contingentId="$route.params.id" />
</template>

<script>
import ContingentForm from "@/components/contingent/ContingentForm.vue";

export default {
  name: "FormEdit",
  components: {
    ContingentForm,
  },
};
</script>
