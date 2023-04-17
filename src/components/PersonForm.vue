<template>
  <form class="form" @submit="onSubmit">
    <label>Adicionar foto</label>
    <input type="file" ref="fileInput" />
    <Input 
      label="Nome Completo *" 
      name="nome" 
      v-model.trim="nome" 
      :errors="v$.nome.$errors"
    />
    <Input 
      label="CPF *" 
      vMaska 
      dataMaska="###.###.###-##" 
      v-model="cpf" 
      :errors="v$.cpf.$errors"
    />
    <Input 
      label="Data de Nascimento"
      type="date"
      max="9999-12-31"
    />
    <Input 
      label="País *" 
      v-model.trim="endereco.pais"
      :errors="v$.endereco.pais.$errors"
    />
    <Input 
      label="CEP *" 
      dataMaska="#####-###" 
      v-model.trim="endereco.cep"
      :errors="v$.endereco.cep.$errors"
    />
    <Input 
      label="Cidade *" 
      v-model.trim="endereco.cidade"
      :errors="v$.endereco.cidade.$errors"
    />
    <Input 
      label="Estado *" 
      v-model="endereco.estado" 
      v-model.trim="endereco.estado" 
      :errors="v$.endereco.estado.$errors"
    />
    <Input 
      label="Endereço *" 
      v-model.trim="endereco.logradouro" 
      :errors="v$.endereco.logradouro.$errors"
    />
    <Input 
      label="Número *" 
      v-model.trim="endereco.numero" 
      :errors="v$.endereco.numero.$errors"
    />
    <Input 
      label="Bairro *" 
      v-model.trim="endereco.bairro" 
      :errors="v$.endereco.bairro.$errors"
    />

    <!-- <DynamicInput 
      msg="Cadastrar contato"
    /> -->

    <Button
      title="Salvar"
    />
  </form>
</template>

<script>
import api from '../services/api'
import Button from './Button.vue'
import DynamicInput from './DynamicInput.vue'
import Input from './Input.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      id: "",
      nome: "",
      cpf: "",
      endereco: {
        id: "",
        bairro: "",
        cep: "",
        cidade: "",
        estado: "",
        logradouro: "",
        numero: "",
        pais: ""
      }
    }
  },
  props: {
    person: {
      type: Object,
      default() {
        return null
      }
    }
  },
  validations () {
    return {
      nome: {required: helpers.withMessage('Este campo é obrigatório', required)},
      cpf: {required: helpers.withMessage('Este campo é obrigatório', required)},
      endereco: {
        bairro: {required: helpers.withMessage('Este campo é obrigatório', required)},
        cep: {required: helpers.withMessage('Este campo é obrigatório', required)},
        cidade: {required: helpers.withMessage('Este campo é obrigatório', required)},
        estado: {required: helpers.withMessage('Este campo é obrigatório', required)},
        logradouro: {required: helpers.withMessage('Este campo é obrigatório', required)},
        numero: {required: helpers.withMessage('Este campo é obrigatório', required)},
        pais: {required: helpers.withMessage('Este campo é obrigatório', required)},
      }
    }
  },
  components: { Input, DynamicInput, Button },
  mounted() {
    if( this.person !== null ) {
      this.id = this.person.id
      this.nome = this.person.nome
      this.cpf = this.person.cpf
      this.endereco.id = this.person.endereco.id
      this.endereco.cep = this.person.endereco.cep
      this.endereco.bairro = this.person.endereco.bairro
      this.endereco.cidade = this.person.endereco.cidade
      this.endereco.estado = this.person.endereco.estado
      this.endereco.logradouro = this.person.endereco.logradouro
      this.endereco.numero = this.person.endereco.numero
      this.endereco.pais = this.person.endereco.pais
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()

      this.v$.$touch(); 
      if(this.v$.$invalid !== false) {
        return 
      }

      let pessoa = await this.criarCadastroPessoa()
      let upload = await this.onUpload(pessoa.data.object.id)

      this.$emit('completed')
    },
    async criarCadastroPessoa() {
      let response = null

      try {
        response = await api.post('/pessoa/salvar', {
          id: this.id,
          nome: this.nome,
          cpf: this.cpf,
          endereco: {
            id: this.endereco.id,
            bairro: this.endereco.bairro,
            cep:  this.endereco.cep,
            cidade: this.endereco.cidade,
            estado: this.endereco.estado,
            logradouro: this.endereco.logradouro,
            numero: this.endereco.numero,
            pais: this.endereco.pais
          }
        })
      } catch (error) {
        console.log(error)
      }
      return response 
    },

    async onUpload(id) {
      const formData = new FormData();
      console.log(this.$refs.fileInput)
      formData.append('foto', this.$refs.fileInput.files[0]);

      let response = null

      try {
        response = await api.post(`/foto/upload/${id}`, formData);
        console.log('File uploaded:', response);
      } catch (error) {
        console.error(error);
      }
      return response
    }
  }
}
</script>

<style scoped>
  .form {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }
</style>