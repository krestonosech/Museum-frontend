<template>
  <div class="admin-panel">
    <Title text="Отзывы" />
    <table>
      <thead>
        <tr class="admin-panel__thead">
          <th
            style="width: 160px"
            class="admin-panel__thead-th"
          >
            <p class="date">Тип организации</p>
          </th>
          <th
            style="width: 100px"
            class="admin-panel__thead-th description__text"
          >
            Пол
          </th>
          <th
            style="width: 100px"
            class="admin-panel__thead-th description__text"
          >
            Возраст
          </th>
          <th
            style="width: 187px"
            class="admin-panel__thead-th description__text"
          >
            Регион
          </th>
          <th
            style="width: 187px"
            class="admin-panel__thead-th description__text"
          >
            Описание
          </th>
          <th
            style="width: 187px"
            class="admin-panel__thead-th description__text"
          >
            Общая оценка
          </th>
        </tr>
      </thead>
      <tbody class="admin-panel__tbody">
        <tr
          v-for="item in items"
          :key="item.id"
          class="admin-panel__tbody__tr"
        >
          <td
            class="date"
            data-label="Тип организации"
          >
            {{ item.typeOrganization }}
          </td>
          <td data-label="Пол">{{ item.sex }}</td>
          <td data-label="Возраст">{{ item.age }}</td>
          <td data-label="Регион">{{ item.region }}</td>
          <td data-label="Описание">{{ item.review }}</td>
          <td data-label="Общая оценка">{{ item.overview }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { Title } from '@/components';
  import { Reviews } from '@/entities/user';
  import { defineProps } from 'vue';

  defineProps<{
    items: Reviews[];
  }>();
</script>

<style lang="scss" scoped>
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
