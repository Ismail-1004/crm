<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">

    <li v-for="link in links" :key="link.url" > 
      <router-link :to="link.url" class="waves-effect waves-orange pointer" active-class="active" :exact="link.exact">{{ link.title }}</router-link>
    </li>

    <!-- <li class="active" > 
      <router-link class="waves-effect waves-orange pointer" :to="link.url" >{{ link.title }}</router-link>
    </li> -->
    
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        links: [
            {title: 'Счет', url: '/', exact: true},
            {title: 'История', url: '/history'},
            {title: 'Планирование', url: '/planing'},
            {title: 'Новая запись', url: '/record'},
            {title: 'Категории', url: '/categories'}
        ]
    }),
    computed: {
        ...mapGetters(['isOpen'])
    }
}
</script>
