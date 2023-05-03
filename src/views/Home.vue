<template >
  <div class="container">
    <Header />
    <main class="main">
      <Sidebar />
      <section class="content">
        <Search @change="onSearchInput" />
        <div class="container-table">
          <div v-for="pessoa in listaPessoas" :key="pessoa.id" class="card" >
            <template v-if="pessoa.foto">
              <img class="avatar" :src="pessoa.foto" alt="">
            </template>
            <template v-else>
              <img class="avatar" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="">
            </template>
            
            <div class="card-info">
              <span>{{pessoa.nome}}</span>
              <span>{{pessoa.cpf}}</span>
              <div class="info-row">
                <span>{{pessoa.endereco.cep}}</span>
                <span>{{pessoa.endereco.cidade}}</span> 
                <span>{{pessoa.endereco.estado}}</span>
              </div>
              <div class="icons" @click="showContactModal(pessoa)">
                <ph-plus :size="24" weight="bold" />
                <span>Contato</span>
              </div>
            </div>
            <div class="icons">
              <ph-pencil :size="24" @click="mostrarPerson(pessoa)" />
              <ph-trash :size="24" id="show-modal-confirmation"  @click="showConfirmationModal(pessoa)"/>
            </div>
            
          </div>
        </div>
        <div class="container-add">
          <Button 
            title="Adicionar"
            class="button-add"
            id="show-modal" 
            @click="mostrarPerson(null)" 
          />
        </div>

        <Teleport to="body">
          <Modal :show="showModal" @close="showModal = false">
            <template #header>
              <h3>Cadastrar Pessoa</h3>
            </template>
            <template #body>
              <PersonForm :person="currentPerson" @completed="onCompleted">

              </PersonForm>
            </template>

          </Modal>

          <Modal :show="showModalConfirmation" @close="showModalConfirmation = false">
            <template #header>
              <h3>Confirmar</h3>
            </template>
            <template #body>
              <p>Você tem certeza que deseja excluir?</p>
            </template>
            <template #footer>
              <div class="modal-container-btn">
                <Button 
                  title="Não"
                  @click="showModalConfirmation = false"
                />
                <Button
                  title="Sim"
                  @click="onDelete(personDelete)"
                />
              </div>
            </template>
          </Modal>

          <Modal :show="showModalContact" @close="showModalContact = false">
            <template #header>
              <h3>Gerenciar contatos</h3>
            </template>
            <template #body>
              <DynamicInput :pessoaContato="pessoaContatoEditar" @createContact="onCreateContact"></DynamicInput>
            </template>
          </Modal>

        </Teleport>

      </section>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Search from '../components/Search.vue'
import { PhHeart, PhPencil, PhPlus, PhTrash } from "phosphor-vue"
import api from '../services/api.js'
import Modal from '../components/Modal.vue'
import Button from '../components/Button.vue'
import Input from '../components/Input.vue'
import PersonForm from '../components/PersonForm.vue'
import DynamicInput from '../components/DynamicInput.vue'

export default {
  data() {
    return {
      busca: '',
      listaPessoas: [],
      showModal: false,
      showModalConfirmation: false,
      showModalContact: false,
      currentPerson: null,
      personDelete: null,
      pessoaContatoEditar: null
    }
  },
  props: {
    label: String,
    type: String,
    dataMaska: String,
    vModel: String
  },
  components: { 
    Sidebar, 
    Header, 
    Search, 
    PhHeart, 
    PhPencil, 
    PhPlus,
    PhTrash, 
    Modal, 
    Button, 
    Input, 
    PersonForm,
    DynamicInput
  },
  mounted () {
    this.infoUser()
  },
  methods: {
    onSearchInput (value) {
      this.busca = value
      this.infoUser()
    },
    async infoUser() {
      try {
        let response = await api.post('/pessoa/pesquisar',{
          nome: this.busca
        })
        this.listaPessoas = response.data
        for(let pessoa of this.listaPessoas) {
          let fotoResponse = await api.get(`/foto/download/${pessoa.id}`, {
            responseType: 'blob'
          })
          pessoa.foto = URL.createObjectURL(fotoResponse.data)
          
        }
      }catch(error) {
        console.error(error);
      }
    },
    mostrarPerson(pessoa) {
      this.showModal = true
      this.currentPerson = pessoa
    },
    onCompleted() {
      this.showModal = false
      this.infoUser()
    },
    showConfirmationModal(pessoa) {
      this.showModalConfirmation = true
      this.personDelete = pessoa
    },
    async onDelete(pessoa) {
      try {
        api.delete(`/pessoa/remover/${pessoa.id}`)
        .then((response) => {
          this.infoUser()
        })
      } catch(error) {
        console.error(error)
      } finally {
        this.showModalConfirmation = false
      }
    },
    async showContactModal(pessoa) {
      let contatoResponse = await api.get(`/contato/listar/${pessoa.id}`)
      pessoa.contatos = contatoResponse.data

      this.showModalContact = true
      this.pessoaContatoEditar = pessoa
    },
    onCreateContact() {
      this.showModalContact = false
      this.infoUser()
    },
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    background: var(--white-200);
  }
  .main {
    width: 100%;
    display: flex;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    height: calc(100vh - 86px);
    overflow: auto;
  }
  .container-table {
    display: grid;
    grid-template-columns: auto auto;
    margin-top: 3rem;
  }
  .card {
    background: var(--white);
    height: 9rem;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 4px;
    display: flex;
    padding: 1rem;
    margin: 0.5rem 0.5rem
  }
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  .avatar{
    width: 6.25rem;
    height: 6rem;
    border-radius: 50%;
  }
  .card-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0.5rem;
    gap: 0.5rem;
  }
  .icons {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 1.25rem;
    cursor: pointer;
    color: var(--blue-500);
  }
  .icons svg {
    transition: transform .1s ease;
  }
  .icons svg:hover {
    color: var(--blue-300);
    transform: translateY(-3px);
  }
  .info-row {
    display: flex;
    gap: 2rem;
  }
  .modal-container-btn {
    display: flex;
    gap: 2rem;
  }
  .form_label {
    margin-bottom: 0.25rem;
    font-size: 1rem;
    display: flex;
  }
  .form_input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  .container-add {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  .button-add {
    width: 20%;
  }
  @media(max-width: 880px){
    .main {
      flex-direction: column;
    }
    .content {
      padding: 0.4rem;
    }
    .container-table {
      grid-template-columns: auto;
      margin-top: 1rem;
    }
    .card {
      padding: 0.5rem;
      margin: 0.5rem 0.5rem;
      height: 9rem;
    }
    .avatar {
      width: 4.25rem;
      height: 4rem;
    }
    .icons {
      gap: 0.4rem
    }
  }
</style>
