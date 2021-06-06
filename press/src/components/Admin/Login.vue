<template>
<div class="Login">
    <v-row v-if="!logged" class="mt-10 d-flex justify-center">
        <v-col cols="6">
            <v-text-field color="black" v-model="id" hide-details solo label="아이디"></v-text-field>
        </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
        <v-col v-if="!logged" cols="6">
            <v-text-field  type="password" v-model="password" hide-details solo label="비밀번호"></v-text-field>
        </v-col>
    </v-row>

    <v-row class="d-flex justify-center">
        <v-col class="d-flex justify-center" v-if="!logged" align-self="center" cols="6">
            <v-btn  @click="clickLogin">로그인</v-btn>
        </v-col>
        <v-col class="d-flex justify-center" v-if="logged" align-self="center" cols="6">
            <v-btn  @click="clickLogout">로그아웃</v-btn>
        </v-col>
    </v-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            id:'',
            password:'',
            logged:false,
        }
    },
    mounted(){
        axios.get('api/auth/check')
        .then((res)=>{
        if(res.data.success===true) this.logged=true;
        else this.logged=false;
        })
    },
    methods:{
        clickLogin(){
        axios.post('api/auth/login',{
            id:this.id,
            password:this.password
        })
        .then((res)=>{
            if(res.data==='already_logged_in'){
                alert('이미 로그인 되어있습니다.');
                this.logged = true;
                return;
            }
            if(res.data==='logged_in'){
                alert('로그인 되었습니다.');
                this.logged = true;
                location.replace('/admin');
                return;
            }
            if(res.data==='not_password'){
                alert('비밀번호가 틀립니다.');
                this.logged = false;
                return;
            }
            alert('아이디를 다시 확인해주세요.');
            this.logged = false;
            })
        },
    clickLogout(){
      axios.get('api/auth/logout')
      .then((res)=>{
        // console.log(res.data);
        if(res.data==='logged_out'){
            alert('로그아웃 되었습니다.');
            this.logged = false;
        }
    })
    },
    },

}
</script>

<style>

</style>