<template>
  <div class="container">
    <div class="content">
      <h2 class="title">Agenda Pessoal</h2>
      <q-form class="form" @submit="login">
        <q-input
          outlined 
          label="Username"
          class="form_input"
          v-model="username" 
          placeholder="luiza"
          :rules="[val => !!val || 'Username é obrigatório']"
        />
        <q-input
          outlined 
          label="Senha"
          class="form_input"
          v-model="password" 
          placeholder="*****"
          :type="isPwd ? 'password' : 'text'" 
          :rules="[val => !!val || 'Senha é obrigatório']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
        </template>
        </q-input>
        <div class="form_remember">
          <input type="checkbox" name="teste" id="teste">
          <label for="teste">Lembrar de mim</label>
        </div>
        <q-btn 
          label="Entrar"
          type="submit"
          style="background: #98bfdc; color: white;"
        />
      </q-form>
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar';
import { toast } from 'vue3-toastify';
import Button from '../components/Button.vue'
import api from '../services/api.js'
export default {
  components: { Button },
  data() {
    return {
      username: this.username,
      password: this.password,
      isPwd: true
    }
  },
  methods: {
    login(event) {
      event.preventDefault()

      api.post('/auth/login', {
        username: this.username,
        password: this.password
      }).then(response => {
        const data = response.data

        localStorage.setItem("token", data.accessToken);
        api.defaults.headers.common['Authorization'] = "Bearer " + data.accessToken;

        api.get('/usuario/buscar/' + data.id).then(userResponse => {
          if (userResponse.status == 200) {
            localStorage.setItem("user", JSON.stringify(userResponse.data.object.usuario))
            this.$router.push('/')
          }
        })

      }).catch((_error) => {
        Notify.create({
          message: 'Algo deu errado!',
          color: 'negative',
          position: 'top-right',
          type: 'negative',
          actions: [{ icon: 'close', color: 'white' }]
        })
      }) 
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--blue-500);
  }
  .content {
    background: var(--blue-300);
    padding: 2rem;
    width: 25.25rem;;
    background: var(--white);
    box-shadow: 0 10px 20px rgb(162 162 162 / 19%), 0 6px 6px rgb(98 98 98 / 23%);
  }
  .title {
    text-align: center;
    margin-bottom: 1rem;
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .form_label {
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }
  .form_input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  .form_remember {
    display: flex;
    gap: 0.75rem;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  .form_remember input {
    width: 1rem;
    height: 1rem;
  }
  .form_remember label {
    cursor: pointer;
  }
</style>