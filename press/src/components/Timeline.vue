<template>
  <v-timeline dense>
    <v-timeline-item v-for="(i, idx) in boardResult" :key="idx" color="grey darken-3" small>
        <template v-slot:icon>
          <v-icon dark>mdi-arrow-right-drop-circle-outline</v-icon>
        </template>

      <div class="py-4">
        <v-card color="black">
            <p style="color:white;" class="listTinyText">{{i.regTime.slice(0,16).replace('T','｜')}}</p>
        </v-card>
        <v-card @click="goToView(i.seq)">
          <p style="color:black;" class="listTinyText">{{i.title}}</p>
        </v-card>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            boardResult:[],
        }
    },
    created(){
        this.takeBoard();
    },
    methods:{
        takeBoard(){
        axios.post('http://alldayfootball.co.kr/api/board/takeboard',{
            bNum: null,
            limit: 5,
            page: 1,
            word:""
            })
            .then((res=>{
                this.boardResult = res.data.docs;
            }))
        },
        goToView(num){
            location.href=`/articleView?num=${num}`;
        },
    },

}
</script>


<style scoped>
@import url("../assets/css/unify.css");

</style>