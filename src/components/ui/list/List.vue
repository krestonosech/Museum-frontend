<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div
    class="list"
    :class="{ excursions }"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :style="{ cursor: userStore.user.isAdmin && !excursions ? 'pointer' : '' }"
      @click="openChangeModal(item)"
    >
      <ListItem
        :id="item.id"
        v-model:isModalOpen="isModalOpen"
        :name="item.name"
        :is-archive="isArchive"
        :type="item.type"
        :date="item.date"
        :duration="item.duration"
        :description="item.description"
        :is-last-element="index + 1 === items.length"
        :is-excirsions="excursions"
        @click="setEmit(item)"
      />
    </div>
  </div>
  <ModalAddingPublish
    :id="id"
    v-model:is-modal-adding-open="isOpenChangeModal"
    :is-delete-item="true"
    :name="name"
    :type="type"
    :date="date"
    :description="description"
    is-change
    @success="emit('success')"
  />
</template>

<script setup lang="ts">
  import { useUserStore } from '@/entities/user';
  import ListItem from './ListItem.vue';
  import { ListItemProps } from './types';
  import { defineProps, defineEmits, ref } from 'vue';
  import { ModalAddingPublish } from '@/components';

  const props = defineProps<{
    items: ListItemProps[];
    excursions?: boolean;
    isArchive?: boolean;
  }>();
  const userStore = useUserStore();
  const isModalOpen = ref(false);
  const emit = defineEmits(['register', 'openItemModel', 'success']);
  const isOpenChangeModal = ref(false);
  const date = ref('');
  const id = ref();
  const name = ref('');
  const description = ref('');
  const type = ref('');

  function openChangeModal(item: ListItemProps) {
    if (userStore.user.isAdmin && !props.excursions) {
      isOpenChangeModal.value = true;
      date.value = item.date;
      id.value = item.id;
      name.value = item.name;
      type.value = item.type;
      description.value = item.description;
    }
  }

  function setEmit(item: ListItemProps) {
    if (userStore.user.isAdmin || props.isArchive) return;
    emit('openItemModel', {
      name: item.name,
      price: item.price,
      date: item.date,
    });
  }
</script>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 660px;
    overflow-y: auto;
  }
  .excursions {
    max-height: 1000px;
  }
</style>
