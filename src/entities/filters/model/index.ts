import { defineStore } from 'pinia';
import { useUserStore } from '@/entities/user';
import useStorage from '@/composables/useStorage';
import { reactive, toRef, watch } from 'vue';
import { Filters } from '../types';

interface StorageFilter {
  filters: Filters;
  userId: number;
}

export const useFiltersStore = defineStore('filters', () => {
  const userStore = useUserStore();
  const { storage, reset: resetStorage } = useStorage<StorageFilter>('global-filters', {
    userId: userStore.user.id,
    filters: {
      page: 'main',
    },
  });

  if (userStore.user.id !== storage.value.userId) {
    resetStorage();
  }

  const filters = reactive<Filters>({
    page: storage.value.filters.page || 'main',
  });

  watch(filters, () => {
    const filtersByStorage: Filters = {
      page: filters.page,
    };
    storage.value = { userId: userStore.user.id, filters: filtersByStorage };
  });

  return {
    page: toRef(filters, 'page'),
  };
});
