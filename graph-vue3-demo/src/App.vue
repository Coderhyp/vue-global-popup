<script setup>
// import ForceGraph from "./components/ForceGraph.vue";
import { useUserFormDialog } from "./hooks/useGlobalPopup/popup-registry";

const { show } = useUserFormDialog();

show();
// ... existing code ...
</script>

<template>
  <div>
    <button @click="show">Show User Form Dialog</button>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
