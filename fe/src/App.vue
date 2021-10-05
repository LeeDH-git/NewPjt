<template>
    <v-list-tile 
      value="true" 
      v-for="(item, i) in items" 
      :key="i" 
      :to="item.to"
    >

    </template>

    <script>
        export default {
            name: 'App',
            data() {
                return {
                    clipped: false,
                    drawer: true,
                    fixed: false,
                    items: [
                        {
                            icon: 'home',
                            title: '홈',
                            to: {
                                path: '/'
                            }
                        }, {
                            icon: 'face',
                            title: '사용자관리',
                            to: {
                                path: '/user'
                            }
                        }
                    ],
                    miniVariant: false,
                    right: true,
                    rightDrawer: false,
                    title: 'Vuetify.js'
                }
            }
        }
    </script>