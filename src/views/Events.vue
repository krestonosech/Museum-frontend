<template>
  <PageContent>
    <div class="events">
      <Title text="События" />
      <EventsChips />
      <List
        v-if="upcomingEvents?.length"
        :items="upcomingEvents"
        @open-item-model="item => openItemModal(item)"
        @success="async () => await eventsStore.fetchAllEvents('Все')"
      />
      <div v-else>
        <p class="events__p">Нет предстоящих событий такого типа</p>
      </div>
    </div>
    <div class="events">
      <Title text="Архив" />
      <ArchiveChips />
      <List
        v-if="archivedEvents?.length"
        :items="archivedEvents"
        is-archive
        @success="async () => await eventsStore.fetchAllArchiveEvents('Все')"
      />
      <div v-else>
        <p class="events__p">Нет архивированных событий такого типа</p>
      </div>
    </div>
  </PageContent>
  <ModalRegisterAuth
    v-model:isRegisterOpen="isRegisterOpen"
    v-model:isRegister="isRegister"
  />
  <ModalBuyingItem
    v-model:isitem-modal-open="isitemModalOpen"
    :date="date"
    :item-name="itemName"
    :item-price="itemPrice"
  />
</template>

<script lang="ts" setup>
  import {
    ModalBuyingItem,
    ModalRegisterAuth,
    PageContent,
    ArchiveChips,
    EventsChips,
    ListItemProps,
    List,
    Title,
  } from '@/components';
  import { computed, onMounted, ref } from 'vue';
  import { useEventsStore } from '@/entities/events/model';

  const eventsStore = useEventsStore();
  const upcomingEvents = computed<ListItemProps[] | undefined>(() => eventsStore.upcomingEvents);
  const archivedEvents = computed<ListItemProps[] | undefined>(() => eventsStore.archivedEvents);
  const isitemModalOpen = ref(false);
  const isRegister = ref(false);
  const itemPrice = ref(0);
  const itemName = ref('');
  const date = ref('');
  const isRegisterOpen = ref<boolean>(false);

  onMounted(async () => {
    await eventsStore.fetchAllArchiveEvents('Все');
    await eventsStore.fetchAllEvents('Все');
  });

  function openItemModal(item: any) {
    if (!localStorage.getItem('token')) {
      return (isRegisterOpen.value = true);
    }
    date.value = item.date;
    itemPrice.value = item.price;
    itemName.value = item.name;
    isitemModalOpen.value = true;
  }
</script>

<style lang="scss" scoped>
  .events {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__p {
      font-family: 'Roboto';
      font-weight: 300;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0%;
    }
  }
</style>
