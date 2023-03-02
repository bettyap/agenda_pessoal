<template>
  <aside class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-content-btn">
      <div class="sidebar-content-btn-menu" @click="toggleMenu" >
        <component :is="!isOpen ? 'ph-caret-double-right' : 'ph-caret-double-left' " :size="32" color="white"></component>
      </div>
    </div>

    <ul class="sidebar-menu" :opened="isOpen">
      <SidebarItem 
        :opened="isOpen"
        icon="ph-house"
        title="HOME"
        to="/"
      />
      <SidebarItem
        :opened="isOpen"
        icon="ph-user"
        title="MEU CADASTRO"
        to="/consult"
      />
      <SidebarItem
        :opened="isOpen"
        icon="ph-users" 
        title="USUÁRIOS"
        to="/consult"
      />
      <SidebarItem 
        :opened="isOpen"
        icon="ph-users-three" 
        title="PESSOAS"
        to="/consult"
      />
      <SidebarItem
        :opened="isOpen"
        icon="ph-globe-simple"
        title="CONTATOS"
        to="/consult"
      />
      <SidebarItem
        :opened="isOpen"
        icon="ph-sign-out"
        title="LOGOUT"
        to="/SAIR"
      />
    </ul>
    
    </aside>
</template>

<script>
  import { PhCaretDoubleRight, PhCaretDoubleLeft } from "phosphor-vue";
  import SidebarItem from './SidebarItem.vue'

  export default {
    components: { 
      PhCaretDoubleRight,
      PhCaretDoubleLeft,
      SidebarItem 
    },
    data() {
      return {
        isOpen: false,
      }
    },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    width: 5.57rem;
    height: calc(100vh - 86px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #6da1d2;
    box-shadow: 0px 0px 4px rgb(0 0 0 / 25%);
    overflow: hidden;
  }
  .open {
    width: 20.25rem;
    align-items: flex-start;
  }
  .sidebar-content-btn {
    margin: 1rem;
    padding: 0 10px;
  }
  .sidebar-content-btn-menu {
    border: none;
    background: transparent;
    cursor: pointer;
  }
  .sidebar-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 0px;
    width: 100%;
  }
  .sidebar-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    width: 100%;
  }
  .li {
    display: flex;
    flex-direction: column;
    width: 100%;
    cursor: pointer;
  }

  @media (max-width: 880px) {
    .sidebar {
      height: 4.375rem;
    }
    .open {
      height: calc(100vh - 86px);
    }
    .sidebar-menu {
      justify-content: flex-start;
    }
  }
</style>