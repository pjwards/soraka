<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>Test Functions</h2>
        <ul>
            <li @click='getLoginStatus'>
                Login Status
            </li>
            <li @click='login'>
                Login
            </li>
            <li @click='logout'>
                Logout
            </li>
            <li @click='signUp'>
                Sign Up
            </li>
        </ul>

        <ul>
            <li @click='getUser'>
                Get User
            </li>
        </ul>
    </div>
</template>

<script lang="ts" src="./main.component.ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./main.component.scss">
</style>
