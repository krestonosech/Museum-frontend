<template>
  <p
    class="m-title"
    :class="{
      'xl-title': xl,
      'm-title': m,
      'xs-title': xs,
    }"
  >
    {{ text }}
  </p>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';

  defineProps<{
    xl?: boolean;
    m?: boolean;
    xs?: boolean;
    text: string;
  }>();
</script>

<style lang="scss" scoped>
  .m-title {
    font-family: 'AA Stetica';
    font-weight: 400;
    font-size: 64px;
    line-height: 72px;
  }

  .xl-title {
    font-family: 'AA Stetica';
    font-weight: 400;
    font-size: 118px;
    line-height: 100%;
    letter-spacing: 0%;
    padding-bottom: 20px;
    border-bottom: solid black 2px;
  }

  .xs-title {
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  @media (max-width: 1440px) {
    .xl-title {
      font-size: 62px;
    }
  }

  @media (max-width: 750px) {
    .m-title {
      line-height: inherit;
      font-size: 32px;
    }
    .xl-title {
      line-height: inherit;
      font-size: 40px;
    }
    .xs-title {
      line-height: inherit;
      font-size: 20px;
    }
  }
</style>
