const f=async (method,url,body)=>{
    let options={
        method:method,
        headers:{
            'Accept':'application/json'
        },
    };
    if (body){
        options.body=JSON.stringify(body);
    }
    let result = await fetch(url,options);
    return await result.json();
};

let todo = new Vue({
    el: '#app',
    
    data:{
        modal:{
            isShow:false,
            modelNewTask:'',
        },
        searchText:'',
        tasks:['Item 1','Item 2','Item 3','Item 4','Item 5'],
    },
    
    methods:{
        openModal(){
            this.modal.isShow=true;
        },
        
        closeModal(){
            this.modal.isShow=false;
        },
        
        addTask(){
            this.tasks.push(this.modal.modelNewTask);
            this.saveTasks();    
            this.modal.modelNewTask='';
            this.closeModal();
        },
        
        async saveTasks(){
            await f('post','save.php?save',JSON.stringify(this.tasks));
        },
        
        deleteObject: function(index) {
            this.$delete(this.tasks, index);
        },
        /*removeItem(index) {
         this.tasks.splice(index,1); -------------тоже рабочий вариант-------------
        }*/
    },
    
    async mounted(){
        let tasks=await f('get','save.php');
        if(tasks){
            this.tasks=JSON.parse(tasks);
        }
    },
})