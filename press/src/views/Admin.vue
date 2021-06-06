<template>
<div class="admin">
    <AdminHeader/>
    <router-view/>
</div>
</template>

<script>
import AdminHeader from '@/components/Admin/AdminHeader.vue'
export default {

    components:{
        AdminHeader,
    },

}
</script>

<style>

</style>