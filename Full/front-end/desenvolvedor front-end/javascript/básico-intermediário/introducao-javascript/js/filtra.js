var campoBusca = document.querySelector("#filtrar-tabela");

campoBusca.addEventListener("input", function(){
    var pacientes = document.querySelectorAll(".paciente");
    pacientes.forEach(function(paciente){
        var tdNome = paciente.querySelector(".info-nome");
        var nome = tdNome.textContent;
        var expressao = new RegExp(campoBusca.value, "i")
        
        if(campoBusca.value.length > 0){
            if(!expressao.test(nome)){
                paciente.classList.add("invisivel");
            }else{
                paciente.classList.remove("invisivel");        
            } 
        }else{
            pacientes.forEach(function(paciente){
            paciente.classList.remove("invisivel");        
            })
        }
    })
})