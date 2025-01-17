//Añadir eventos
document.getElementById('altaUsuario').addEventListener("click",mostrarFormulario,false);
document.getElementById('modificarUsuario').addEventListener("click",mostrarFormulario,false);
document.getElementById('altaPista').addEventListener("click",mostrarFormulario,false);
document.getElementById('alquilarPista').addEventListener("click",mostrarFormulario,false);
document.getElementById('crearClase').addEventListener("click",mostrarFormulario,false);
document.getElementById('apuntarClase').addEventListener("click",mostrarFormulario,false);
document.getElementById('listados').addEventListener("click",mostrarFormulario,false);
frmAltaUsuario.botonEnviar.addEventListener("click",altaUsuario,false);
document.getElementById('comboUsuarios').addEventListener("change",mostrarDatosUsuario,false);
frmModificarUsuario.botonEnviar.addEventListener("click",modificarUsuario,false);
frmAltaClases.botonEnviar.addEventListener("click",altaClase,false);
frmAltaReserva.botonEnviar.addEventListener("click",hacerReserva,false);
frmAltaPista.botonEnviar.addEventListener("click",altaPista,false);
frmApuntarClase.botonEnviar.addEventListener("click",apuntarseClase,false);
//frmListados.botonEnviar.addEventListener("click",listado,false);


//Creamos el objeto gestion y despues cargamos el documento XML
var oGestion = new Gestion();
var oXML = loadXMLDoc("xmlSMASH-ARENA.xml");


//Llamada a todas las funciones principales
cargarUsuarios();
cargarPistas();
cargarClases();
cargarComboPistas();
cargarComboUsuarios();
cargarComboClases();


//Alta Usuario                                          
function altaUsuario() {     
    let sNombreUsuario = document.querySelector(".nombreUsuario").value;     
    let sDNI = document.querySelector(".dniUsuario").value;     
    let iEdad = document.querySelector(".Edad").value;     
    let bSexo;
    let bInstructor;
    if(document.getElementById('radioSexoHombreAltaUsuario').checked){
        bSexo=true;
    }else {
        bSexo=false;
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
        frmAltaUsuario.reset();
        ocultarTodosFormularios();
    }
}
//----------------------------------------------------------------------------------------------------//
//Modificar Usuario
function modificarUsuario() {
    let sNombreUsuario = document.querySelector(".nombreUsuarioModificar").value;
    let sDNIABuscar = document.getElementById("comboUsuarios");
    sDNIABuscar = sDNIABuscar.children[document.getElementById("comboUsuarios").selectedIndex].value;     
    let sDNIAGuardar = document.querySelector(".dniUsuarioModificar").value;     
    let iEdad = document.querySelector(".edadModificar").value;
    let bSexo;
    let bInstructor;
    if(document.getElementById('radioSexoHombre').checked){
        bSexo=true;
    }else {
        bSexo=false;
    }
    if(document.getElementById('checkInstructorModificar').checked){
        bInstructor = true;
    } else {
        bInstructor = false;
    }
    if(sNombreUsuario == "" || iEdad == "" ){
        alert("Debes rellenar todos los campos");
    }else {
        alert(oGestion.modificarUsuario(sDNIABuscar,sDNIAGuardar,sNombreUsuario,iEdad,bSexo,bInstructor));
        cargarComboUsuarios();
        frmModificarUsuario.reset();
        ocultarTodosFormularios();
    }
}

//Mostrar todos los formularios (Si se añade un formulario se debe añadir el case correspondiente)
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
        case "Alta Clase" :
            frmAltaClases.style.display = "block";
            break;
        case "Alta Pista" :
            frmAltaPista.style.display = "block";
            break;
        case "Apuntarse a una Clase" :
            frmApuntarClase.style.display = "block";
            break;
        case "Listados" :
            frmListados.style.display = "block";
            break;
    }
}

