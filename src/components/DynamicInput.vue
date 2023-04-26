<template>
  <div class="dynamic-input-container">
    <div class="dynamic-input-container__button">
      <div class="dynamic-input-content" v-for="(contato, index) in contatos" :key="index">
        <div v-if="!contato.isEditing">
          <p>{{contatoNome[contato.contatoTipo]}}</p>
          <p>{{contato.value}}</p>
          <p>{{contato.descricao}}</p>
          <button
            type="button"
            class="dynamic-input-button"
          >
            Editar
          </button>
          <hr class="dynamic-input-row"/>
        </div>
        <div v-else>
          <div class="dynamic-input-content__select">
            <select name="" v-model="contato.contatoTipo" class="form_label">
              <option disabled value="0" class="form_label">Escolha o tipo de contato</option>
              <option value="1" class="form_label">Celular</option>
              <option value="2" class="form_label">Telefone</option>
              <option value="3" class="form_label">Email</option>
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
          <ph-heart :size="24" color="#6da1d2" />
          <ph-trash :size="24" color="#6da1d2" @click="remove(index)" />
        </div>
      </div>
      
      <button
        type="button"
        class="dynamic-input-button"
        @click="adicionarMaisContatos()"
      >
        Adicionar Mais
      </button>
    </div>
  </div>
</template>

<script>
import Input from '../components/Input.vue'
import { PhX, PhHeart, PhTrash } from "phosphor-vue"
export default {
  components: { Input, PhX, PhHeart, PhTrash },
  data() {
    return {
      contatos: [
        {
          isEditing: true,
          contatoTipo: 0,
          value: '',
          descricao: ''
        },
      ],
      contatoNome: {
        0: "Escolha o tipo de contato",
        1: "Celular",
        2: "Telefone",
        3: "Email"
      },
      contatoMasks: {
        1: '(##)#####-####',
        2: '(##)####-####',
        3: ''
      }
    };
  },
  methods: {
    adicionarMaisContatos() {
      this.contatos.push({
        isEditing: true,
        contatoTipo: 0,
        value: '',
        descricao: '',
      });
    },
    remove(index) {
      this.contatos.splice(index, 1);
    },
    
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
  .icon svg {
  }
</style>