<template>
  <div class="news">
    <div
      v-for="item in props.items"
      :key="item.id"
      class="news__body"
      :style="{ cursor: userStore.user.isAdmin ? 'pointer' : '' }"
      @click="openChangeModal(item)"
    >
      <div class="news__body-info">
        <div class="news__body-title">
          <Title
            :text="item.title"
            xs
          />
          <Text
            :text="item.text"
            xs
          />
          <Text
            v-if="userStore.user.isAdmin"
            :text="item.description"
            xs
          />
        </div>
        <Button
          v-if="!userStore.user.isAdmin"
          black
          style="width: 218px"
          @click="goToItem(item.id)"
        >
          ПОДБРОНЕЕ
        </Button>
      </div>
      <div class="news__body-img-div">
        <img
          class="news__body-img"
          :src="`data:image/jpeg;base64,${item.image}`"
        />
      </div>
    </div>
  </div>
  <ModalAddingNews
    :id="id"
    v-model:is-modal-adding-news-open="isOpenChangeModal"
    :is-delete-item="true"
    :text="text"
    :title="title"
    :description="description"
    is-change
    @success="emit('success')"
  />
</template>

<script lang="ts" setup>
  import { Button, ModalAddingNews, Text, Title } from '@/components';
  import { defineProps, ref, defineEmits } from 'vue';
  import { NewsProp } from '../types';
  import { router } from '@/router';
  import { useUserStore } from '@/entities/user';
  import { useNewsStore } from '../model';

  const newsStore = useNewsStore();
  const userStore = useUserStore();
  const emit = defineEmits(['success']);
  const isOpenChangeModal = ref(false);
  const text = ref('');
  const id = ref();
  const title = ref('');
  const description = ref('');

  const props = defineProps<{
    items: NewsProp[];
  }>();

  function openChangeModal(item: NewsProp) {
    if (userStore.user.isAdmin) {
      isOpenChangeModal.value = true;
      text.value = item.text;
      id.value = item.id;
      title.value = item.title;
      description.value = item.description;
    }
  }

  function goToItem(id: number) {
    newsStore.setItem(id);
    router.push(`/news/:${id}`);
  }
</script>

<style lang="scss" scoped>
  .news {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__nav {
      display: flex;
      justify-content: space-between;
      align-items: end;
    }
    &__body {
      display: flex;
      gap: 20px;
      min-height: 400px;
    }
    &__body-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 600px;
    }
    &__body-title {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &__body-img {
      width: 730px;
      height: 400px;
    }
  }
  @media (max-width: 1440px) {
    .news {
      &__body-img {
        width: 400px;
        height: 300px;
      }
    }
  }
  @media (max-width: 750px) {
    .news {
      &__body-img {
        width: 300px;
        height: 200px;
      }
      &__body-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: inherit;
      }
      &__body {
        display: flex;
        flex-direction: column-reverse;
        gap: 20px;
        height: inherit;
      }
      &__body-title {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding-bottom: 30px;
      }
      &__body-img-div {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