//Reservar Pista
function hacerReserva()
{
    let idReserva = frmAltaReserva.idReserva.value;
    let nomReserva = frmAltaReserva.nombreReserva.value;
    let descripcionReserva = frmAltaReserva.descripcionReserva.value;
    //Para hacer la fecha de inicio y de fin con sus horas.
    let fechaReserva = new Date(frmAltaReserva.diaReserva.value);
    let StringInicioReserva = frmAltaReserva.horaInicioReserva.value;
    let arrayHora = StringInicioReserva.split(":");
    fechaReserva.setHours(arrayHora[0]);
    fechaReserva.setMinutes(arrayHora[1]);
    let fechaFin = new Date (fechaReserva);
    fechaFin.setHours(fechaReserva.getHours()+1); 
    //Ya tenemos la fecha inicio y fin.

    //Control de errores antes de crear el objeto.
    let hoy = fechaHoy();
    console.log(hoy);

    if(fechaReserva < hoy)
    {
        alert("Aristoteles 2015 : No puede reservar en el pasado.");
    }

    else{
        let pistaSelecionada = frmAltaReserva.comboPistas.value;
        oReserva = new Reserva(nomReserva,descripcionReserva,fechaReserva,fechaFin,pistaSelecionada,idReserva);
        console.log(oReserva);

        alert(oGestion.altaReserva(oReserva));
        // Todo fue correcto borramos los datos.
        frmAltaReserva.reset(); 
        ocultarTodosFormularios();
    }

}

//Alta Clase
function altaClase(){     
    let iIdClase = document.querySelector(".idClase").value;     
    let sNombreClase = document.querySelector(".nombreClase").value;     
    let sDescripcionClase = document.querySelector(".descripcionClase").value;     
    let dtDiaInicio = new Date(document.querySelector('.diaInicioClase').value);
    let horaInicio = new Date("1/1/1 "+document.querySelector(".horaInicioClase").value);
    dtDiaInicio.setHours(horaInicio.getHours());
    dtDiaInicio.setMinutes(horaInicio.getMinutes());     
    let dtDiaFin = new Date(document.querySelector('.diaFinClase').value);
    let horaFin = new Date ("1/1/1 "+document.querySelector(".horaFinClase").value);
    dtDiaFin.setHours(horaFin.getHours());
    dtDiaFin.setMinutes(horaFin.getMinutes());
    let iCapacidad = document.querySelector('.capacidadClase').value;     
    let sTipoClase = document.querySelector('.tipoClase').value;     
    let idInstructor = document.querySelector('.idInstructorClase').value;

    alert(oGestion.altaClase(new Clase(iIdClase,sNombreClase,sDescripcionClase,dtDiaInicio,dtDiaFin,iCapacidad,sTipoClase,idInstructor)));
    cargarComboClases();
}

//Alta Pista
function altaPista(){
    let sNombrePista = document.querySelector(".nombrePista").value;
    let iIDPista = document.querySelector(".numeroPista").value;

    alert(oGestion.altaPista(new Pista(sNombrePista,iIDPista)));
    cargarComboPistas();
}

//Apuntarse Clase
function apuntarseClase() {
    let sDNI = document.querySelector(".dniUsuarioApuntarseClase").value;
    let indexCombo = document.querySelector("#comboClasesApuntarseClase").selectedIndex;
    let iIDClase = document.querySelector("#comboClasesApuntarseClase")[indexCombo].value;
    
    alert(oGestion.apuntarseClase(sDNI,iIDClase));
}

//Cargar pistas desde XML
function cargarPistas(){
    //Cargarmos las pista desde el XML
    oPistas = oXML.getElementsByTagName("pista");
    for(let oPista of oPistas){
        let nombrePista = oPista.getElementsByTagName("nombre")[0].textContent;
        let numeroPista = oPista.getElementsByTagName("numero")[0].textContent;
        
        oGestion.altaPista(new Pista(nombrePista,numeroPista));
    }
}

//Crea el combo de usuarios para modificarlos
function cargarComboUsuarios() {
    let oCapa = document.getElementById('comboUsuarios');
    while(oCapa.hasChildNodes()){
        oCapa.removeChild(oCapa.firstChild);
    }
    oCapa.appendChild(document.createElement("OPTION"))
    oCapa.lastChild.value = "nulo";
    oCapa.lastChild.textContent = "Selecciona un usuario...";
    for(let usuario of oGestion.aUsuarios){
        oCapa.appendChild(document.createElement("OPTION"));
        oCapa.lastChild.value = usuario.DNI;
        oCapa.lastChild.textContent = usuario.NombreAp
    }
}

//Cuando selecciona un usuario del combo pinta los datos del usuario
function mostrarDatosUsuario() {
    let sDNI = document.getElementById('comboUsuarios').value;
    if( sDNI != "nulo"){
        let usuario = oGestion.buscarUsuario(sDNI);
        document.querySelector(".nombreUsuarioModificar").value = usuario.NombreAp;
        document.querySelector(".dniUsuarioModificar").value = usuario.DNI;
        document.querySelector(".edadModificar").value = usuario.Edad;
        if(usuario.Sexo==true){
            document.getElementById('radioSexoHombre').checked = true;
        }else {
            document.getElementById('radioSexoMujer').checked = true;
        }
        if(usuario.EsInstructor==true){
            document.getElementById("checkInstructorModificar").checked = true;
        }else {
            document.getElementById("checkInstructorModificar").checked = false;
        }
        
    }else {
        alert("Seleccione un usuario");
        frmModificarUsuario.reset();
    }
}

