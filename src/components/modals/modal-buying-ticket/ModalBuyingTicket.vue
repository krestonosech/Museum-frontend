<template>
  <Modal
    v-model:open="isModalOpen"
    apply-button="Перейти к оплате"
    title="Билет на экскурсию или вход в музей"
    @close="closeModal"
    @apply="buyTicket"
  >
    <div class="ticket-buying">
      <div class="ticket-buying__lines">
        <Text text="Количество билетов:" />
        <div class="ticket-buying__buttons">
          <img
            src="@/assets/icons/chevron-left.svg"
            style="cursor: pointer"
            alt="Влево"
            @click="decrement"
          />
          <Text :text="count.toString()" />
          <img
            src="@/assets/icons/chevron-right.svg"
            style="cursor: pointer"
            alt="Вправо"
            @click="count++"
          />
        </div>
      </div>
      <div class="ticket-buying__lines">
        <Text text="К оплате:" />
        <Text :text="`${price.toString()} рублей`" />
      </div>
      <select v-model="excursionsId">
        <option value="0">Входной билет на территорию этнографического музея</option>
        <option
          v-for="item in excursionsStore.excursions.excursions"
          :key="item.id"
          :value="item.id"
        >
          <Text :text="item.name" />
        </option>
      </select>
      <VueDatePicker
        v-model="date"
        :time-picker="false"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import VueDatePicker from '@vuepic/vue-datepicker';
  import { Modal } from '@/components/ui/modal';
  import { useUserStore } from '@/entities/user';
  import { defineModel, ref, computed, onMounted } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { useExcursionsStore } from '@/entities/excursions/model';
  import { Text } from '@/components';

  const excursionsStore = useExcursionsStore();
  const excursionsId = ref<string | number>('0');
  const userStore = useUserStore();
  const isModalOpen = defineModel<boolean>('isModalOpen', { required: true });
  const date = ref();
  const currentPrice = computed(
    () => excursionsStore.excursions.excursions?.find(item => item.id === excursionsId.value)?.price
  );
  const count = ref(1);
  const price = computed(() => (currentPrice.value || 400) * count.value);

  function decrement() {
    if (count.value <= 1) return;
    count.value--;
  }

  async function buyTicket() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      const data = {
        username: userStore.user.username,
        email: userStore.user.email,
        date: formatSingleDate(date.value),
        duration:
          excursionsStore.excursions.excursions?.find(item => item.id === excursionsId.value)
            ?.duration || 'Весь день',
        excursion:
          excursionsStore.excursions.excursions?.find(item => item.id === excursionsId.value)
            ?.name || 'Входной билет на территорию этнографического музея',
        total: count.value,
        totalPrice: price.value,
      };

      await axios.post('/add-excursion-requests', data, config);
      showNotification({
        text: 'Билет куплен',
        type: 'success',
      });
      closeModal();
    } catch {
      showNotification({
        text: 'Не удалось купить билет!',
        type: 'error',
      });
    }
    isModalOpen.value = false;
  }

  function closeModal() {
    isModalOpen.value = false;
    excursionsId.value = 0;
    date.value = undefined;
    count.value = 1;
  }

  onMounted(() => {
    date.value = new Date();
  });

  function formatSingleDate(date: any) {
    if (!(date instanceof Date)) return '';
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    return `${day} ${monthName}`;
  }

  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
</script>

<style scoped lang="scss">
  .ticket-buying {
    display: flex;
    flex-direction: column;
    font-family: Roboto;
    font-weight: 400;
    font-size: 20px;
    gap: 10px;
    line-height: 24px;

    &__lines {
      display: flex;
      justify-content: space-between;
    }

    &__buttons {
      display: flex;
      gap: 15px;
      &__button {
        background-color: white;
        border: none;
      }
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
</style>
