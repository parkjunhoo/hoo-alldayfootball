<template>
<div class="Accout">
    <v-row class="my-5">
        <v-col cols="12">
            <p class="titleSubText">계정관리</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="grey lighten-2" cols="4">
            <p style="text-align:center" class="listSubText">이름</p>
        </v-col>
        <v-col class="grey lighten-2" cols="4">
            <p style="text-align:center" class="listSubText">아이디</p>
        </v-col>
        <v-col class="grey lighten-2" cols="4">
            <p style="text-align:center" class="listSubText">등급</p>
        </v-col>
    </v-row>
    <v-row @click="openEdit(userList[idx])" v-for="(i,idx) in userList" :key="idx">
        <v-col :class="{ 'grey darken-1': idx%2===0, 'grey darken-2' : idx%2>0 }" cols="4">
            <p style="text-align:center; color:white;" class="listSubText">{{i.name}}</p>
        </v-col>
        <v-col :class="{ 'grey darken-1': idx%2===0, 'grey darken-2' : idx%2>0 }" cols="4">
            <p style="text-align:center; color:white;" class="listSubText">{{i.id}}</p>
        </v-col>
        <v-col :class="{ 'grey darken-1': idx%2===0, 'grey darken-2' : idx%2>0 }" cols="4">
            <p v-if="i.superAdmin" style="text-align:center; color:white;" class="listSubText">최고관리자</p>
            <p v-if="!i.superAdmin" style="text-align:center; color:white;" class="listSubText">일반관리자</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="d-flex justify-end" cols="12">
            <v-btn @click="dialog=true" color="green" class="mr-10">관리자 등록</v-btn>
        </v-col>
    </v-row>

    <v-dialog v-model="dialog" :width="dialogWidth">
        <v-container class="white">
        <v-row>
            <v-col class="black" cols="12" lg="12">
                <p class="listSubText" style="color:white;">관리자 등록</p>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="12" lg="2">
                <p class="listSubText" style="color:black;">ID</p>
            </v-col>
            <v-col cols="12" lg="6">
                <v-text-field v-model="regId" hide-details label="ID" solo></v-text-field>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="12" lg="2">
                <p class="listSubText" style="color:black;">비밀번호</p>
            </v-col>
            <v-col cols="12" lg="6">
                <v-text-field v-model="regPassword" hide-details label="Password" solo></v-text-field>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="12" lg="2">
                <p class="listSubText" style="color:black;">이름</p>
            </v-col>
            <v-col cols="12" lg="6">
                <v-text-field v-model="regName" hide-details label="name" solo></v-text-field>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col class="d-flex align-center" cols="12" lg="2">
                <p class="listSubText" style="color:black;">구분</p>
            </v-col>
            <v-col cols="12" lg="6">
                <v-radio-group row v-model="regRadio">
                    <v-radio label="최고 관리자" :value="0"></v-radio>
                    <v-radio label="일반 관리자" :value="1"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
            <v-col class="d-flex justify-space-around" cols="12">
                <v-btn @click="register" color="green">등록하기</v-btn>
                <v-btn @click="closeDialog(0)" color="red">취소</v-btn>
            </v-col>
        </v-row>
        </v-container>
    </v-dialog>

    <v-dialog v-model="dialog2" :width="dialogWidth">
        <v-container class="white">
        <v-row>
            <v-col class="black" cols="12" lg="12">
                <p class="listSubText" style="color:white;">관리자 정보 수정</p>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="12" lg="2">
                <p class="listSubText" style="color:black;">ID</p>
            </v-col>
            <v-col cols="12" lg="6">
                <v-text-field v-model="editId" hide-details label="ID" disabled solo></v-text-field>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="12" lg="2">
                <p class="listSubText" style="color:black;">비밀번호</p>
            </v-col>
            <v-col cols="12" lg="6">
                <v-text-field v-model="editPassword" hide-details label="Password" solo></v-text-field>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="12" lg="2">
                <p class="listSubText" style="color:black;">이름</p>
            </v-col>
            <v-col cols="12" lg="6">
                <v-text-field v-model="editName" hide-details label="name" solo></v-text-field>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col class="d-flex align-center" lg="2">
                <p class="listSubText" style="color:black;">구분</p>
            </v-col>
            <v-col cols="12" lg="6">
                <v-radio-group row v-model="editRadio">
                    <v-radio label="최고 관리자" :value="0"></v-radio>
                    <v-radio label="일반 관리자" :value="1"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>

        <v-row v-if="!$vuetify.mdAndDown" class="d-flex justify-center">
            <v-col class="d-flex justify-space-around" cols="12" lg="12">
                <v-btn @click="edit" color="green">등록하기</v-btn>
                <v-btn @click="remove" color="pink">삭제하기</v-btn>
                <v-btn @click="closeDialog(1)" color="red">취소</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="$vuetify.mdAndDown" class="d-flex justify-center">
            <v-col class="d-flex justify-space-around" cols="12" lg="12">
                <v-btn x-small @click="edit" color="green">등록</v-btn>
                <v-btn x-small @click="remove" color="pink">삭제</v-btn>
                <v-btn x-small @click="closeDialog(1)" color="red">취소</v-btn>
            </v-col>
        </v-row>
        </v-container>
    </v-dialog>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            userList:[
                {name:'',id:'',superAdmin:true,Admin:true},
            ],
            dialog:false,
            dialog2:false,
            regId:'',
            regName:'',
            regPassword:'',
            regRadio:0,

            editId:'',
            editName:'',
            editPassword:'',
            editRadio:0,
        }
    },
    computed:{
        dialogWidth(){
            switch(this.$vuetify.breakpoint.name){
                case 'xs' : return '100%';
                case 'sm' : return '100%';
                case 'md' : return '90%';
                case 'lg' : return '60%';
                case 'xl' : return '50%';
                default : return '100%';
            }
        }
    },
    mounted(){
        this.getUserList();
    },
    methods:{
        getUserList(){
            axios.get('http://alldayfootball.co.kr/api/auth/find')
            .then((res)=>{
                this.userList = res.data;
            })
        },
        register(){
            if(this.regId==='') {
                alert('id를 입력하세요');
                return;
            }
            if(this.regPassword==='') {
                alert('비밀번호를 입력하세요');
                return;
            }
            if(this.regName==='') {
                alert('이름을 입력하세요');
                return
            }
            axios.post('http://alldayfootball.co.kr/api/auth/register',{
                id:this.regId,
                password:this.regPassword,
                name:this.regName,
                superAdmin:this.regRadio===0
            })
            .then((res)=>{
                // console.log(res.data);
                if(res.data.message==='registered'){
                    this.getUserList();
                    alert('등록되었습니다.');
                    this.regId='';
                    this.regName='';
                    this.regPassword='';
                    this.regRadio=0;
                    this.dialog=false;
                    return;
                }
                if(res.data==='not_logged'){
                    alert('권한이 없습니다.');
                    return;
                }
                if(res.data==='id_exists'){
                    alert('이미 등록된 ID입니다.');
                    return;
                }
                if(res.data==='not_admin'){
                    alert('권한이 없습니다.');
                    return;
                }
            })
        },
        openEdit(data){
            this.editId = data.id;
            this.editName = data.name;
            this.editPassword = '';
            this.editRadio = (data.superAdmin ? 0 : 1);
            this.dialog2=true;
        },
        edit(){
            axios.put('http://alldayfootball.co.kr/api/auth/edit',{
                id:this.editId,
                password:this.editPassword,
                name:this.editName,
                superAdmin:this.editRadio===0
            })
            .then((res)=>{
                if(res.data==='not_logged'){
                    alert('권한이 없습니다.');
                    return;
                }
                if(res.data==='updated'){
                    this.getUserList();
                    alert('수정되었습니다.');
                    this.editId='';
                    this.editName='';
                    this.editPassword='';
                    this.editRadio=0;
                    this.dialog2=false;
                    return;
                }
                if(res.data==='not_admin'){
                    alert('권한이 없습니다.');
                    return;
                }
            })
        },
        remove(){
            axios.post('http://alldayfootball.co.kr/api/auth/delete',{
                id:this.editId
            })
            .then((res)=>{
                if(res.data==='not_logged'){
                    alert('권한이 없습니다.');
                    return;
                }
                if(res.data==='not_admin'){
                    alert('권한이 없습니다.');
                    return;
                }
                if(res.data==='deleted'){
                    this.getUserList();
                    alert('삭제 되었습니다.');
                    this.dialog2=false;
                    return;
                }
            })
        },
        closeDialog(n){
            if(n===0)
            {
                this.regId='';
                this.regName='';
                this.regPassword='';
                this.regRadio=0;
                this.dialog = false;
                return;
            }
            if(n===1)
            {
            this.editId='';
            this.editName='';
            this.editPassword='';
            this.editRadio=0;
            this.dialog2 = false;
            return;
            }
        }
    },
}
</script>

<style scoped>
@import url("../../assets/css/unify.css");
</style>