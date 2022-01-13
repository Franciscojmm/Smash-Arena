document.getElementById('altaUsuario').addEventListener("click",mostrarFormulario,false);
document.getElementById('modificarUsuario').addEventListener("click",mostrarFormulario,false);
document.getElementById('alquilarPista').addEventListener("click",mostrarFormulario,false);
document.getElementById('crearClase').addEventListener("click",mostrarFormulario,false);
document.getElementsByName('botonEnviar')[0].addEventListener("click",altaUsuario,false);
document.getElementById('comboUsuarios').addEventListener("change",mostrarDatosUsuario,false);
var oGestion = new Gestion();

cargaPistas();
cargarComboUsuarios();

function altaUsuario() {     
let sNombreUsuario = document.querySelector(".nombreUsuario").value;     
let sDNI = document.querySelector(".dniUsuario").value;     
let iEdad = document.querySelector(".Edad").value;     
let aSexo = document.querySelectorAll(".radioSexo");
let bSexo;
let bInstructor;
for (i in aSexo){
    if(aSexo[i].checked){
        aSexo=true;
    }else {
        bSexo=false;
    }
}
if(document.getElementsByName('checkInstructor')[0].checked){
    bInstructor=true;
}else {
    bInstructor=false;
}
if(sNombreUsuario == "" || sDNI == "" || iEdad == "" ){
    alert("Debes rellenar todos los campos");
}else {
    alert(oGestion.altaUsuario(new Usuario(sNombreUsuario,sDNI,iEdad,bSexo,bInstructor)));
    cargarComboUsuarios();
}
}


function mostrarFormulario(oE){
    ocultarTodosFormularios();
    oEvento = oE || window.event;
    oFormulario = oEvento.srcElement;
    switch(oFormulario.textContent){
        case "Alta Usuario" :
            frmAltaUsuario.style.display = "block";
            break;
        case "Alquilar Pista" :
            frmAltaReserva.style.display = "block";
            break;
        case "Modificar Usuario" :
            frmModificarUsuario.style.display = "block";
            break;
        case "Crear clase de Padel" :
            frmAltaClases.style.display = "block";
            break;
    }
}
function ocultarTodosFormularios() {
    let oFormularios = document.querySelectorAll("form");
    for(let oFor of oFormularios){
        oFor.style.display = "none";
    }
}

function hacerReserva(){
    let nomReserva = frmAltaReserva.nombreReserva.value;
    let descripcionReserva = frmAltaReserva.descripcionReserva.value;
    let diaReserva = new Date(frmAltaReserva.diaReserva.value);
    let StringInicioReserva = frmAltaReserva.horaInicioReserva.value;
    let arrayHora = StringInicioReserva.split(":");
    let fechaReserva = new Date(diaReserva.getFullYear(), diaReserva.getMonth() , diaReserva.getDay(), arrayHora[0] ,arrayHora[1] ,00,00);
    let fechaFin = new Date (fechaReserva);
    fechaFin.setHours(fechaReserva.getHours()+1); 
   // console.log(fechaReserva);
    //console.log(fechaFin);

    let pistaSelecionada = frmAltaReserva.seleccionPistas.value;

    console.log(pistaSelecionada);

}


function cargaPistas(){
    //Provisional 
    oGestion.aPistas.push(new Pista("Pista 1",1));
    oGestion.aPistas.push(new Pista("Pista 2",2));
    oGestion.aPistas.push(new Pista("Pista 3",3));



    //Esto si sirve
    oCapa = document.getElementById("comboPistas");
    /*oCapa.appendChild(document.createElement("SELECT"));*/

    //console.log(oCapa);

    /*let select = oCapa.lastChild;
    select.id="seleccionPistas";
    select.name="seleccionPistas";*/


    for (oPista of oGestion.aPistas){
        oCapa.appendChild(document.createElement("OPTION"));
        oCapa.lastChild.value = oPista.id;
        oCapa.lastChild.textContent = oPista.nombre;
    }

}
function cargarComboUsuarios() {
    let oCapa = document.getElementById('comboUsuarios');
    for(let usuario of oGestion.aUsuarios){
        oCapa.appendChild(document.createElement("OPTION"));
        oCapa.lastChild.value = usuario.DNI;
        oCapa.lastChild.textContent = usuario.NombreAp
    }
}
function mostrarDatosUsuario() {
    let sDNI = document.getElementById('comboUsuarios').value;
    if( sDNI != "nulo"){
        let usuario = oGestion.buscarUsuario(sDNI);
        document.querySelector(".nombreUsuarioModificar").value = usuario.NombreAp;
        document.querySelector(".dniUsuarioModificar").value = usuario.DNI;
        document.querySelector(".edadModificar").value = usuario.Edad;
        
    }else {
        alert("Seleccione un usuario");
    }
}