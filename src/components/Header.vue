<template>
  <header class="header-container">
    <div class="header-content">
      <p>ELISABETH APARECIDA</p>
      <ph-user :size="40" color="white"/>
    </div>
  </header>
</template>

<script>
  import { PhUser } from "phosphor-vue";
export default {
  components: {
    PhUser
  }
}
</script>

<style>
  .header-container {
    display: flex;
    height: 5.375rem;
    padding: 1.7rem 6rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: #6da1d2;
  }
  .header-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }

  @media (max-width: 500px){
    .header-container {
      padding: 1rem 2rem;
    }
  }
</style>
