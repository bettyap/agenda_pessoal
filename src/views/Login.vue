<template>
  <div class="container">
    <div class="content">
      <h1 class="title">Agenda Pessoal</h1>
      <form class="form" @submit="login">
        <label class="form_label">Email:</label>
        <input class="form_input" v-model="username" placeholder="jhonny@example.com" />
        <label class="form_label">Senha:</label>
        <input class="form_input" type="password" v-model="password" placeholder="*****" />
        <div class="form_remember">
          <input type="checkbox" name="teste" id="teste">
          <label for="teste">Lembrar de mim</label>
        </div>
        <Button 
          title="Entrar"
          type="submit"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import Button from '../components/Button.vue'
import api from '../services/api.js'
export default {
  components: { Button },
  data() {
    return {
      username: this.username,
      password: this.password,
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
        toast.error("Algo deu errado!", {
          position: toast.POSITION.TOP_RIGHT,
        });
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