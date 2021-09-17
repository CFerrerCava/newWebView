

const buildListServices = ()=>{
    var list = document.getElementById('list-services')
    for (let index = 0; index < 6; index++) {
        list.innerHTML += '<li><img src="/images/image_'+(index+1)+'.png" alt=""></li>';        
    }
   
}


buildListServices()