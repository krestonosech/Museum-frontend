<template>
  <div class="button-group">
    <div
      class="burger-icon"
      @click="isBurgerOpen = !isBurgerOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div
      class="button-group__items"
      :class="{ 'button-group__items--open': isBurgerOpen }"
    >
      <RouterLink
        v-for="(item, index) in allButtons"
        :key="index"
        :to="`/${item.id}`"
        class="button-group__button"
        :class="{
          'button-group__button': filterStore.page !== item.id,
        }"
        @click="
          filterStore.page = item.id;
          isBurgerOpen = false;
        "
      >
        <p
          class="button-group__p"
          :class="{ 'button-group__isActive': router.currentRoute.value.name === item.id }"
        >
          {{ item.label }}
        </p>
      </RouterLink>
      <div
        v-if="router.currentRoute.value.name !== 'review' && !userStore.user.isAdmin"
        class="button-group__profile-wrapper"
        @mousedown="isShowUsersDropdown = !isShowUsersDropdown"
      >
        <div class="button-group__profile-wrapper-div">
          <p class="button-group__button">ПОЛЬЗОВАТЕЛЯМ</p>
          <img :src="isShowUsersDropdown ? Up : Down" />
        </div>
        <NavbarDropdownUsers :is-show-profile="isShowUsersDropdown" />
      </div>
      <div
        v-if="router.currentRoute.value.name !== 'review'"
        class="button-group__profile-wrapper"
        @mousedown="isShowProfile = !isShowProfile"
      >
        <div class="button-group__profile-wrapper-div">
          <p class="button-group__button">ЛИЧНЫЙ КАБИНЕТ</p>
          <img :src="isShowProfile ? Up : Down" />
        </div>
        <NavbarDropdown :is-show-profile="isShowProfile" />
      </div>
      <p
        v-if="!userStore.user.isAdmin && router.currentRoute.value.name !== 'review'"
        class="button-group__profile-wrapper"
      >
        +7(3012) 33-25-10
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFiltersStore } from '@/entities/filters/model';
  import { Filters } from '@/entities/filters/types';
  import { useUserStore } from '@/entities/user';
  import { router } from '@/router';
  import { computed, onMounted, ref } from 'vue';
  import NavbarDropdown from './NavbarDropdown.vue';
  import Down from '@/assets/icons/chevron-down.svg';
  import Up from '@/assets/icons/chevron-up.svg';
  import NavbarDropdownUsers from './NavbarDropdownUsers.vue';

  const filterStore = useFiltersStore();
  const userStore = useUserStore();
  const isBurgerOpen = ref(false);
  const isShowProfile = ref(false);
  const isShowUsersDropdown = ref(false);

  onMounted(() => {
    if (localStorage.getItem('token')) userStore.profileMe();
    isShowProfile.value = false;
  });

  const buttons: { label: string; id: Filters['page'] }[] = [
    { label: 'О МУЗЕЕ', id: 'about-museum' },
    { label: 'ЭТНОЗООСАД', id: 'etnozoo' },
    { label: 'НОВОСТИ', id: 'news' },
    { label: 'ЭКСКУРСИИ', id: 'excursions' },
    { label: 'СОБЫТИЯ', id: 'events' },
  ];

  const allButtons = computed<{ label: string; id: Filters['page'] }[]>(() => {
    if (userStore.user.isAdmin === 1) {
      return [];
    }
    if (router.currentRoute.value.name === 'review') {
      return [{ label: 'НА ГЛАВНУЮ', id: 'main' }];
    }
    return buttons;
  });
</script>
<style lang="scss" scoped>
  .button-group {
    display: flex;
    justify-content: space-around;
    gap: 4px;

    &__button {
      position: relative;
      padding: 0 10px;
      font-weight: 400;
      min-width: 70px !important;
      font-size: 16px;
      text-decoration: none;
      cursor: pointer;
      background: none;
      border: none;
      outline: none;
    }
    &__p {
      min-width: 100%;
    }
    &__profile-wrapper {
      position: relative;
      display: inline-block;
    }
    &__profile-wrapper-div {
      display: flex;
    }
    &__isActive {
      border-bottom: 2px solid #1e1e1e;
    }

    &__items {
      display: flex;
      gap: 4px;
      align-items: center;
      &--open {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 50px;
        left: 0;
        width: 100vw;
        background: #fff;
        z-index: 100;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 10px 0;
      }
    }
  }
  .burger-icon {
    display: none;
    flex-direction: column;
    width: 30px;
    height: 24px;
    justify-content: space-between;
    cursor: pointer;
    span {
      display: block;
      height: 4px;
      width: 100%;
      background: #1e1e1e;
      border-radius: 2px;
    }
  }

  @media (max-width: 750px) {
    .button-group {
      .burger-icon {
        display: flex;
      }
      &__items {
        display: none;
        &--open {
          display: flex;
        }
      }
    }
  }

  @media (max-width: 1440px) {
    .button-group {
      .burger-icon {
        display: flex;
      }
      &__items {
        display: none;
        gap: 30px;
        &--open {
          display: flex;
        }
      }
    }
  }

  @media (max-width: 750px) {
    .button-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
      &__isActive {
        width: 70%;
      }
    }
  }
</style>
