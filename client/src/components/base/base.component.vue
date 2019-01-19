<template>
    <v-app dark>
        <v-navigation-drawer persistent
                             v-model="drawer"
                             enable-resize-watcher
                             fixed
                             app>
            <v-list>
                <v-list-tile value="true"
                             v-for="(item, i) in items"
                             :key="i">
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>favorite</v-icon>
            </v-btn>
            <v-menu offset-y
                    v-if="!user">
                <v-btn icon
                       slot="activator"
                       @click="logIn">
                    <v-icon
                            :size="avatarSize">
                        account_circle
                    </v-icon>
                </v-btn>
            </v-menu>
            <v-menu offset-y
                    v-if="user">
                <v-btn icon
                       slot="activator">
                    <v-icon v-if="!user.profile || !user.profile.picture"
                            color="success"
                            :size="avatarSize">
                        account_circle
                    </v-icon>
                    <v-avatar v-if="user.profile && user.profile.picture"
                              :tile="avatarTile"
                              :size="avatarSize"
                              color="grey lighten-4">
                        <img v-bind:src="user.profile.picture" alt="avatar">
                    </v-avatar>
                </v-btn>
                <v-list>
                    <v-list-tile @click="logOut">
                        <v-list-tile-title>Log Out</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

        </v-toolbar>
        <v-content>
            <router-view/>
            <!--<MainComponent msg="Welcome to Your Vue.js + TypeScript App"/>-->
        </v-content>
        <v-footer app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script lang="ts" src="./base.component.ts">
</script>

<style lang="scss" src="./base.component.scss">
</style>
