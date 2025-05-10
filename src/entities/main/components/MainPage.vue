<template>
  <div
    v-if="!userStore.user.isAdmin"
    class="main-page__general-info"
  >
    <div>
      <Title
        xl
        text="Этнографический музей народов Забайкалья"
      />
    </div>
    <div class="main-page__description-block">
      <div class="main-page__description">
        <p class="main-page__description__text">{{ DESCRIPTION_TEXT }}</p>
        <div class="main-page__description__button">
          <Button
            black
            @click="openModal"
          >
            КУПИТЬ БИЛЕТ
          </Button>
        </div>
      </div>
    </div>
    <Images
      :items="animals"
      only-images
      type="main-images"
    />
  </div>
  <div
    v-if="!userStore.user.isAdmin"
    class="main-page__events"
  >
    <EventsMainTitle />
    <List
      v-if="items"
      :items="items.slice(0, 3)"
      @register="isRegisterOpen = true"
      @open-item-model="item => openItemModal(item)"
    />
  </div>
  <div>
    <News />
  </div>
  <div
    v-if="!userStore.user.isAdmin"
    class="main-page__gallery"
  >
    <Title text="Галерея" />
    <Images
      :items="images"
      type="main-images"
    />
  </div>
  <div
    v-if="!userStore.user.isAdmin"
    class="main-page__review"
  >
    <Title text="Обратная связь" />
    <div class="main-page__review-element">
      <div class="main-page__review-text">
        <Text
          text="Деятельность Этнографического музея народов Забайкалья осуществляется при поддержке министерства культуры Бурятии и главы ведомства Соелмы Дагаевой. Министерство успешно реализует и другие творческие проекты, связанные с федеральными программами, в том числе, федеральным проектом «Семейные ценности и инфраструктура культуры» национального проекта «Семья»"
        />
        <Text
          xl
          text="Мы всегда рады видеть вас в нашем музее!Оценить работу комплекса и оставить свой отзыв вы можете пройдя тест, отсканировав QR-код →"
        />
      </div>
      <img
        :src="QR"
        alt="QR"
        style="width: 332px; cursor: pointer"
        @click="router.push('/review')"
      />
    </div>
  </div>
  <ModalRegisterAuth v-model:isRegisterOpen="isRegisterOpen" />
  <ModalBuyingItem
    v-model:isitem-modal-open="isitemModalOpen"
    :date="date"
    :item-name="itemName"
    :item-price="itemPrice"
  />
  <ModalBuyingTicket v-model:isModalOpen="isModalOpen" />
</template>

<script setup lang="ts">
  import {
    Button,
    Images,
    List,
    ListItemProps,
    ModalBuyingItem,
    ModalRegisterAuth,
    ModalBuyingTicket,
    Title,
    Text,
  } from '@/components';
  import { DESCRIPTION_TEXT, animals, images } from '@/entities/consts';
  import { EventsMainTitle, useEventsStore } from '@/entities/events';
  import { News } from '@/entities/news';
  import QR from '@/assets/main-images/qr-code 1.png';
  import { useNewsStore } from '@/entities/news/model';
  import { useUserStore } from '@/entities/user';
  import { computed, onMounted, ref } from 'vue';
  import { router } from '@/router';

  const eventsStore = useEventsStore();
  const newsStore = useNewsStore();
  const userStore = useUserStore();
  const isRegisterOpen = ref<boolean>(false);
  const isModalOpen = ref<boolean>(false);
  const items = computed<ListItemProps[] | undefined>(() => eventsStore.upcomingEvents);
  const itemPrice = ref<number>(0);
  const date = ref<string>('');
  const itemName = ref<string>('');
  const isitemModalOpen = ref<boolean>(false);

  onMounted(async () => {
    await newsStore.fetchAllNews();
  });

  function openModal() {
    if (!localStorage.getItem('token')) {
      isRegisterOpen.value = true;
    } else {
      isModalOpen.value = true;
    }
  }

  function openItemModal(item: any) {
    if (!localStorage.getItem('token')) {
      return (isRegisterOpen.value = true);
    }
    itemPrice.value = item.price;
    date.value = item.date;
    itemName.value = item.name;
    isitemModalOpen.value = true;
  }
</script>
