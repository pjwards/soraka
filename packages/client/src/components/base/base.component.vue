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
            <v-menu offset-y
                    v-if="!user || !user.picture">
                <v-btn icon
                       slot="activator"
                >
                    <v-icon
                            :size="avatarSize">
                        account_circle
                    </v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile
                            @click="login"
                    >
                        <v-list-tile-title>Sign In</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                            @click="signUp"
                    >
                        <v-list-tile-title>Sign Up</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-menu offset-y
                    v-if="user && user.picture">
                <v-btn icon
                       slot="activator"
                >
                    <v-avatar
                            :tile="avatarTile"
                            :size="avatarSize"
                            color="grey lighten-4"
                    >
                        <img v-bind:src="user.picture.url" alt="avatar">
                    </v-avatar>
                </v-btn>
                <v-list>
                    <v-list-tile
                            @click="logout"
                    >
                        <v-list-tile-title>Sign Out</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

        </v-toolbar>
        <v-content>
            <MainComponent msg="Welcome to Your Vue.js + TypeScript App"/>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script lang="ts" src="./base.component.ts">
</script>

<style lang="scss" src="./base.component.scss">
</style>
