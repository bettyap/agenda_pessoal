<template>
  <div class="container">
    <Header/>
    <div class="content">
      <Sidebar />
      <main class="main">
        <div class="main_form">
          <h2>Minhas Informações</h2>

          <q-form class="q-gutter-md" style="max-width: 25rem; margin-top: 1rem" @submit="atualizarCadastro">
            <q-input 
              outlined 
              v-model="nome" 
              label="Nome Completo" 
              :rules="[val => !!val || 'Nome é obrigatório']"
            />
            <!-- <label class="form_label">Nome Completo:</label> -->
            <!-- <input class="form_input" v-model="nome" placeholder="Maria da Silva" /> -->

            <q-input 
              outlined 
              v-model="cpf" 
              label="CPF"
              mask="###.###.###-##"
              :rules="[val => !!val || 'CPF é obrigatório']"
            />
            <!-- <label class="form_label">CPF:</label> -->
            <!-- <input class="form_input" v-maska data-maska="###.###.###-##" v-model="cpf"  placeholder="000.000.000-00" /> -->
            
            <q-input 
              outlined 
              v-model="dataNascimento" 
              label="Data nascimento" 
              type="date"
              mask="##/##/####"
              :rules="[val => !!val || 'Data de Nascimento é obrigatório']"
            />
            <!-- <label class="form_label">Data nascimento:</label> -->
            <!-- <input class="form_input" v-maska data-maska="##/##/####" placeholder="05/11/1998" /> -->
            
            <q-input 
              outlined 
              v-model="email" 
              label="Email"
              type="email"
              :rules="[val => !!val || 'Email é obrigatório']"
            />
            <!-- <label class="form_label">Email:</label> -->
            <!-- <input class="form_input" v-model="email" placeholder="jhonny@example.com" /> -->
            
            <q-input 
              outlined 
              v-model="telefone" 
              label="Telefone"
              mask="(##) #####-####"
              :rules="[val => !!val || 'Telefone é obrigatório']"
            />
            <!-- <label class="form_label">Telefone:</label> -->
            <!-- <input class="form_input" v-maska data-maska="(##) #####-####" v-model="telefone" placeholder="(11) 9 7370-5483" /> -->
            
            <q-input 
              outlined 
              v-model="username" 
              label="Username"
              :rules="[val => !!val || 'Username é obrigatório']"
            />
            <!-- <label class="form_label">Username:</label> -->
            <!-- <input class="form_input" v-model="username" placeholder="admin" /> -->

            <q-btn class="teste" type="submit" label="Salvar" />
          
          </q-form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Button from '../components/Button.vue'
import api from '../services/api'
// import { toast } from 'vue3-toastify';
// import dayjs from 'dayjs'
import { Notify } from 'quasar'

export default {
  components: { Header, Sidebar, Button },
  data() {
    return {
      nome: "",
      cpf: "",
      dataNascimento: "",
      telefone: "",
      email: "",
      username: ""
    }
  },
  mounted() {
    let userInfo = localStorage.getItem("user")
    userInfo = JSON.parse(userInfo)
    this.cpf = userInfo.cpf
    this.dataNascimento = userInfo.dataNascimento
    this.nome = userInfo.nome
    this.telefone = userInfo.telefone
    this.email = userInfo.email
    this.username = userInfo.username
    this.password = userInfo.password
    this.id =  userInfo.id
    
  },
  methods: {
    atualizarCadastro(event){
      event.preventDefault()

      // let dataNascimento = dayjs(this.dataNascimento, "DD/MM/YYYY")
      //   .format("YYYY-MM-DD")

      api.put('/usuario/atualizar',{
        cpf: this.cpf,
        dataNascimento: this.dataNascimento,
        email: this.email,
        id: this.id,
        nome: this.nome,
        password: this.password,
        telefone: this.telefone,
        username: this.username
      }).then( response => {
        if (response.status == 200) {
          Notify.create({
            message: 'Atualizado com sucesso!',
            color: 'positive',
            position: 'top-right',
            type: 'positive',
            actions: [{ icon: 'close', color: 'white' }]
          })
          // toast.success("Atualizado com sucesso!", {
          //   position: toast.POSITION.TOP_RIGHT,
          // });

          localStorage.setItem("user", JSON.stringify(response.data.object))
        }
      }).catch((_error) => {
          Notify.create({
            message: 'Algo deu errado!',
            color: 'negative',
            position: 'top-right',
            type: 'negative',
            actions: [{ icon: 'close', color: 'white' }]
          })
        // toast.error("Algo deu errado!", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      })
      
    }
  }
}
</script>

<style scoped>
  .teste{
    background: #98bfdc; 
    color: white;
  }
  .container {
    display: flex;
    flex-direction: column;
    background: var(--white-200);
  }
  .content {
    width: 100%;
    display: flex;
  }
  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 3rem;
  }
  .main_form{
    background: var(--white);
    padding: 2rem;
  }
  .form {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
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
  @media(max-width: 880px){
    .content {
      flex-direction: column;
      min-height: 100vh;
    }
    .main{
      padding: 2rem;
    }
  }
</style>