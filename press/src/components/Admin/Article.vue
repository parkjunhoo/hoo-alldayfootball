<template>
<div class="Article">
    <v-row class="my-5">
        <v-col cols="12">
            <p class="titleSubText">기사관리</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-combobox
            v-model="select"
            :items="category"
            label="카테고리"
            solo
            multiple
            chips
            ></v-combobox>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="d-flex align-center" cols="12">
        <v-text-field @keypress.enter="clickSearch" hide-details v-model="search" label="검색" solo-inverted></v-text-field>
        <v-btn style="height:90%;" class="mx-3 px-2" @click="clickSearch" color="green darken-2" dark ><v-icon >mdi-magnify</v-icon></v-btn>
        </v-col>
    </v-row>
    <v-row style="text-align:center;" class="mt-5" no-gutters>
        <v-col class="black py-3" cols="1">
            <p style="color:white; border-right:1px solid white;" class="listTitleText">No</p>
        </v-col>
        <v-col class="black py-3" cols="1">
            <p style="color:white; border-right:1px solid white;" class="listTitleText">cate</p>
        </v-col>
        <v-col class="black py-3" cols="5">
            <p style="color:white; border-right:1px solid white;" class="listTitleText">제목</p>
        </v-col>
        <v-col class="black py-3" cols="2">
            <p style="color:white; border-right:1px solid white;" class="listTitleText">작성자</p>
        </v-col>
        <v-col class="black py-3" cols="1">
            <p style="color:white; border-right:1px solid white;" class="listTitleText">조회수</p>
        </v-col>
        <v-col class="black py-3" cols="2">
            <p style="color:white;" class="listTitleText">날짜</p>
        </v-col>
    </v-row>

    <v-row style="text-align:center;" no-gutters v-for="(i,index) in boardResult" :key="index">
        <v-col class="grey lighten-2 py-2" cols="1">
            <p style="overflow:hidden; border-right:1px solid black;" class="newsSubText">{{i.seq}}</p>
        </v-col>
        <v-col class="grey lighten-2 py-2" cols="1">
            <p style="overflow:hidden; border-right:1px solid black;" class="newsSubText">{{i.bNum}}</p>
        </v-col>
        <v-col class="grey lighten-2 py-2" cols="5">
            <p @click="clickTitle(i.seq)" style="overflow:hidden; border-right:1px solid black; cursor:pointer;" class="newsSubText">{{i.title}}</p>
        </v-col>
        <v-col class="grey lighten-2 py-2" cols="2">
            <p style="border-right:1px solid black;" class="newsSubText">{{i.author}}</p>
        </v-col>
        <v-col class="grey lighten-2 py-2" cols="1">
            <p style="overflow:hidden; border-right:1px solid black;" class="newsSubText">{{i.views}}</p>
        </v-col>
        <v-col class="grey lighten-2 py-2" cols="2">
            <p class="newsSubText">{{i.regTime.slice(0,10)}}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="d-flex justify-end" cols="12">
            <v-btn to="/admin/write">글쓰기</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <div class="text-center">
                <v-container>
                <v-row justify="center">
                    <v-col cols="8">
                    <v-container class="max-width">
                        <v-pagination
                        v-model="page"
                        class="my-4"
                        color="black"
                        :length="pLength"
                        ></v-pagination>
                    </v-container>
                    </v-col>
                </v-row>
                </v-container>
            </div>
        </v-col>
    </v-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            search:'',
            titleCheck: true,
            contentCheck: true,
            bLength:0,
            boardResult:[],
            page:1,
            category:[
                'k1',
                'k2',
                'k3',
                'k4',
                'k5',
                'interview',
                'column',
                'kresult',
            ],
            select:['k1','k2','k3','k4','k5','interview','column','kresult'],
        }
    },
    created(){
        this.takeBoard();
    },
    computed:{
        selectCode(){
            var sc=[];
            if(this.category===this.select) return null;
            for(var i =0; i<this.select.length; i++){
                switch(this.select[i]){
                    case 'k1': sc[i] = 0; break;
                    case 'k2': sc[i] = 1; break;
                    case 'k3': sc[i] = 2; break;
                    case 'k4': sc[i] = 3; break;
                    case 'k5': sc[i] = 4; break;
                    case 'interview': sc[i] = 5; break;
                    case 'column': sc[i] = 6; break;
                    case 'kresult': sc[i] = 7; break;
                }
            }
            return sc;
        },
        pLength(){
            var quo = parseInt(this.bLength/10);
            var rem = this.bLength % 10 ;
            if(quo===0) return 1;
            if(quo>0&&rem===0) return quo;
            return quo + 1 ;
        },
    },
    methods:{
        clickTitle(num){
            location.href=`/admin/edit?num=${num}`;
        },
        clickSearch(){
            this.takeBoard();
        },
        takeBoard(){
            axios.post('http://alldayfootball.co.kr/api/board/takeboard',{
                bNum: this.selectCode,
                limit: 10,
                page: this.page,
                word:this.search
            })
            .then((res=>{
                this.boardResult = res.data.docs;
                this.bLength = res.data.totalDocs;
            }))
        },
    },
    watch:{
        page(){
            this.takeBoard();
        },
        select(){
            this.takeBoard();
        }
    },
}
</script>

<style>
.Write .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot{
    box-shadow: none;
}
.Article .v-pagination__navigation{
    height: 25px !important;
    width: 25px !important;
}
.Article .v-pagination__item{
    min-width: 25px !important;
    height: 25px !important;
}
</style>

<style scoped>
@import url("../../assets/css/unify.css");
</style>