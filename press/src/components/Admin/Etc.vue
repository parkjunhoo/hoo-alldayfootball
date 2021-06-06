<template>
<div class="Etc">
    <v-row class="my-5">
        <v-col cols="12">
            <p class="titleSubText">기타관리</p>
        </v-col>
    </v-row>
</div>
</template>

<script>
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
        const editor = new Jodit('#editor',uploadOptions)
        editor.value = ''
    },
}
</script>

<style>
.Write .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot{
    box-shadow: none;
}
</style>

<style scoped>
@import url("../../assets/css/unify.css");
</style>