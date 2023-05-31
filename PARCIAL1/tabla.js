export const crearTabla = (data) => {
    if(!Array.isArray(data)) return null;
    cargarSpinner();
    const tabla = document.createElement('tabla');
    tabla.appendChild(CrearCabecera());
    tabla.appendChild(CrearCuerpo(data));

    return tabla;
}

function cargarSpinner()
{
    const div = document.getElementById('spinner');
    const tabla = document.getElementById('TABLA');
    tabla.style.display = 'none';
    div.style.display = 'block';

    setTimeout(()=>{ 
        div.style.display = 'none';
        tabla.style.display = 'block';
    },2000);
}

const CrearCabecera = () => {
    const thead = document.createElement("thead"),
    headrow= document.createElement("tr");
    
    const thid= document.createElement("th");
    const thNombre= document.createElement("th");
    const thAlias= document.createElement("th");
    const thEditorial= document.createElement("th");
    const thFuerza=   document.createElement("th");
    const thArma= document.createElement("th");

    thid.textContent = "ID";
    thNombre.textContent = "nombre";
    thAlias.textContent = "Alias ";
    thEditorial.textContent = "Editorial ";
    thFuerza.textContent = "Fuerza ";
    thArma.textContent = "Arma ";
    

    headrow.appendChild(thid);
    headrow.appendChild(thNombre);
    headrow.appendChild(thAlias);
    headrow.appendChild(thEditorial);
    headrow.appendChild(thFuerza);
    headrow.appendChild(thArma);
    thead.appendChild(headrow);
    return thead;
};

const CrearCuerpo= (data) => {
    const tbody = document.createElement("tbody");

    data.forEach(element => {
        if(element.id != -10){
            const tr= document.createElement("tr");
            for(const key in element) {
                if(key ==="id"){
                    tr.dataset.id=element[key];
                }
                const td= document.createElement("td");
                td.textContent = element[key];
            
                tr.appendChild(td);

            }
            tbody.appendChild(tr);
        }
    });
    return tbody;
}


export const actualizarTabla= (contenedor, data) => {
    while(contenedor.hasChildNodes()) {
      contenedor.removeChild(contenedor.lastChild);
    }
    contenedor.appendChild(crearTabla(data));
  }