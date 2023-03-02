<template>
  <li class="sidebar-menu-item">
    <router-link :to="to" class="sidebar-item-link">
      <component :is="icon" :size="32" color="white"></component>
      <span v-if="opened">{{title}}</span>
    </router-link>
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
    to: String
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
    color: white;
    transition: background-color .3s ease-out, box-shadow .3s ease-out;
    text-decoration: none;
    gap: 2rem;
  }
  .sidebar-menu-item:hover {
    background: #98bfdc;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.25);
  }

</style>