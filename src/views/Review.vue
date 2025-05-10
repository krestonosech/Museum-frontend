<template>
  <div class="review">
    <div
      v-if="!isReview"
      class="review__text"
    >
      <Title
        text="Здравствуйте!"
        xs
      />
      <Text
        style="text-align: center"
        text="Министерство культуры Российской Федерации приглашает Вас принять участие в оценке удовлетворенности граждан работой государственных и муниципальных организаций культуры, искусства и народного творчества"
      />
      <Text
        style="text-align: center"
        text="Анкета заполняется просто. Внимательно прочитайте вопросы анкеты и выберите тот вариант ответа, который является наиболее подходящим для Вас"
      />
      <Text
        style="text-align: center"
        text="Обратите внимание – на некоторые вопросы Вы можете давать несколько вариантов ответа, отвечать своими словами"
      />
      <Text
        style="text-align: center"
        xl
        text="Данные, которые мы собираем в этом опросе, являются полностью конфиденциальными"
      />
      <Button
        black
        style="width: 218px"
        @click="isReview = true"
      >
        ДАЛЕЕ
      </Button>
    </div>
    <div
      v-else
      class="review__test"
    >
      <div>
        <Text
          style="color: #6e6e6e"
          text="Укажите ваш регион*"
          xl
        />
        <select v-model="region">
          <option
            v-for="(item, index) in regions"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div>
        <Text
          style="color: #6e6e6e"
          text="Укажите вид организации, деятельность которой Вы оцениваете*"
          xl
        />
        <select v-model="typeOrganization">
          <option
            v-for="(item, index) in typeOrganizations"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div>
        <Text
          style="color: #6e6e6e"
          text="Укажите, пожалуйста, Ваш пол*"
          xl
        />
        <select v-model="sex">
          <option
            v-for="(item, index) in sexes"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div>
        <Text
          style="color: #6e6e6e"
          text="Ваш возраст*"
          xl
        />
        <select v-model="age">
          <option
            v-for="(item, index) in ages"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div>
        <Text
          style="color: #6e6e6e"
          text="Насколько Вы удовлетворены работой учреждения в целом?*"
          xl
        />
        <select v-model="overview">
          <option
            v-for="(item, index) in overviews"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div>
        <Text
          style="color: #6e6e6e"
          text="Оставьте отзыв в свободной форме"
          xl
        />
        <textarea
          v-model="review"
          style="width: 100%; border: none; border-bottom: solid black 1px"
        />
      </div>
      <div style="display: flex; justify-content: center">
        <Button
          black
          style="width: 218px"
          @click="sendReview"
        >
          Отправить
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Button, Title } from '@/components';
  import Text from '@/components/Text.vue';
  import { regions, sexes, overviews, typeOrganizations, ages } from '@/entities/consts';
  import { ref } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { router } from '@/router';
  const isReview = ref(false);
  const region = ref('');
  const typeOrganization = ref('');
  const sex = ref('');
  const age = ref('');
  const overview = ref('');
  const review = ref('');

  async function sendReview() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const data = {
        region: region.value,
        typeOrganization: typeOrganization.value,
        sex: sex.value,
        age: age.value,
        overview: overview.value,
        review: review.value,
      };

      await axios.post('/send-review', data, config);
      showNotification({
        type: 'success',
        text: 'Отзыв успешно отправлен!',
      });
      router.push('/main');
    } catch {
      showNotification({
        type: 'error',
        text: 'Не удалось отправить отзыв!',
      });
    }
  }
</script>

<style lang="scss" scoped>
  .review {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__text {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      justify-content: center;
      max-width: 1132px;
      height: 85vh;
    }
    &__test {
      display: flex;
      flex-direction: column;
      gap: 20px;
      height: 85vh;
      justify-content: center;
    }
  }
  select {
    width: 100%;
    border: none;
    padding: 10px;
    border-bottom: solid black 1px;
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  select:active {
    width: 100%;
    border: none;
    padding: 10px;
    border-bottom: solid black 1px;
  }
  option {
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
  }
  textarea {
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    padding: 10px;
  }
  textarea:focus,
  textarea:active,
  select:focus,
  select:active {
    outline: none;
    border: none;
    box-shadow: none;
    border-bottom: solid black 1px;
  }

  @media (max-width: 750px) {
    .review {
      &__test {
        height: 100vh;
      }
    }
  }
</style>
