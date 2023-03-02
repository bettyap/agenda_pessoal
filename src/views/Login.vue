<template>
  <div class="container">
    <div class="content">
      <h1 class="title">Agenda Pessoal</h1>
      <form class="form">
        <label class="form_label">Email:</label>
        <input class="form_input" v-model="message" placeholder="jhonny@example.com" />
        <label class="form_label">Senha:</label>
        <input class="form_input" type="password" v-model="password" placeholder="*****" />
        <div class="form_remember">
          <input type="checkbox" name="teste" id="teste">
          <label for="teste">Lembrar de mim</label>
        </div>
        <button class="form_button">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {

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
    background: #6da1d2;
  }
  .content {
    background: #98bfdc;
    padding: 2rem;
    width: 25.25rem;;
    background: white;
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
  }
  .form_remember input {
    width: 1rem;
    height: 1rem;
  }
  .form_remember label {
    cursor: pointer;
  }
  .form_button {
    background: lightblue;
    border: 0;
    padding: 1rem;
    cursor: pointer;
    margin-top: 1rem;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid #6da1d2;
  }
  .form_button:hover {
    background: #6da1d2;
  }
  
</style>