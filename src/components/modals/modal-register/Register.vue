<template>
  <div class="register">
    <div class="register__buttons">
      <Button
        transparent
        class="register__button"
        :class="{ isRegister: isRegister }"
        @click="isRegister = true"
      >
        <p :class="{ isRegister__p: isRegister }">РЕГИСТРАЦИЯ</p>
      </Button>
      <Button
        transparent
        class="register__button"
        :class="{ isRegister: !isRegister }"
        @click="isRegister = false"
      >
        <p :class="{ isRegister__p: !isRegister }">ВХОД</p>
      </Button>
    </div>
    <div
      v-if="isRegister"
      class="register__register"
    >
      <input
        v-model="username"
        class="register__input"
        placeholder="Имя и фамилия"
      />
      <input
        v-model="email"
        class="register__input"
        placeholder="Адрес электронной почты"
      />
      <div style="display: flex; justify-content: space-between">
        <input
          v-model="password"
          class="register__input"
          style="width: 235px"
          placeholder="Пароль"
          type="password"
        />
        <input
          v-model="confirmPassword"
          class="register__input"
          style="width: 235px"
          placeholder="Повторите пароль"
          type="password"
        />
      </div>
    </div>
    <div
      v-else
      class="register__auth"
    >
      <input
        v-model="email"
        class="register__input"
        placeholder="Адрес электронной почты"
      />
      <input
        v-model="password"
        class="register__input"
        placeholder="Пароль"
        type="password"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineModel, watch, defineEmits } from 'vue';
  import { Button } from '../../ui/button';
  import { showNotification } from '@/plugins/notifications';
  import { router } from '@/router';
  import { axios } from '@/plugins/axios';
  import { useUserStore } from '@/entities/user';

  const userStore = useUserStore();
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const isApply = defineModel<boolean>('isApply', { required: true });
  const isRegister = defineModel<boolean>('isRegister', { required: true });
  const emit = defineEmits(['success']);

  watch(
    () => isApply.value,
    async () => {
      if (isRegister.value)
        try {
          if (isRegister.value && !email.value.includes('@')) {
            return showNotification({
              text: 'Введите правильный формат почты!',
              type: 'error',
            });
          }
          if (isRegister.value && username.value.length < 6) {
            return showNotification({
              text: 'Недостаточное количество символов в имени!',
              type: 'error',
            });
          }
          if (isRegister.value && (!password.value || !username.value || !email.value)) {
            return showNotification({
              text: 'Не все данные введены!',
              type: 'error',
            });
          }
          if (isRegister.value && password.value !== confirmPassword.value) {
            return showNotification({
              text: 'Пароли не равны!',
              type: 'error',
            });
          }
          const data = {
            username: username.value,
            password: password.value,
            email: email.value,
          };

          await axios.post('/register', data);
          const token = await userStore.loginUser(email.value, password.value);
          if (token) localStorage.setItem('token', token);
          router.push('/main');
          showNotification({
            text: 'Регистрация прошла успешно',
            type: 'success',
          });
        } catch (err) {
          showNotification({
            text: 'Не удалось зарегистрироваться!',
            type: 'error',
          });
        }
      try {
        if (!isRegister.value && (!password.value || !email.value)) {
          return showNotification({
            text: 'Не все данные введены!',
            type: 'error',
          });
        }
        const token = await userStore.loginUser(email.value, password.value);
        if (token) {
          localStorage.setItem('token', token);
        } else return Error;
        router.push('/main');
        showNotification({
          text: 'Авторизация прошла успешно',
          type: 'success',
        });
        emit('success');
        closeModal();
      } catch (err) {
        showNotification({
          text: 'Не удалось авторизироваться!',
          type: 'error',
        });
      }
      await userStore.myRequests();
    }
  );

  function closeModal() {
    isRegister.value = false;
  }
</script>

<style lang="scss" scoped>
  .register {
    display: flex;
    flex-direction: column;
    gap: 40px;

    &__register {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__auth {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__buttons {
      display: flex;
      justify-content: center;
    }

    &__input {
      border: none;
      border-bottom: solid 1px #bababa;
      width: 550;
      height: 44;
      padding: 10px;
      gap: 10px;
      border-bottom-width: 1px;
    }

    &__input::placeholder {
      text-align: center;
    }

    &__input:focus {
      outline: none;
      border-bottom: solid 1px #bababa;
    }

    &__button {
      font-family: Roboto;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0%;
      text-align: center;
      vertical-align: middle;
      text-transform: uppercase;
    }
  }
  .isRegister {
    font-family: Roboto;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
    text-transform: uppercase;

    &__p {
      border-bottom: solid 2px #1e1e1e;
    }
  }
</style>
