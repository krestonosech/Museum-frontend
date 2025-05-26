<template>
  <Modal
    v-model:open="isModalAddingNewsOpen"
    :apply-button="isChange ? 'Изменить' : 'Добавить'"
    :title="isChange ? 'Изменить новость' : 'Добавить новость'"
    :is-delete-item="isDeleteItem"
    @delete="deleteNews"
    @close="closeModal"
    @apply="addRequest"
  >
    <div class="register">
      <textarea
        v-model="title"
        class="register__input"
        placeholder="Название новости"
      />
      <textarea
        v-model="text"
        class="register__input"
        placeholder="Текст новости"
      />
      <textarea
        v-model="description"
        class="register__input"
        placeholder="Описание новости"
      />
      <input
        type="file"
        class="register__input"
        placeholder="картинка"
        @change="onFileChange"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { defineModel, ref, defineEmits, defineProps, watch } from 'vue';
  import { axios } from '@/plugins/axios';
  import { showNotification } from '@/plugins/notifications';
  import { Modal } from '@/components';

  const isModalAddingNewsOpen = defineModel<boolean>('isModalAddingNewsOpen', { required: true });
  const props = defineProps<{
    id?: number;
    title?: string;
    text?: string;
    description?: string;
    image?: string;
    isChange?: boolean;
    isDeleteItem?: boolean;
  }>();
  const emit = defineEmits(['close', 'success']);
  const title = ref('');
  const text = ref('');
  const description = ref('');
  const image = ref<File | null>(null);

  watch(
    () => props.id,
    () => {
      title.value = props.title ?? '';
      description.value = props.description ?? '';
      text.value = props.text ?? '';
    }
  );

  function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const img = new Image();

      img.onload = () => {
        if (img.width > img.height) {
          image.value = file;
        } else {
          image.value = null;
          showNotification({
            text: 'Пожалуйста, выберите горизонтальное изображение.',
            type: 'error',
          });
          if (target) target.value = '';
        }
      };

      const reader = new FileReader();
      reader.onload = e => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    } else {
      image.value = null;
    }
  }

  function closeModal() {
    isModalAddingNewsOpen.value = false;
    emit('close');
    title.value = '';
    text.value = '';
    description.value = '';
    image.value = null;
  }

  async function addRequest() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const formData = new FormData();
      formData.append('title', title.value);
      formData.append('text', text.value);
      formData.append('description', description.value);
      if (image.value) {
        formData.append('image', image.value);
      }
      if (props.id) {
        formData.append('id', props.id.toString());
      }
      if (props.isChange) {
        await axios.post('/change-news', formData, config);
        showNotification({
          text: 'Новость изменена!',
          type: 'success',
        });
      } else {
        await axios.post('/add-news', formData, config);
        showNotification({
          text: 'Новость создана!',
          type: 'success',
        });
      }
      closeModal();
      emit('success');
    } catch {
      if (props.isChange) {
        showNotification({
          text: 'Не удалось изменить новость!',
          type: 'error',
        });
      } else {
        showNotification({
          text: 'Не удалось добавить новость!',
          type: 'error',
        });
      }
    }
  }

  async function deleteNews() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios.post('/delete-news', { id: props.id }, config);
      closeModal();
      showNotification({
        text: 'Новость удалена!',
        type: 'success',
      });
      closeModal();
      emit('success');
    } catch {
      showNotification({
        text: 'Не удалось удались новость!',
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
      min-height: 44px;
      padding: 10px;
      gap: 10px;
      border-bottom-width: 1px;
    }

    &__input:focus {
      outline: none;
      border-bottom: solid 1px #bababa;
    }

    &__input:focus {
      outline: none;
      border-bottom: solid 1px #bababa;
    }
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
