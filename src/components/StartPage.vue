<template>
<section class="start">
    <h1>GitHub Feeds</h1>
    <div class="dash">—</div>
    <router-link to="/search" class="btn-start">
        Начать
    </router-link>
</section>

</template>

<script>
export default {
  name: 'StartPage'
}
</script>


<style scoped>
.start{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.btn-start{
    margin-top: 30px;
    color: #ffffff;
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border-radius: 10px;
    background:linear-gradient(180deg, rgba(71,78,255,1) 0%, rgba(0,128,128,1) 100%);
}
</style>
