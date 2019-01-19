<template>
    <v-app dark>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark>
                                <v-toolbar-title>Log in</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-tooltip bottom>
                                    <v-btn slot="activator"
                                           icon
                                           large
                                           target="_blank">
                                        <v-icon large>help</v-icon>
                                    </v-btn>
                                    <span>help</span>
                                </v-tooltip>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field id="email"
                                                  prepend-icon="person"
                                                  v-model="email"
                                                  :rules="emailRules"
                                                  name="email"
                                                  label="Email"
                                                  type="text"
                                                  required></v-text-field>
                                    <v-text-field id="password"
                                                  prepend-icon="lock"
                                                  v-model="password"
                                                  :rules="passwordRules"
                                                  name="password"
                                                  label="Password"
                                                  type="password"
                                                  required></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="success" @click='signUp'>Sign up</v-btn>
                                <v-btn @click='logInLocal'>Log in</v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-btn color="error" @click="logInGoogle">Log in with Google</v-btn>

                        <v-snackbar v-for="(error, index) in errors"
                                    :key="index"
                                    v-model="errors[index]"
                                    :top="'top'"
                                    color="error">
                            {{ error.msg }}
                        </v-snackbar>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts" src="./log-in.component.ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./log-in.component.scss">
</style>
