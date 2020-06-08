function Seguro(marca, anio,tipo)
{
   this.marca = marca;
   this.anio = anio;
   this.tipo = tipo; 
}

Seguro.prototype.cotizarSeguro = function()
{
    /*
    1 = toyota 1.20
    2 = chevrolet 1.30
    3 = mazda  1.35
    */
    let  cantidad ; 
    const preciobase = 20000;

    switch(this.marca)
    {
        case '1' :
            cantidad = preciobase *1.20;
            break;
        case '2':
            cantidad = preciobase * 1.30;
            break;
        case '3':
            cantidad = preciobase* 1.35; 
            break;
    }

    //leer año 
    const diferencia = new Date().getFullYear() - this.anio;
    //cada año de dif hay que reducir el valor 5% el valor del seguro
    cantidad-=((diferencia*5)*cantidad)/100;

    /* 
        si el seguro es basico se multoplica por 20% mas
        si el seguro es completo se multiplica un 35% mas
       
    */

    if(this.tipo ==='basico')
    {
        cantidad*=1.20;

    }
    else {
        cantidad*=1.35;
    }

   return cantidad;
}

function Interface(){

}

Interface.prototype.mostrarResultado = function(seguro , total)
{
    const resultado = document.getElementById('resultado');
    let marca ;
    switch(seguro.marca){
        case '1':
            marca = 'Toyota';
            break;
        case '2':
              marca = 'Chevrolet';
              break;
        case '3':
              marca = 'Mazda';
              break;
    }
    /*alerte en div
    //crear div
    const div = document.createElement('div');
    //agreagr info
    div.innerHTML =`
        Tu Resumen :
        Marca ${seguro.marca}
        Año : ${marca}
        Tipo : ${seguro.tipo}
        Total : ${total}
    `;
    resultado.appendChild(div);
    */
    //alerta en alertify
    const spiiner = document.querySelector('#cargando img');
    spiiner.style.display = 'block';
    setTimeout(function(){
        spiiner.style.display = 'none';
        alertify.alert('<h2 style="color:#F4511E"> Tu Resumen</h2>', `Marca ${marca}  <br>Año : ${seguro.anio} <br>Tipo : ${seguro.tipo}<br>Total : ${total}`, function(){  });
    }, 3000);
   
}

const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit',function(e){
    e.preventDefault();
    //LEER marca del select 
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    //leer fecha seleccionada
    const anio = document.getElementById('anio');
    const anioSeleccionados = anio.options[anio.selectedIndex].value;
    //leer valor de radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    const interfaz = new Interface();

    //revisar campos vacios
    if(marcaSeleccionada === ''|| anioSeleccionados === ''|| tipo === '')
    {
        interfaz.mostrar
        alertify.set('notifier','position', 'bottom-right');
        alertify.error('Faltan campos por completar ');
    }
    else{
        //cotizar seguro
        const seguro = new Seguro(marcaSeleccionada,anioSeleccionados,tipo);
        const cantidad = seguro.cotizarSeguro(seguro);
        //mostar el resultado
        interfaz.mostrarResultado(seguro,cantidad);
        alertify.set('notifier','delay', 2);
        alertify.success("Cotizando seguro....");
    }
  
});

//variables fecha max y fecha min dia actual menos 20
const max = new Date().getFullYear(),
min = max -20 ;
//variable selectAños
const selectAnios = document.getElementById('anio');

for (let i = max; i > min; i-- ){

    
    let option = document.createElement('option');
    option.value =  i ;
    option.innerHTML = i;
    selectAnios.appendChild(option);
    
} 