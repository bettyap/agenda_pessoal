<template>
  <div class="dynamic-input-container">
    <div class="dynamic-input-container__button">
      <div class="dynamic-input-content" v-for="(contato, index) in contatos" :key="index">
        <div v-if="!contato.isEditing">
          <p>{{contato.contatoTipo.toLowerCase()}}</p>
          <p>{{contato.value}}</p>
          <p>Descrição: {{contato.descricao}}</p>
          <q-btn
            outline
            type="button"
            class="dynamic-input-button"
            @click="editarContato(contato)"
          >
            Editar
          </q-btn>
          <hr class="dynamic-input-row"/>
        </div>
        <div v-else>
          <div class="dynamic-input-content__select">
            <q-select :options="opcoes" v-model="contato.contatoTipo" class="form_label" style="z-index:2" />
          </div>
          <div class="dynamic-input-content__input">
            <!-- <Input v-if="contato.contatoTipo != 0" v-model="contato.value" :dataMaska="contatoMasks[contato.contatoTipo]" /> -->
            <q-input 
              v-if="contato.contatoTipo != 'Escolha o tipo de contato'" 
              v-model="contato.value"
              :mask="contatoMasks[contato.contatoTipo]"
              outlined 
            />
          </div>
          <!-- <Input v-if="contato.contatoTipo != 0" v-model="contato.descricao" label="Descrição" placeholder="Ex: Casa, Principal, WhatsApp..."/> -->
          <q-input
            v-if="contato.contatoTipo != 'Escolha o tipo de contato'"
            outlined 
            v-model="contato.descricao" 
            label="Descrição"
            placeholder="Ex: Casa, Principal, WhatsApp..."
          />
          <hr class="dynamic-input-row"/>
        </div>
        
        <div class="icons">
          <!-- <ph-heart v-if="contato.id" :size="24" color="#6da1d2" /> -->
          <q-icon name="favorite_border" size="1.5rem" @click="toggleFavorito(contato)"/>
          <q-icon name="delete_outline" size="1.5rem" @click="removerContato(contato,index)" />
        </div>
      </div>
      
      <q-btn
        outline
        type="button"
        class="dynamic-input-button"
        @click="adicionarContato()"
      >
        Adicionar Mais
      </q-btn>
    </div>
    <div class="modal-container-btn">
      <q-btn 
        label="Salvar"
        style="width:100%;background: #6da1d2; color: white"
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
      },
      opcoes: [
        'Escolha o tipo de contato', 'CELULAR', 'EMAIL', 'TELEFONE'
      ]
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
        contatoTipo: 'Escolha o tipo de contato',
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
    color: #6da1d2;
    border-radius: 0.75rem;
  }
  .icons {
    position: absolute;
    left: 16.875rem;
    top: 0.5rem;
    display: flex;
    gap: 0.25rem;
    cursor: pointer;
    color: #6da1d2;
  }
</style>