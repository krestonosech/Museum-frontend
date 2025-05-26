<template>
  <Modal
    v-model:open="isModalAddingOpen"
    :apply-button="isChange ? 'Изменить' : 'Добавить'"
    :title="isChange ? 'Изменить событие' : 'Добавить событие'"
    :is-delete-item="isDeleteItem"
    @delete="deletePublish"
    @close="closeModal"
    @apply="addRequest"
  >
    <div class="register">
      <textarea
        v-model="typePublish"
        class="register__input"
        placeholder="Тип публикации"
      />
      <textarea
        v-model="name"
        class="register__input"
        placeholder="Название"
      />
      <select
        v-model="type"
        class="register__input"
      >
        <option
          v-for="(item, index) in events"
          :key="index"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
      <VueDatePicker
        v-model="date"
        multi-calendars
        range
        :time-picker="false"
        class="register__input"
      />
      <textarea
        v-model="description"
        class="register__input"
        placeholder="Описание"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { defineModel, ref, defineEmits, onMounted, defineProps, watch, computed } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { Modal } from '@/components';
  import { EVENTS_BUTTONS } from '@/entities/consts';

  const isModalAddingOpen = defineModel<boolean>('isModalAddingOpen', { required: true });
  const props = defineProps<{
    id?: number;
    type?: string;
    description?: string;
    date?: string;
    name?: string;
    isChange?: boolean;
    isDeleteItem?: boolean;
  }>();
  const emit = defineEmits(['close', 'success']);
  const typePublish = ref('');
  const name = ref('');
  const type = ref('Фестиваль');
  const date = ref();
  const description = ref('');
  const events = computed(() => EVENTS_BUTTONS.slice(1, EVENTS_BUTTONS.length));

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

  watch(
    () => props.id,
    () => {
      if (props.date) {
        date.value = parseFormattedDate(props.date) ?? '';
      }
      description.value = props.description ?? '';
      name.value = props.name ?? '';
      type.value = props.type ?? '';
      typePublish.value = 'Событие';
    }
  );

  onMounted(() => {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    date.value = [startDate, endDate];
  });

  function formatTodayMonthWithDay() {
    if (Array.isArray(date.value) && date.value.length === 2 && date.value[0] && date.value[1]) {
      const [start, end] = date.value;
      const startDay = start.getDate();
      const startMonth = months[start.getMonth()];
      const endDay = end.getDate();
      const endMonth = months[end.getMonth()];

      if (
        start.getDate() === end.getDate() &&
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear()
      ) {
        return `${startDay} ${startMonth}`;
      } else if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${startDay} - ${endDay} ${startMonth}`;
      } else {
        return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
      }
    } else if (date.value instanceof Date) {
      const day = date.value.getDate();
      const monthName = months[date.value.getMonth()];
      return `${day} ${monthName}`;
    }
    return '';
  }

  function parseFormattedDate(str: string) {
    const year = new Date().getFullYear();
    const singleDateMatch = str.match(/^(\d{1,2})\s+([а-яё]+)$/i);
    const rangeSameMonthMatch = str.match(/^(\d{1,2})\s*-\s*(\d{1,2})\s+([а-яё]+)$/i);
    const rangeDiffMonthMatch = str.match(/^(\d{1,2})\s+([а-яё]+)\s*-\s*(\d{1,2})\s+([а-яё]+)$/i);

    if (singleDateMatch) {
      const [, day, monthName] = singleDateMatch;
      const month = months.indexOf(monthName.toLowerCase());
      if (month === -1) return null;
      return new Date(year, month, Number(day));
    }
    if (rangeSameMonthMatch) {
      const [, startDay, endDay, monthName] = rangeSameMonthMatch;
      const month = months.indexOf(monthName.toLowerCase());
      if (month === -1) return null;
      return [new Date(year, month, Number(startDay)), new Date(year, month, Number(endDay))];
    }
    if (rangeDiffMonthMatch) {
      const [, startDay, startMonthName, endDay, endMonthName] = rangeDiffMonthMatch;
      const startMonth = months.indexOf(startMonthName.toLowerCase());
      const endMonth = months.indexOf(endMonthName.toLowerCase());
      if (startMonth === -1 || endMonth === -1) return null;
      return [
        new Date(year, startMonth, Number(startDay)),
        new Date(year, endMonth, Number(endDay)),
      ];
    }
    return null;
  }

  function closeModal() {
    isModalAddingOpen.value = false;
    emit('close');
    typePublish.value = '';
    name.value = '';
    type.value = 'Фестиваль';
    date.value = '';
    description.value = '';
  }

  async function addRequest() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const data = {
        id: props.id,
        date: formatTodayMonthWithDay(),
        type: type.value,
        name: name.value,
        typePublish: 'Событие',
        description: description.value,
      };

      if (props.id) {
        await axios.post('/change-publish', data, config);
        showNotification({
          text: 'Публикация изменена!',
          type: 'success',
        });
      } else {
        await axios.post('/add-publish', data, config);
        showNotification({
          text: 'Публикация создана!',
          type: 'success',
        });
      }
      closeModal();
      emit('success');
    } catch {
      showNotification({
        text: 'Не удалось добавить публикацию!',
        type: 'error',
      });
    }
  }

  async function deletePublish() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios.post('/delete-publish', { id: props.id }, config);
      closeModal();
      showNotification({
        text: 'Событие удалено!',
        type: 'success',
      });
      closeModal();
      emit('success');
    } catch {
      showNotification({
        text: 'Не удалось удались событие!',
        type: 'error',
      });
    }
  }
</script>

<style lang="scss" scoped>
  .register {
    display: flex;
    flex-direction: column;
    gap: 40px;
    &__input {
      border: none;
      border-bottom: solid 1px #bababa;
      width: 550;
      height: 44;
      padding: 10px;
      gap: 10px;
      border-bottom-width: 1px;
    }

    &__input:focus {
      outline: none;
      border-bottom: solid 1px #bababa;
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
  textarea:focus,
  textarea:active,
  select:focus,
  select:active {
    outline: none;
    border: none;
    box-shadow: none;
    border-bottom: solid black 1px;
  }
  textarea {
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    padding: 10px;
  }
</style>
