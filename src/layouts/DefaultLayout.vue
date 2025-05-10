<template>
  <div class="main-layout">
    <div class="main-layout__content main-layout__album">
      <Navbar />
      <router-view />
      <Footer v-if="!userStore.user.isAdmin" />
    </div>
  </div>
  <NotificationAlert />
</template>

<script lang="ts" setup>
  import { Footer } from '@/components/ui/footer';
  import { Navbar } from '@/components/ui/navbar';
  import { NotificationAlert } from '@/components/ui/notifications';
  import { router } from '@/router';
  import { ref, watch } from 'vue';
  import { useFiltersStore } from '@/entities/filters/model';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { useEventsStore } from '@/entities/events/model';
  import { useUserStore } from '@/entities/user';

  const eventsStore = useEventsStore();
  const filterStore = useFiltersStore();
  const userStore = useUserStore();
  const token = ref(localStorage.getItem('token'));
  setInterval(async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const response = await axios.post('/refresh', {}, config);
      localStorage.setItem('token', response.data.token);
    } catch {
      showNotification({
        type: 'error',
        text: 'Не удалось запросить события!',
      });
    }
  }, 144000);
  window.addEventListener('load', () => {
    const firstRunKey = 'projectFirstRunDone';
    if (!localStorage.getItem(firstRunKey)) {
      localStorage.removeItem('token');
      localStorage.setItem(firstRunKey, 'true');
    }
  });
  watch(
    () => router.currentRoute.value.fullPath,
    () => {
      token.value = localStorage.getItem('token');
      if (
        router.currentRoute.value.fullPath.includes('register') ||
        router.currentRoute.value.fullPath.includes('auth')
      ) {
        localStorage.removeItem('token');
        filterStore.page = 'main';
        token.value = null;
      }
      if (router.currentRoute.value.fullPath.includes('main')) eventsStore.fetchAllEvents('Все');
    }
  );
</script>

<style lang="scss" scoped>
  .main-layout {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__content {
      padding: 30px 40px;
      width: 1360px;
      min-height: 94vh;
      background-image: url('@/assets/main-images/MainElement.svg');
      background-repeat: repeat-y;
      background-position: left top;
    }
  }
  @media (max-width: 1440px) {
    .main-layout__album {
      width: 730px;
      padding: 16px 16px;
    }
  }
  @media (max-width: 750px) {
    .main-layout__album {
      width: auto;
    }
  }
</style>
