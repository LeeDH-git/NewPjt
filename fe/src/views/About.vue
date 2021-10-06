<template>
    <v-container>
        <v-layout>
            <v-textarea>
                outline
                v-model="ta"
            </v-textarea>
        </v-layout>
    </v-container>
</template>
<script>
   export default {
       name: 'about',
       data () {
           return {
             ta: 'debug'
           }
    },
    mounted () {
        const a = {a:1,b:2}
        this.a = JSON.stringify(a)
        console.log('page start')
    }
 }
</script>
