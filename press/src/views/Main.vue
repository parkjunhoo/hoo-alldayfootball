<template>
  <div class="Main mx-auto">
    <v-row no-gutters class="mt-5">
      <v-col cols="12" lg="8">
        <div class="d-flex align-end pa-1" style="width:100%; height:500px;">
          <v-card class="scopeCard" @click="goToView(boardResult[0].seq)" width="100%" height="100%">
            <v-row class="d-flex align-end" style="position:absolute; z-index:2; width:100%; height:100%;" no-gutters>
              <v-col class="mb-5 pa-5 pr-16" cols="12">
                <p class="mainTitleText pr-16">{{boardResult[0].title}}</p>
              </v-col>
            </v-row>
            <v-img gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.33)" style="position:absolute;" :src="boardResult[0].thumb" width="100%" height="100%">
            </v-img>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" lg="4">
        <div class="d-flex align-end pa-1" style="width:100%; height:250px;">
          <v-card class="scopeCard" @click="goToView(boardResult[1].seq)" width="100%" height="100%">
            <v-row class="d-flex align-end" style="position:absolute; z-index:2; width:100%; height:100%;" no-gutters>
                <v-col class="mb-5 pa-5 pr-16" cols="12">
                  <p class="mainSubTitleText pr-16">{{boardResult[1].title}}</p>
                </v-col>
            </v-row>
            <v-img gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.33)" style="position:absolute;" :src="boardResult[1].thumb" width="100%" height="100%">
            </v-img>
          </v-card>
        </div>
        <div class="d-flex align-end pa-1" style=" width:100%; height:250px;">
          <v-card class="scopeCard" @click="goToView(boardResult[2].seq)" width="100%" height="100%">
              <v-row class="d-flex align-end" style="position:absolute; z-index:2; width:100%; height:100%;" no-gutters>
                <v-col class="mb-5 pa-5 pr-16" cols="12">
                  <p class="mainSubTitleText pr-16">{{boardResult[2].title}}</p>
                </v-col>
              </v-row>
            <v-img gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.33)" style="position:absolute;" :src="boardResult[2].thumb" width="100%" height="100%">
            </v-img>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-5"> 
      <v-row style="border:1px solid rgba(0,0,0,.2);" no-gutters>
        <v-col class="green darken-3" cols="12">
          <p class="mainSubTitleText px-5 py-3" style="font-weight:300;">많이 본 기사</p>
        <v-divider></v-divider>
        </v-col>
        <v-col cols="12">
          <v-carousel cycle interval="3000" hide-delimiters show-arrows-on-hover>
            <v-carousel-item v-for="(i,idx) in boardResultViews" :key="idx">
              <v-row no-gutters style="height:100%;">
                <v-col class="pa-10" cols="4">
                  <v-card width="100%" height="100%">
                    <v-img @click="goToView(i.seq)" gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.2)" style="position:absolute; cursor:pointer;" :src="i.thumb" width="100%" height="100%"></v-img>
                  </v-card>
                </v-col>
                <v-col cols="8" class="my-auto pa-10">
                  <p @click="goToView(i.seq)" style="color:black; cursor:pointer;" class="mainSubTitleText">{{i.title}}</p>
                  <p @click="goToView(i.seq)" style="cursor:pointer;" class="listSubText">{{i.pretext}}</p>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-row>


      
    <v-row no-gutters class="mt-5">
      <v-col class="green darken-3" cols="12">
        <p class="mainSubTitleText px-5 py-3" style="font-weight:300;">최신 뉴스</p>
      <v-divider></v-divider>
      </v-col>
      <v-col v-for="(i,idx) in boardResult.slice(3,16)" :key="idx" cols="6" lg="4">
        <div style="border:1px solid rgba(0,0,0,.2); width:100%;">
          <v-card class="scopeCard" @click="goToView(i.seq)" width="100%" height="250">
            <v-img gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.33)" style="position:absolute;" :src="i.thumb" width="100%" height="100%"></v-img>
          </v-card>
          <v-card height="75" width="100%" class="px-5 py-1" color="green darken-3">
            <p @click="goToView(i.seq)" class="mainSubTitleText pr-10" style="cursor:pointer;">{{i.title}}</p>
          </v-card>
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
        boardResult:[
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
          {title:'',seq:0,},
        ],
        boardResultViews:[
          {title:'',seq:1,thumb:''},
          {title:'',seq:2,thumb:''},
          {title:'',seq:3,thumb:''},
          {title:'',seq:4,thumb:''},
          {title:'',seq:5,thumb:''},
        ],
    }
  },
  computed:{
  },
  created(){
    this.takeBoardViews();
    this.takeBoard();
  },
  methods:{
    takeBoard(){
      axios.post('http://alldayfootball.co.kr/api/board/takeboard',{
        bNum: null,
        limit: 15,
        page: 1,
        word:""
        })
        .then((res=>{
          this.boardResult = res.data.docs;
          this.findThumb();
          }))
    },

    takeBoardViews(){
      axios.post('http://alldayfootball.co.kr/api/board/takeboardviews',{
        bNum: null,
        limit: 5,
        page: 1,
        word:""
        })
        .then((res=>{
          this.boardResultViews = res.data.docs;
          this.findThumbViews();
          this.findPretextViews();
          }))
    },


    findThumb(){
      for(var i = 0; i<this.boardResult.length; i++){
          if(this.boardResult[i].contents.includes('<img')){
          var tagIndex = this.boardResult[i].contents.indexOf('<img');
          var tagSrcIndex = this.boardResult[i].contents.indexOf('src="',tagIndex+4);
          var tagEndIndex = this.boardResult[i].contents.indexOf('"',tagSrcIndex+5);
          this.boardResult[i].thumb = this.boardResult[i].contents.slice(tagSrcIndex+5,tagEndIndex);
          }
      }
    },
    findThumbViews(){
      for(var i = 0; i<this.boardResultViews.length; i++){
          if(this.boardResultViews[i].contents.includes('<img')){
          var tagIndex = this.boardResultViews[i].contents.indexOf('<img');
          var tagSrcIndex = this.boardResultViews[i].contents.indexOf('src="',tagIndex+4);
          var tagEndIndex = this.boardResultViews[i].contents.indexOf('"',tagSrcIndex+5);
          this.boardResultViews[i].thumb = this.boardResultViews[i].contents.slice(tagSrcIndex+5,tagEndIndex);
          }
      }
    },
    findPretextViews(){
      for(var i = 0; i<this.boardResultViews.length; i++){
          this.boardResultViews[i].pretext = this.boardResultViews[i].contents.replace(/(<([^>]+)>|&nbsp;)/ig," ").slice(0,200)+('...');
      }
    },
    goToView(num){
      location.href=`/articleView?num=${num}`;
    },
  },

}
</script>

<style>
.Main .scopeCard{
  overflow: hidden;
}
.Main .scopeCard:hover .v-image__image{
  transition-duration: .9s;
  width:105%;
}
</style>>
