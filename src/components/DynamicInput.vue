<template>
  <div class="dynamic-input-container">
    <div class="dynamic-input-container__button">
      <div class="dynamic-input-content" v-for="(contato, index) in contatos" :key="index">
        <div v-if="!contato.isEditing">
          <p>{{contato.contatoTipo.toLowerCase()}}</p>
          <p>{{contato.value}}</p>
          <p>Descrição: {{contato.descricao}}</p>
          <button
            type="button"
            class="dynamic-input-button"
            @click="editarContato(contato)"
          >
            Editar
          </button>
          <hr class="dynamic-input-row"/>
        </div>
        <div v-else>
          <div class="dynamic-input-content__select">
            <select name="" v-model="contato.contatoTipo" class="form_label">
              <option value="0" class="form_label">Escolha o tipo de contato</option>
              <option value="CELULAR" class="form_label">Celular</option>
              <option value="EMAIL" class="form_label">Email</option>
              <option value="TELEFONE" class="form_label">Telefone</option>
            </select>
          </div>
          <div class="dynamic-input-content__input">
            <Input v-if="contato.contatoTipo != 0" v-model="contato.value" :dataMaska="contatoMasks[contato.contatoTipo]" />
          </div>
          <Input v-if="contato.contatoTipo != 0" v-model="contato.descricao" label="Descrição" placeholder="Ex: Casa, Principal, WhatsApp..."/>
          <hr class="dynamic-input-row"/>
        </div>
        
        <div class="icons">
          <!-- <ph-heart v-if="contato.id" :size="24" color="#6da1d2" /> -->
          <ph-heart :size="24" color="#6da1d2" @click="toggleFavorito(contato)"/>
          <ph-trash :size="24" color="#6da1d2" @click="removerContato(contato,index)" />
        </div>
      </div>
      
      <button
        type="button"
        class="dynamic-input-button"
        @click="adicionarContato()"
      >
        Adicionar Mais
      </button>
    </div>
    <div class="modal-container-btn">
      <Button 
        title="Salvar"
        @click="cadastrarContato()"
      />
    </div>
  </div>
</template>

<script>
import api from '../services/api'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import { PhX, PhHeart, PhTrash } from "phosphor-vue"
import { Notify } from 'quasar'

export default {
  components: { Input, PhX, PhHeart, PhTrash, Button },
  data() {
    return {
      contatos: [
        {
          isEditing: true,
          contatoTipo: 0,
          value: '',
          descricao: '',
          privado: false,
          favorito: false,
        },
      ],
      contatoMasks: {
        'CELULAR': '(##)#####-####',
        'EMAIL': '',
        'TELEFONE': '(##)####-####'
      }
    };
  },
  props: {
    pessoaContato:{
      type: Object,
      default() {
        return null
      }
    }
  },
  mounted() {
    if (this.pessoaContato.contatos.length){
      this.contatos = this.pessoaContato.contatos.map(contato => {

        let value = ""
        if (contato.tipoContato === "EMAIL") {
          value = contato.email
        } else {
          value = contato.telefone
        }

        return {
          id: contato.id,
          descricao: contato.tag,
          contatoTipo: contato.tipoContato,
          privado: contato.privado,
          favorito: false,
          value: value,
          isEditing: false
        }
      })
    }
  },
  methods: {
    adicionarContato() {
      this.contatos.push({
        isEditing: true,
        contatoTipo: 0,
        value: '',
        descricao: '',
      });
    },
    async removerContato(contato,index) {
      if (contato.id) {
        try {
          api.delete(`/contato/remover/${contato.id}`)
          Notify.create({
            message: 'Contato excluído com sucesso!',
            color: 'positive',
            position: 'top-right',
            type: 'positive',
            actions: [{ icon: 'close', color: 'white' }]
          })
        } catch (error) {
          Notify.create({
            message: 'Algo deu errado!',
            color: 'negative',
            position: 'top-right',
            type: 'negative',
            actions: [{ icon: 'close', color: 'white' }]
          })
          console.error(error)
        } 
      }
      this.contatos.splice(index, 1)
    },
    async cadastrarContato() {
      for(let contato of this.contatos) {

        if(!contato.isEditing) {
          continue
        }

        let email = null
        let telefone = null

        if (contato.contatoTipo === "EMAIL") {
          email = contato.value
        } else {
          telefone = contato.value 
        }

        let usuario = localStorage.getItem("user")
        usuario = JSON.parse(usuario)

        let contatoRequest = {
          tag: contato.descricao,
          privado: contato.privado,
          favorito: contato.favorito,
          email: email,
          telefone: telefone,
          tipoContato: contato.contatoTipo,
          pessoa: {
            id: this.pessoaContato.id
          },
          usuario: {
            id: usuario.id
          }
        }

        if(contato.id) {
          contatoRequest.id = contato.id
        }

        try {
          let response = await api.post('/contato/salvar', contatoRequest)
          Notify.create({
            message: 'Contato criado com sucesso!',
            color: 'positive',
            position: 'top-right',
            type: 'positive',
            actions: [{ icon: 'close', color: 'white' }]
          })
        } catch (error) {
          Notify.create({
            message: 'Algo deu errado!',
            color: 'negative',
            position: 'top-right',
            type: 'negative',
            actions: [{ icon: 'close', color: 'white' }]
          })
          console.error(error)
        }
      } 
      this.$emit('createContact')
    },
    editarContato(contato) {
      contato.isEditing = true
    },
    async toggleFavorito(contato) {
      let usuario = localStorage.getItem("user")
      usuario = JSON.parse(usuario)
      console.log(contato)
      
      if(!contato.favorito){
        try {
          let response = await api.post('/favorito/salvar', {
            id: contato.id,
            pessoa: {
              id: this.pessoaContato.id
            },
            usuario: {
              id: usuario.id
            }
          })
          contato.favorito = true
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          await api.delete(`/favorito/remover/${contato.id}`)
          contato.favorito = false
        } catch (error) {
          console.error(error)
        }  
      }
    }
  } 
}
</script>

<style scoped>
  .dynamic-input-container__button {
    padding: 0.625rem 0rem;
  }
  .dynamic-input-button {
    display: flex;
    justify-content: flex-start;
  }
  .dynamic-input-content {
    position: relative;
  }
  .dynamic-input-content + .dynamic-input-content {
    margin-top: 0.75rem;
  }
  .dynamic-input-row {
    margin: 0.75rem 0;
  }
  .form_label {
    margin: 0.5rem 0rem;
    font-size: 1rem;
    display: flex;
  }
  .dynamic-input-content__select {
    display: flex;
    justify-content: space-between;
  }
  .dynamic-input-content__select svg{
    cursor: pointer;
  }
  .dynamic-input-content__input {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .dynamic-input-content__input svg {
    cursor: pointer;
  }
  .dynamic-input-button {
    background: transparent;
    border: 2px solid var(--blue-500);
    padding: 0.5rem;
    border-radius: 0.75rem;
    margin-top: 1rem;
    cursor: pointer;
  }
  .dynamic-input-button:hover {
    border: 2px solid var(--blue-300);
  }
  .icons {
    position: absolute;
    left: 16.875rem;
    top: 0.5rem;
    display: flex;
    gap: 0.25rem;
    cursor: pointer;
  }
</style>