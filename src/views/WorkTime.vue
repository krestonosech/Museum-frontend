<template>
  <PageContent>
    <div class="work-time">
      <Title text="Режим работы" />
      <div class="work-time__body">
        <div class="work-time__body-item">
          <div class="work-time__body-item-title">
            <Title
              xs
              text="Осенний период"
            />
            <Text text="(16 сентября – 30 октября)" />
          </div>
          <div>
            <Text text="Понедельник — вторник" />
            <Text
              text="🕐 с 09:00 до 17:30 часов – к посещению доступна парковая территория Этномузея и «Живой уголок»"
            />
            <Text text=" Музейные комплексы закрыты" />
            <br />
            <Text text="Среда — пятница" />
            <Text text="🕐 с 09:00 до 17:30 часов" />
            <br />
            <Text text="Суббота — воскресенье" />
            <Text text="🕐 с 10:00 до 18:30 часов" />
          </div>
        </div>
        <div class="work-time__body-item">
          <div class="work-time__body-item-title">
            <Title
              xs
              text="Зимний период"
            />
            <Text text="(1 ноября – 31 марта)" />
          </div>
          <div>
            <Text text="Понедельник — Воскресенье" />
            <Text text="🕐 с 09:00 до 17:30 часов" />
            <br />
            <Text
              text="❗ В понедельник и вторник музейные комплексы закрыты, к посещению доступны парковая территория и “Уголок живой природы”"
              class="work-time__body-item-text"
            />
          </div>
        </div>
        <div class="work-time__body-item">
          <div class="work-time__body-item-title">
            <Title
              xs
              text="Весенний период"
            />
            <Text text="(1 апреля – 31 мая)" />
          </div>
          <div>
            <Text text="Понедельник — вторник" />
            <Text
              text="🕐 с 09:00 до 17:30 часов – к посещению доступна парковая территория Этномузея и «Живой уголок»"
            />
            <Text text="❗ Музейные комплексы закрыты" />
            <br />
            <Text text="Среда — пятница" />
            <Text text="🕐 с 09:00 до 17:30 часов" />
            <br />
            <Text text="Суббота — воскресенье" />
            <Text text="🕐 с 10:00 до 18:30 часов" />
          </div>
        </div>
        <div class="work-time__body-item">
          <div class="work-time__body-item-title">
            <Title
              xs
              text="Летний период"
            />
            <Text text="(1 июня – 15 сентября)" />
          </div>
          <div>
            <Text text="Понедельник — вторник" />
            <Text
              text="🕐 с 10:00 до 18:30 часов – к посещению доступна парковая территория Этномузея и «Живой уголок»"
            />
            <Text text="❗ Музейные комплексы закрыты" />
            <br />
            <Text text="Среда — пятница" />
            <Text text="🕐 с 10:00 до 18:30 часов" />
            <br />
            <Text text="Суббота — воскресенье" />
            <Text text="🕐 с 10:00 до 19:00 часов" />
            <br />
            <Text text="Режим работы “Живого уголка”" />
            <Text text="🕐 С 10:00 до 17:30 часов" />
            <Text text="❗ Последний понедельник месяца “Живой уголок” закрыт на санитарный день" />
          </div>
        </div>
      </div>
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent, Text, Title } from '@/components';
</script>

<style lang="scss" scoped>
  .work-time {
    display: flex;
    flex-direction: column;
    gap: 40px;
    &__body {
      display: flex;
      flex-direction: column;
      gap: 70px;
    }
    &__body-item {
      display: flex;
      gap: 30px;
    }
    &__body-item-title {
      width: 218px;
    }
    &__body-item-text-group {
      display: flex;
      flex-direction: column;
      gap: 40px;
      width: 1132px;
    }
    &__body-item-title {
      width: 250px;
    }
    &__body-item-text {
      width: 1000px;
    }
  }

  @media (max-width: 1440px) {
    .work-time {
      &__body-item-title {
        width: 150px;
      }
      &__body-item-text-group {
        width: 550px;
      }
      &__body-item-text {
        width: inherit;
        max-width: 400px;
      }
    }
  }

  @media (max-width: 750px) {
    .work-time {
      &__body-item-title {
        width: 130px;
      }
      &__body-item-text-group {
        width: inherit;
        max-width: 400px;
      }
      &__body-item-text {
        width: inherit;
        max-width: 400px;
      }
    }
  }
</style>
