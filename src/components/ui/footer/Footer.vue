<template>
  <div class="footer">
    <p class="footer__address">г.Улан-Удэ, пос.Верхняя Березовка, дом 17б</p>
    <a
      href="https://cleversite.ru/Confidential.pdf"
      download="Политика_конфиденциальности.pdf"
      class="footer__privacy-policy"
      target="_blank"
      rel="noopener noreferrer"
    >
      Политика конфиденциальности
    </a>
    <p class="footer__phone">+7(3012) 33-25-10</p>
    <div>
      <Button transparent>
        <img
          :src="VK"
          alt="Вконтакте"
          @click="open(1)"
        />
      </Button>
      <Button transparent>
        <img
          :src="YOUTUBE"
          alt="Ютьюб"
          @click="open(2)"
        />
      </Button>
      <Button transparent>
        <img
          :src="OWL"
          alt="Сова"
          @click="open(3)"
        />
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import VK from '@/assets/icons/VK.svg';
  import YOUTUBE from '@/assets/icons/YOUTUBE.svg';
  import OWL from '@/assets/icons/OWL.svg';
  import Button from '../button/Button.vue';

  function open(id: number) {
    if (id === 1) {
      window.open('https://vk.com/nash_etnomuzey');
    }
    if (id === 2) {
      window.open('https://www.youtube.com/channel/UCMiqPawwz5SBzQbvVc0dE1w');
    }
    if (id === 3) {
      window.open(
        'https://www.tripadvisor.ru/Attraction_Review-g662364-d6490532-Reviews-Ethnographic_Museum_of_the_People_of_Transbaikalia_Culture_Gau-Ulan_Ude_Republic_.html'
      );
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: end;
    height: 64px;
    border-top: solid #bababa 1px;
    &__address {
      font-family: 'Roboto';
      font-weight: 300;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
    }
    &__privacy-policy {
      font-family: 'Roboto';
      font-weight: 300;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
      color: #1e1e1e;
    }
    &__phone {
      font-family: 'Roboto';
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
      text-transform: uppercase;
    }
  }
  @media (max-width: 750px) {
    .footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      height: initial;
    }
  }
</style>
