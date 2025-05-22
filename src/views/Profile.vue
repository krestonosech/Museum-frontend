<template>
  <PageContent>
    <div class="profile">
      <div class="profile__header">
        <Title text="Личный кабинет" />
        <div class="profile__info">
          <p class="profile__info__username">{{ userStore.user.username }}</p>
          <p class="profile__info__email">{{ userStore.user.email }}</p>
        </div>
      </div>
      <MainPageTable
        v-if="myRequests.length !== 0"
        :items="myRequests"
      />
      <p v-else>Вы пока не купили ни один билет!</p>
      <div class="admin-panel">
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
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent, Title } from '@/components';
  import { MainPageTable } from '@/entities/main';
  import { useUserStore } from '@/entities/user';
  import { computed, onMounted } from 'vue';
  import { useExcursionsStore } from '@/entities/excursions/model';

  const excursionsStore = useExcursionsStore();
  const userStore = useUserStore();
  const myRequests = computed(() => userStore.user.requests);
  const excursionsRequests = computed(() => excursionsStore.excursionsRequests.excursions);

  onMounted(async () => {
    await userStore.myRequests();
    await excursionsStore.fetchAllExcursionsRequests(userStore.user.username);
  });
</script>

<style lang="scss" scoped>
  .profile {
    display: flex;
    flex-direction: column;
    gap: 40px;
    &__header {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 0;
    }
    &__info {
      display: flex;
      flex-direction: column;
      padding: 20px 0;
      justify-content: center;
      width: 30%;
      &__username {
        display: flex;
        justify-content: end;
        width: 100%;
        font-family: AA Stetica;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        text-align: right;
      }
      &__email {
        display: flex;
        justify-content: end;
        width: 100%;
        font-family: AA Stetica;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-align: right;
      }
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
  @media (max-width: 750px) {
    .profile {
      &__header {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      &__info {
        &__username {
          justify-content: start;
        }
        &__email {
          justify-content: start;
        }
      }
    }
    .profile__info {
      width: 100%;
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
