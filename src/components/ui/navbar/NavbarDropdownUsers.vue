<template>
  <Transition name="dropdown">
    <div
      v-if="isShowProfile"
      class="profile-dropdown"
    >
      <Text
        xl
        style="padding: 10px 20px"
        class="profile-dropdown__item"
        text="Как добраться"
        @click="router.push('/path-to-museum')"
      />
      <Text
        class="profile-dropdown__item"
        text="Режим работы"
        xl
        @click="router.push('/work-time')"
      />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
  import { Text } from '@/components';
  import { router } from '@/router';
  import { defineModel } from 'vue';
  const isShowProfile = defineModel<boolean>('isShowProfile', { required: true });
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
