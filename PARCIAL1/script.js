import {SuperHeroe} from "./superheroe.js";
import {crearTabla} from "./tabla.js";
import {actualizarTabla} from "./tabla.js";
import{armas} from "./cargarArmas.js";
localStorage.setItem('armas', JSON.stringify(armas));
import{superHeroes} from "./listaSuperheroes.js";
localStorage.setItem('superHeroes', JSON.stringify(superHeroes));


const tabla = document.getElementById('TABLA');
const formulario = document.getElementById('formulario');
const btnAgregar = document.getElementById('btn-agregar');
const btnModificar = document.getElementById('btn-modificar');
const btnEliminar = document.getElementById('btn-eliminar');
const btnCancelar = document.getElementById('btn-cancelar');
let identificador = false;
let listaSuperHeroes = JSON.parse(localStorage.getItem('superHeroes')) || [];
tabla.appendChild(crearTabla(listaSuperHeroes));
btnModificar.style.display = 'none';
btnEliminar.style.display = 'none';
let id = 0;

document.addEventListener('DOMContentLoaded', function() {
    const armas = JSON.parse(localStorage.getItem('armas'));
  
    armas.forEach((x) => {
      const opcion = document.createElement('option');
      opcion.value = x;
      opcion.text = x;
      document.getElementById('txt-arma').appendChild(opcion);
    });
  });

window.addEventListener('DOMContentLoaded', function() {
    btnAgregar.addEventListener('click', guardarHeroe);
    btnCancelar.addEventListener('click', cancelar);
    btnEliminar.addEventListener('click', eliminarSuperHeroe);
    btnModificar.addEventListener('click', modificarSuperHeroe);
    });

    function guardarHeroe(event)
    {
      event.preventDefault();
      let id = generarId();
      let nombre = document.getElementById('txt-nombre').value;
      let alias = document.getElementById('txt-alias').value;
      let fuerza = parseInt(document.getElementById('txt-fuerza').value);
      let editoriales = document.getElementsByName('txt-editorial');
      let editorial = false;
    
      editoriales.forEach(element => 
      {
        if(element.checked) 
        {
          editorial= element.value;
        }
      });

      let arma = document.getElementById('txt-arma').value;
    
        const superHeroe = new SuperHeroe(id,nombre,alias, editorial,fuerza,arma);
        if(validarSuperHeroe(superHeroe)==true) {
    
          listaSuperHeroes.push(superHeroe);
          actualizarTabla(tabla, listaSuperHeroes);
    
        }else{
    
          alert("Falta llenar algun campo");
    
        }
    }
    function validarSuperHeroe(anuncio)
    {
        if( 
            anuncio.nombre == "" ||
            anuncio.Alias == "" || 
            anuncio.Editorial == "" ||
            anuncio.Fuerza == "" ||
            anuncio.Arma =="") return false;
    
        return true;
    }


    function modificarSuperHeroe(event) {

        event.preventDefault();
        let id = generarId();
        let nombre = document.getElementById('txt-nombre').value;
        let alias = document.getElementById('txt-alias').value;
        let fuerza = parseInt(document.getElementById('txt-fuerza').value);
        let editoriales = document.getElementsByName('txt-editorial');
        let editorial = false;
    
        editoriales.forEach(element => 
        {
        if(element.checked) 
        {
            editorial= element.value;
        }
        });

        let arma = document.getElementById('txt-arma').value;

        const superHeroe = new SuperHeroe(id, nombre,alias, editorial,fuerza,arma);
        if(validarSuperHeroe(superHeroe)==true) {

            listaSuperHeroes.forEach(x =>{

                if(x.id == identificador)
                {
        
                x.id = superHeroe.id;
                x.Nombre = superHeroe.Nombre;
                x.Alias = superHeroe.Alias;
                x.Editorial = superHeroe.Editorial;
                x.Fuerza = superHeroe.Fuerza;
                x.Arma = superHeroe.Arma;
                }
            });    
        
            actualizarTabla(tabla, listaSuperHeroes);
        
            }else{
        
            alert("Falta llenar algun campo");
        
        }
    }

    function cancelar()
  {
    formulario.reset();
  }

  function eliminarSuperHeroe(event)
  {
    event.preventDefault();
    listaSuperHeroes.forEach(x =>{
      if(x.id == identificador)
      {
        x.id = -10;
      }
     });
     actualizarTabla(tabla, listaSuperHeroes);
  }

  window.addEventListener("click", (e) => 
  {
      if(e.target.matches("td"))
      {
          const iden = e.target.parentElement.dataset.id;
          const superHeroe = listaSuperHeroes.find((x) => x.id == iden);
          identificador = iden;

          document.getElementById('txt-nombre').value = superHeroe.Nombre;
          if(superHeroe.Editorial == "DC")
          {
              document.getElementById('DCID').checked = true;
          }else
          {
              document.getElementById('MarvelID').checked = true;
          }
          document.getElementById('txt-alias').value = superHeroe.Alias ;
          document.getElementById('txt-fuerza').value = superHeroe.Fuerza;
          document.getElementById('txt-arma').value = superHeroe.Arma;
      }
  
      btnModificar.style.display = 'block';
     btnEliminar.style.display = 'block'; 
  });

  function generarId()
{
    let id;
    for(var i = 0; i < listaSuperHeroes.length; i++)
    {
        if(i == (listaSuperHeroes.length - 1))
        {
            id = listaSuperHeroes[i].id;
        }
    }
    return id + 1;
}
