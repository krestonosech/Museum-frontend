<template>
  <Transition name="dropdown">
    <div
      v-if="isShowProfile && userStore.user.username"
      class="profile-dropdown"
    >
      <RouterLink
        v-if="!userStore.user.isAdmin"
        :to="'/profile'"
        class="profile-dropdown__item"
        style="text-decoration: none"
        @click="emit('close')"
      >
        <Text
          xl
          :text="userStore.user.username"
        />
      </RouterLink>
      <Text
        v-if="!userStore.user.isAdmin"
        xl
        style="padding: 10px 20px"
        :text="userStore.user.email"
      />
      <Text
        class="profile-dropdown__item"
        text="Выйти"
        xl
        @click="logout"
      />
    </div>
  </Transition>
  <Transition name="dropdown">
    <div
      v-if="isShowProfile && !userStore.user.username"
      class="profile-dropdown"
    >
      <Text
        v-if="!userStore.user.isAdmin"
        class="profile-dropdown__item"
        text="Авторизация"
        xl
        @click="
          isRegisterOpen = true;
          isRegister = false;
          isApply = !isApply;
        "
      />
      <Text
        v-if="!userStore.user.isAdmin"
        class="profile-dropdown__item"
        text="Регистрация"
        xl
        @click="
          isRegisterOpen = true;
          isRegister = true;
          isApply = !isApply;
        "
      />
    </div>
  </Transition>
  <ModalRegisterAuth
    v-model:isRegisterOpen="isRegisterOpen"
    v-model:isRegister="isRegister"
  />
</template>

<script lang="ts" setup>
  import { ModalRegisterAuth, Text } from '@/components';
  import { useUserStore } from '@/entities/user';
  import { router } from '@/router';
  import { ref, defineModel, defineEmits } from 'vue';

  const userStore = useUserStore();
  const isRegisterOpen = ref<boolean>(false);
  const isRegister = ref<boolean>(true);
  const isApply = ref<boolean>(false);
  const isShowProfile = defineModel<boolean>('isShowProfile', { required: true });
  const emit = defineEmits(['close']);

  function logout() {
    router.push('/main');
    localStorage.removeItem('token');
    if (userStore.user.isAdmin) {
      location.reload();
    }
    userStore.user.email = '';
    userStore.user.requests = [];
    userStore.user.id = 0;
    userStore.user.username = '';
    emit('close');
  }
</script>
<style lang="scss" scoped>
  .profile-dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    min-width: 160px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    z-index: 100;
    padding: 8px 0;
    display: flex;
    flex-direction: column;

    &__item {
      padding: 10px 20px;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.2s;
      &:hover {
        background: #f5f5f5;
      }
    }
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 0.2s;
  }
  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
  }
  .dropdown-enter-to,
  .dropdown-leave-from {
    opacity: 1;
  }
</style>