//Cargar los usuarios desde el XML
function cargarUsuarios() {
    var oUsuarios = oXML.getElementsByTagName("usuario");
    for(let oUsu of oUsuarios){
        let sNombreUsuario = oUsu.getElementsByTagName("nombre")[0].textContent;
        let sDNI = oUsu.getElementsByTagName("dni")[0].textContent;
        let iEdad = oUsu.getElementsByTagName("edad")[0].textContent;
        let bSexo = oUsu.getElementsByTagName("sexo")[0].textContent;
        let bInstructor = oUsu.getElementsByTagName("instructor")[0].textContent;
        if(bSexo=="Masculino"){
            bSexo=true;
        }else {
            bSexo=false
        }
        if(bInstructor=="Si"){
            bInstructor=true
        }else {
            bInstructor=false;
        }
        oGestion.altaUsuario(new Usuario(sNombreUsuario,sDNI,iEdad,bSexo,bInstructor)); 
    }
}

//Oculta todos los formularios
function ocultarTodosFormularios() {
    let oFormularios = document.querySelectorAll("form");
    for(let oFor of oFormularios){
        oFor.style.display = "none";
    }
}

//Crea el combo de pistas para alquilarlas 
function cargarComboPistas() {
    let oCapa = document.getElementById("comboPistas");
    while(oCapa.hasChildNodes()){
        oCapa.removeChild(oCapa.firstChild);
    }
    oCapa.appendChild(document.createElement("OPTION"))
    oCapa.lastChild.value = "nulo";
    oCapa.lastChild.textContent = "Selecciona una clase..."
    for (oPista of oGestion.aPistas){
        oCapa.appendChild(document.createElement("OPTION"));
        oCapa.lastChild.value = oPista.id;
        oCapa.lastChild.textContent = oPista.nombre;
    }
    
}

//Carga las clase desde el XML
function cargarClases(){
    var oClases = oXML.getElementsByTagName("clase");
    for(oCla of oClases){
        let iIDClase = oCla.getElementsByTagName("iIdClase")[0].textContent;
        let sNombre = oCla.getElementsByTagName("sNombre")[0].textContent;
        let sDescripcion = oCla.getElementsByTagName("sDescripcion")[0].textContent;
        let dtInicio = new Date(oCla.getElementsByTagName("dtInicio")[0].textContent);
        let dtFin = new Date(oCla.getElementsByTagName("dtFin")[0].textContent);
        let iCapacidad = parseInt(oCla.getElementsByTagName("iCapacidad")[0].textContent);
        let sTipoActividad = oCla.getElementsByTagName("sTipoActividad")[0].textContent;
        let siIdInstructor = oCla.getElementsByTagName("siIdInstructor")[0].textContent;

        oGestion.altaClase(new Clase(iIDClase,sNombre,sDescripcion,dtInicio,dtFin,iCapacidad,sTipoActividad,siIdInstructor));
    }
}

//Crea el combo de clases para apuntarse a ellas
function cargarComboClases(){
    let oCapa = frmApuntarClase.comboClasesApuntarseClase;
    while(oCapa.hasChildNodes()){
        oCapa.removeChild(oCapa.firstChild);
    }
    oCapa.appendChild(document.createElement("OPTION"))
    oCapa.lastChild.value = "nulo";
    oCapa.lastChild.textContent = "Selecciona una clase...";
    for(let clase of oGestion.aClases){
        oCapa.appendChild(document.createElement("OPTION"));
        oCapa.lastChild.value = clase.ID;
        oCapa.lastChild.textContent = clase.Nombre+" "+clase.Inicio.toLocaleDateString("es-ES")+" "+clase.Inicio.getHours()+"H";
    }
}

//Funcion para cargar los XML
function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
	  {
	  xhttp=new XMLHttpRequest();
	  }
	else // code for IE5 and IE6
	  {
	  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xhttp.open("GET",filename,false);
	
	xhttp.send();
	
	return xhttp.responseXML;
} 


function fechaHoy(){return new Date(Date.now())};