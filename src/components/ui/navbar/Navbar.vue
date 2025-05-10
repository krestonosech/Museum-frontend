<template>
  <div class="navbar">
    <RouterLink
      :to="'/main'"
      @click="filterStore.page = 'main'"
    >
      <img
        :src="Logo"
        alt="logo"
      />
    </RouterLink>
    <div>
      <NavbarTabs />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Logo from '@/assets/Logo.svg';
  import NavbarTabs from './NavbarTabs.vue';
  import { useFiltersStore } from '@/entities/filters/model';

  const filterStore = useFiltersStore();
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
