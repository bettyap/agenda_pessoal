<template>
  <li class="sidebar-menu-item" :title="opened ? '' : title">
    <template v-if="isButton">
      <button @click="$emit('click')" class="sidebar-item-link">
        <component :is="icon" :size="32" color="white"></component>
        <span v-if="opened">{{title}}</span>
      </button>
    </template>
    <template v-else>
      <router-link :to="to" class="sidebar-item-link">
        <component :is="icon" :size="32" color="white"></component>
        <span v-if="opened">{{title}}</span>
      </router-link>
    </template>

  </li>
</template>

<script>
import { PhHouse, PhUser, PhUsers, PhUsersThree, PhGlobeSimple, PhSignOut   } from "phosphor-vue";

export default {
  components: {
    PhHouse,
    PhUser,
    PhUsers,
    PhUsersThree,
    PhGlobeSimple,
    PhSignOut
  },
  props: {
    opened: Boolean, 
    icon: String,
    title: String,
    to: String,
    isButton: Boolean,
  }
}
</script>

<style>
  .sidebar-item-link{
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
  }
  .sidebar-menu-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-style: normal;
    font-weight: 700;
  }
  .sidebar-menu-item .sidebar-item-link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 16.25rem;
    padding: 12px 24px;
    font-size: 16px;
    line-height: 21px;
    color: var(--white);
    transition: background-color .3s ease-out, box-shadow .3s ease-out;
    text-decoration: none;
    gap: 2rem;
    border: none;
    background: transparent;
    font-weight: bold;
  }
  .sidebar-menu-item:hover {
    background: var(--blue-300);
    box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.25);
  }

</style>