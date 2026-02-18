<script setup lang="ts">
import UserManagerButtons from "@/components/UserManager/UserManagerButtons.vue";
import UserManagerTable from "@/components/UserManager/UserManagerTable.vue";
</script>

<template>
    <section class="py-10">
        <div class="custom-container">
            <UserManagerButtons/>
            <UserManagerTable/>
        </div>
    </section>
</template>