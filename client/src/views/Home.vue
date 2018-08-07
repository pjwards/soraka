<template>
    <v-app>
        <v-navigation-drawer
                persistent
                :mini-variant="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                enable-resize-watcher
                fixed
                app
        >
            <v-list>
                <v-list-tile
                        value="true"
                        v-for="(item, i) in items"
                        :key="i"
                >
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                app
                :clipped-left="clipped"
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-btn icon @click.stop="clipped = !clipped">
                <v-icon>web</v-icon>
            </v-btn>
            <v-btn icon @click.stop="fixed = !fixed">
                <v-icon>remove</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon
                        v-if="!user || !user.picture"
                        :size="avatarSize">
                    account_circle
                </v-icon>
                <v-avatar
                        v-if="user && user.picture"
                        :tile="avatarTile"
                        :size="avatarSize"
                        color="grey lighten-4"
                >
                    <img v-bind:src="user.picture.url" alt="avatar">
                </v-avatar>
            </v-btn>

        </v-toolbar>
        <v-content>
            <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
  } from 'vue-property-decorator';
  import HelloWorld from '@/components/HelloWorld.vue';
  import { User } from '@/models/user';

  @Component({
    components: {
      HelloWorld,
    },
  })
  export default class Home extends Vue {
    private clipped: boolean = false;
    private drawer: boolean = false;
    private fixed: boolean = false;
    private items: any = [{
      icon: 'bubble_chart',
      title: 'Inspire',
    }];
    private miniVariant: boolean = false;
    private right: boolean = false;
    private rightDrawer: boolean = false;
    private title: string = 'Vuetify.js';
    private avatarTile: boolean = false;
    private avatarSize: number = 36;

    private get user(): User {
      return this.$store.state.user;
    }
  }
</script>

<style lang="scss">
</style>
