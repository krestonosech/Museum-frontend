<template>
  <PageContent>
    <div
      v-if="userStore.user.isAdmin === 1"
      style="display: flex; flex-direction: column; gap: 40px"
    >
      <div style="display: flex; justify-content: center">
        <Button
          v-for="(item, index) in menus"
          :key="index"
          transparent
          class="register__button"
          :class="{ isRegister: menuItem === item }"
          @click="menuItem = item"
        >
          <p :class="{ isRegister__p: menuItem === item }">{{ item }}</p>
        </Button>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div>
          <Title
            text="Кабинет администратора"
            xs
          />
          <Text
            :text="userStore.user.email"
            xl
          />
        </div>
        <Button
          v-if="menuItem === 'ПУБЛИКАЦИИ'"
          black
          style="height: 40px"
          @click="isModalAddingOpen = true"
        >
          ДОБАВИТЬ СОБЫТИЕ
        </Button>
        <Button
          v-if="menuItem === 'НОВОСТИ'"
          black
          style="height: 40px"
          @click="isModalAddingNewsOpen = true"
        >
          ДОБАВИТЬ НОВОСТЬ
        </Button>
      </div>

      <MainPageTable
        v-if="menuItem === 'БИЛЕТЫ'"
        :items="myRequests"
      />
      <MainPageTableReviews
        v-if="menuItem === 'БИЛЕТЫ' && reviews"
        :items="reviews"
      />
      <div
        v-if="menuItem === 'БИЛЕТЫ'"
        class="admin-panel"
      >
        <Title text="Билеты на экскурсии" />
        <table v-if="excursionsRequests?.length !== 0">
          <thead>
            <tr class="admin-panel__thead">
              <th
                style="width: 160px"
                class="admin-panel__thead-th"
              >
                <p class="date">дата</p>
              </th>
              <th
                style="width: 187px"
                class="admin-panel__thead-th description__text"
              >
                адрес электронной почты
              </th>
              <th
                style="width: 300px"
                class="admin-panel__thead-th description__text"
              >
                экскурсия
              </th>
              <th
                style="width: 187px"
                class="admin-panel__thead-th description__text"
              >
                длительность
              </th>
              <th
                style="width: 187px"
                class="admin-panel__thead-th description__text"
              >
                всего билетов
              </th>
              <th
                style="width: 187px"
                class="admin-panel__thead-th description__text"
              >
                общая цена
              </th>
            </tr>
          </thead>
          <tbody class="admin-panel__tbody">
            <tr
              v-for="item in excursionsRequests"
              :key="item.id"
              class="admin-panel__tbody__tr"
            >
              <td
                class="date"
                data-label="дата"
              >
                {{ item.date }}
              </td>
              <td data-label="адрес электронной почты">{{ item.email }}</td>
              <td data-label="экскурсия">{{ item.excursion }}</td>
              <td data-label="длительность">{{ item.duration }}</td>
              <td data-label="всего билетов">{{ item.total }}</td>
              <td data-label="общая цена">{{ item.totalPrice }} рублей</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Вы пока не купили ни один билет!</p>
      </div>
      <div v-if="menuItem === 'ПУБЛИКАЦИИ'">
        <Excursions />
        <Events />
      </div>
      <div v-if="menuItem === 'НОВОСТИ'">
        <News />
      </div>
    </div>
    <MainPage v-else />
  </PageContent>
  <ModalAddingNews
    :is-modal-adding-news-open="isModalAddingNewsOpen"
    @close="close"
    @success="async () => await newsStore.fetchAllNews()"
  />
  <ModalAddingPublish
    :is-modal-adding-open="isModalAddingOpen"
    @close="close"
    @success="
      async () => {
        await eventsStore.fetchAllEvents();
        await eventsStore.fetchAllArchiveEvents();
      }
    "
  />
</template>

