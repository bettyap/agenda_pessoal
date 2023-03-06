<template>
  <header class="header-container">
    <div class="header-content">
      <p>{{ nome }}</p>
    </div>
  </header>
</template>

<script>
  import { PhUser } from "phosphor-vue";
export default {
  components: {
    PhUser
  },
  data () {
    return {
      nome: ''
    }
  },
  created () {
    let userInfo = localStorage.getItem("user")
    userInfo = JSON.parse(userInfo)
    this.nome = userInfo.nome
  }
}
</script>

<style>
  .header-container {
    display: flex;
    height: 5.375rem;
    padding: 1.7rem 6rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: var(--blue-500);
  }
  .header-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--white);
  }

  @media (max-width: 500px){
    .header-container {
      padding: 1rem 2rem;
    }
  }
</style>
