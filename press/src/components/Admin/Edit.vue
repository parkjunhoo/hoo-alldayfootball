<template>
<div class="Write">
    <v-row class="my-5">
        <v-col cols="12">
            <p class="titleSubText">글쓰기</p>
        </v-col>
    </v-row>
    <v-row class="mt-5" no-gutters>
        <v-col cols="12">
            <v-radio-group row v-model="radioGroup">
                <v-radio v-for="i in bNumList" :key="i.code" :label="i.name"></v-radio>
            </v-radio-group>
        </v-col>
        <v-col style="border-top:1px solid rgba(55,55,55,.2);" cols="12">
            <v-text-field v-model="title" label="제목" solo hide-details></v-text-field>
        </v-col>
        <v-col style="border-bottom:1px solid grey;" cols="12">
            <div id="editor1"></div>
        </v-col>
        <v-col class="d-flex justify-center" cols="12">
            <v-btn class="ma-3" @click="clickSubmit" width="100px" color="green">등록하기</v-btn>
            <v-btn @click="cancle" class="ma-3"  width="100px" color="red">취소</v-btn>
            <v-btn @click="clickdelete" class="ma-3"  width="100px" color="pink">삭제하기</v-btn>
        </v-col>
    </v-row>
</div>
</template>

<script>
import axios from 'axios'
import { Jodit } from 'jodit'
import 'jodit/build/jodit.min.css'
export default {
    mounted() {
         var uploadOptions = {
                enableDragAndDropFileToEditor: true,
                uploader: {
                    url: 'file/upload',
                    isSuccess: function (resp) {
                        return resp;
                    },
                    process: function (resp) {                       
                        return {
                            files: resp.data.files,
                            path: resp.data.path,
                            baseurl: resp.data.baseurl,
                            error: resp.data.error,
                            message: resp.data.message
                        }
                    },
                    defaultHandlerSuccess: function (data) {
                        var i, field = 'files';                      
                        if (data[field] && data[field].length) {
                            for (i = 0; i < data[field].length; i += 1) {
                                this.selection.insertImage(data.baseurl + data[field][i]);
                            }
                        }
                    },
                }
            }
        this.editor = new Jodit('#editor1',uploadOptions)
        this.editor.value = "";
        axios.get('http://alldayfootball.co.kr/api/auth/check')
        .then((res)=>{
        this.author=res.data.info.id
        })
            var n = parseInt(this.$route.query.num);
            // console.log(n);
            axios.post('http://alldayfootball.co.kr/api/board/findone',{
                seq:n
            })
            .then((res)=>{
                this.id = res.data._id;
                this.title = res.data.title;
                // this.author = res.data.author;
                this.radioGroup = res.data.bNum;
                this.editor.value = res.data.contents;
            })

    },
    data(){
        return{
            title:null,
            editor:null,
            author:null,
            id:null,
            radioGroup:null,
            bNumList:[
                {name:'k1',code:0},
                {name:'k2',code:1},
                {name:'k3',code:2},
                {name:'k4',code:3},
                {name:'k5',code:4},
                {name:'인터뷰',code:5},
                {name:'스포츠 칼럼',code:6},
            ]
        }
    },
    watch:{
        $route(){
            var n = parseInt(this.$route.query.name);
            axios.post('http://alldayfootball.co.kr/api/board/findone',{
                seq:n
            })
            .then((res)=>{
                this.id = res.data._id;
                this.title = res.data.title;
                // this.author = res.data.author;
                this.editor.value = res.data.contents;
                this.radioGroup = res.data.bNum;
            })
        },
    },
    methods:{
        cancle(){
            if(this.title===null&&this.editor.value==="") this.$router.push('/admin/article');
            else{
                if(confirm("작성 된 내용은 저장되지 않습니다. 나가시겠습니까?")) {
                    window.location.href = "/admin/article"
                }
            }
        },
        clickSubmit(){
            // console.log(this.id,this.title,this.editor.value,this.radioGroup);
            axios.put('http://alldayfootball.co.kr/api/board/edit',{
                id: this.id,
                title: this.title,
                contents: this.editor.value,
                bNum:this.radioGroup
            })
            .then(()=>{
                window.location.href = "/admin/article"
            })
        },
        clickdelete(){
            axios.post('http://alldayfootball.co.kr/api/board/delete',{
                id: this.id
            })
            .then(()=>{
                window.location.href = "/admin/article"
            })
        },
    },
}
</script>

<style>
.Write .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot{
    box-shadow: none;
}
</style>