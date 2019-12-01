<template>
<section class="search-page">
    <input 
    class="search-field"
    type="text" 
    placeholder="Enter repository name"
    v-model.lazy="repo_name" 
    @change="setQueryName(repo_name)">
<div class="repos-list">
   <div class="repos-list__heading">
       <div class="name sort-field"
       @click="setSortParams('name')"
       :class="search_options.sort === 'name' && search_options.order === 'asc' ? 'asc' : 'desc'">
       Наименование
       </div>
       <div class="watchers sort-field"
       @click="setSortParams('watchers')"
       :class="search_options.sort === 'watchers' && search_options.order === 'asc' ? 'asc' : 'desc'">
       Просмотры
       </div>
   </div>
   <div class="repos-list__items" v-if="repos && repos.items">
       <div class="repos-list_item" v-for="item in repos.items" :key=item.id>
           <div class="owner">
               <img :src="item.owner.avatar_url" 
               class="owner-avatar"/>
                <div class="owner-info">
                    <div class="item-name">{{
                        item.name
                    }}</div>
                    <div class="owner-login">{{
                        item.owner.login
                    }}</div>
                </div>
           </div>
           <div class="watchers-count">
               {{item.watchers_count}}
           </div>
       </div>
   </div>
</div>
</section>
</template>

<script>
export default {
  name: 'SearchPage',
  data: () => ({
      repos: null,
      repo_name: '',
      base_url: 'https://api.github.com/search/repositories',
      search_options: {
        q: 'stars:%3E=0',
        sort: 'stars',
        order: 'desc',
        page: 1
      }
  }),
  async created(){
        this.getRepos(this.search_options)
  },
  methods: {
      getSearchParams(params){
          let queryString = ''
        for(let param in params){
            let key = param
            let value = params[param]
            queryString += `${key}=${value}&`
        }
        return queryString
      },
      setSortParams(field){
          if(field !== this.search_options.sort){
              this.search_options.sort = field
               this.search_options.order = 'desc'
               this.repos.items.sort()
          } else{
              if(this.search_options.order === 'asc'){
                this.search_options.order = 'desc'
              } else{
                this.search_options.order = 'asc'
              }
               
          }
          if(field === 'watchers'){
              if(this.search_options.order === 'asc'){
                this.repos.items.sort((a,b)=>{
                  return a.watchers - b.watchers
              })
              } else {
                   this.repos.items.sort((a,b)=>{
                  return -(a.watchers - b.watchers)
              })
              }
             
          } else {
               if(this.search_options.order === 'asc'){
              this.repos.items.sort(function (a, b) {
                
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    
                    return 0
                    })

                    } else {
                        this.repos.items.sort(function (a, b) {
                            if (a.name > b.name) {
                                return -1
                            }
                            if (a.name < b.name) {
                                return 1
                            }
                    
                            return 0
                        })
                    }
            }
      },
      setQueryName(name){
          if(name !== ''){
            this.search_options.q = name
          } else{
            this.search_options.q = 'stars:%3E=0'
          }
       
        this.getRepos(this.search_options)
      },
      async getRepos(params){
        try{
            let repos = await fetch(`${this.base_url}?${this.getSearchParams(params)}`)
            let response = await repos.json()
            this.repos = response
            
        }
        catch(e){
            alert('Error')
            throw e
        }
      }
  }
}
</script>


<style scoped>
.search-page{
    font-family: Roboto,  sans-serif;
}
.search-field{
    width: 400px;
    height: 50px;
    border-radius: 10px;
    padding-left: 20px;
    font-size: 20px;
}
.repos-list__heading{
    display: flex;
    justify-content: space-between;
}
.item-name,
.owner-login{
text-align: left;
}
.sort-field:first-child{
    padding-left: 130px;
}
.sort-field{
     color: #63C9FF;
     display: flex;
     align-items: center;
     padding: 20px 0;
}
.desc::after{
    content: '';
    width: 0; 
    height: 0; 
    margin-left: 5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #63C9FF;
}
.asc::after{
    content: '';
    width: 0; 
    height: 0; 
    margin-left: 5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #63C9FF;
}
.repos-list_item{
    display: flex;
    width: 100%;
    justify-content: space-between;
    background: #ced1d6;
    margin-bottom: 5px;
    box-shadow: 0px 5px 0px 0px rgba(0,0,0,0.5);
}
.owner{
    display: flex;
}
.owner-avatar{
    padding: 30px;
    border-radius: 50%;
    width: 70px;
    height: 70px;
}
.owner-info{
    display: flex;
    padding: 30px 0;
    flex-direction: column;
    justify-content: space-between;
}
.watchers-count{
    margin: 60px 30px 30px 30px;;
    padding: 10px 15px;
    background: #63C9FF;
    border-radius: 5px;
    color: #fff;
}

</style>