<script lang="ts" setup>
  import { useEventsStore } from '@/entities/events';
  import Events from './Events.vue';
  import { Reviews, useUserStore } from '@/entities/user';
  import { axios } from '@/plugins/axios';
  import { computed, onMounted, ref, watch } from 'vue';
  import {
    Button,
    ModalAddingPublish,
    PageContent,
    Text,
    Title,
    ModalAddingNews,
  } from '@/components';
  import Excursions from './Excursions.vue';
  import { MainPage, MainPageTable } from '@/entities/main';
  import News from './News.vue';
  import MainPageTableReviews from '@/entities/main/components/MainPageTableReviews.vue';
  import { useNewsStore } from '@/entities/news/model';
  import { useExcursionsStore } from '@/entities/excursions/model';

  const excursionsStore = useExcursionsStore();
  const newsStore = useNewsStore();
  const eventsStore = useEventsStore();
  const userStore = useUserStore();
  const isModalAddingOpen = ref(false);
  const isModalAddingNewsOpen = ref(false);
  const myRequests = computed(() => userStore.user.requests);
  const menuItem = ref('БИЛЕТЫ');
  const reviews = ref<Reviews[]>();
  const menus = ['БИЛЕТЫ', 'ПУБЛИКАЦИИ', 'НОВОСТИ'];
  const excursionsRequests = computed(() => excursionsStore.excursionsRequests.excursions);

  onMounted(async () => {
    await eventsStore.fetchAllArchiveEvents();
    if (userStore.user.username) await userStore.myRequests();
    await excursionsStore.fetchAllExcursions('Все');
    await excursionsStore.fetchAllExcursionsRequests();
  });

  watch(
    () => userStore.user.username,
    async () => {
      if (userStore.user.isAdmin && localStorage.getItem('token')) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        const response = await axios.post('reviews', {}, config);
        reviews.value = response.data;
      }
    },
    { deep: true, immediate: true }
  );

  function close() {
    isModalAddingOpen.value = false;
    isModalAddingNewsOpen.value = false;
    eventsStore.fetchAllEvents;
  }
</script>

<style lang="scss">
  .main-page {
    &__review {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    &__review-text {
      display: flex;
      flex-direction: column;
      gap: 40px;
      width: 900px;
    }
    &__review-element {
      display: flex;
      justify-content: space-between;
    }
    &__gallery {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__description {
      width: 900px;
      display: flex;

      &__button {
        width: 50%;
        display: flex;
        align-items: end;
        justify-content: end;
      }
    }

    &__description-block {
      display: flex;
      justify-content: end;
    }

    &__general-info {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  }
  .register {
    &__button {
      font-family: Roboto;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
      text-align: center;
      vertical-align: middle;
      text-transform: uppercase;
    }
  }
  .isRegister {
    font-family: Roboto;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
    text-transform: uppercase;

    &__p {
      border-bottom: solid 2px #1e1e1e;
    }
  }

  .admin-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-title {
      font-family: 'AA Stetica';
      font-weight: 400;
      font-size: 64px;
      line-height: 72px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    &__thead {
      & {
        border-bottom: 1px solid black;
      }
      &-th {
        padding: 10px 0;
        text-align: left;
      }
      &-th:last-child {
        text-align: right;
      }
    }

    &__tbody {
      &__tr {
        border-bottom: 1px solid black;
      }
      &__tr:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 10px 0;
      text-align: left;
    }
    td:last-child {
      text-align: right;
    }
  }
  .description__text {
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0%;
  }
  .date {
    font-family: Roboto;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
  }

  @media (max-width: 1440px) {
    .main-page {
      &__review-element {
        display: flex;
        gap: 20px;
      }
    }
  }

  @media (max-width: 750px) {
    .main-page {
      &__description {
        display: flex;
        width: auto;
      }
      &__review-element {
        display: flex;
        flex-direction: column;
      }
      &__review-text {
        width: inherit;
      }
      &__review-qr {
        display: flex;
        justify-content: center;
      }
    }
    .admin-panel table,
    .admin-panel thead,
    .admin-panel tbody,
    .admin-panel tr,
    .admin-panel th,
    .admin-panel td {
      background-color: transparent;
      display: block;
      width: 100%;
    }

    .admin-panel thead {
      display: none;
    }

    .admin-panel__tbody__tr {
      margin-bottom: 16px;
      border-bottom: 2px solid #eee;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      background: #fff;
      padding: 10px 0;
    }

    .admin-panel td {
      position: relative;
      padding-left: 50%;
      min-height: 32px;
      border: none;
      text-align: left !important;
      box-sizing: border-box;
      font-size: 16px;
      display: flex;
      align-items: center;
      width: 100%;
      white-space: normal;
      overflow-wrap: break-word;
    }

    .admin-panel td::before {
      content: attr(data-label) ': ';
      position: absolute;
      left: 10px;
      top: 10px;
      width: 45%;
      font-weight: bold;
      white-space: normal;
      font-size: 14px;
      color: #888;
      text-align: left;
    }

    .admin-panel td.date {
      font-size: 18px;
      font-weight: 500;
    }
  }
</style>
