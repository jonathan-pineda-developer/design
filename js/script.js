

let canvas = document.querySelector("canvas");
let canvasId = document.getElementById("canvas");
let pincel = canvas.getContext("2d");
pincel.fillStyle = "grey";
pincel.fillRect(50, 50, 900, 400);
    



function dibujar(evento){
    let x = evento.pageX - canvas.offsetLeft - parseInt(getComputedStyle(canvas).paddingLeft);
    let y = evento.pageY - canvas.offsetTop; //pos y
    //obtener el input del colorpicker
    let colores = document.getElementById('colorpicker').value;
    pincel.fillStyle =  colores;
    pincel.beginPath();
    //define el tamaño del circulo
    pincel.arc(x, y, 5, 0, 2 * Math.PI);
    pincel.fill();
    console.log(x + " " + y);
}

//detener el dibujo cuando se haga doble ckick
function detener(evento){
    canvas.onmousemove = null;
}

function lapiz(evento){
    canvas.onmousemove = dibujar;
}

canvas.onclick = dibujar;
canvas.onmousedown = lapiz;
canvas.onmouseup = detener;


//sidebar del menu
const sidebar = document.getElementById("sidebar"),
handle = document.getElementById("handle");

//manejo de tamaño de barra handle -
const resize = e => {
    let newWidth =  e.clientX - sidebar.offsetLeft;
            if(newWidth < 54)  newWidth = 54;
        sidebar.style.width = `${newWidth}px`;
        canvas.style.paddingLeft = `${newWidth + 6}px`; // Ajusta el padding-left del canvas
        document.querySelector('.btn-popup').style.paddingLeft = `${newWidth + 6}px`; // Ajusta el padding-left de .btn-popup
        //document.querySelector('.color').style.paddingLeft = `${newWidth + 6}px`; // Ajusta el padding-left de .color
};
//detener el resize
const stopResize = e => { 
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
};
//manejo de tamaño de barra handle +
const initResize = () => { 
    window.addEventListener("mousemove", resize); 
    window.addEventListener( "mouseup", stopResize);
};
handle.addEventListener("mousedown", initResize);


//popup de prueba
function togglePopup() {
  var popup = document.getElementById("popup");
  popup.style.display = (popup.style.display === "none") ? "block" : "none";
}

//boton de refresh
const refresh = document.getElementById("refresh");
refresh.addEventListener("click", function(){
    location.reload();
}
);


//configuracion de subir imagen
const imageUpload = document.getElementById('imageUpload');
const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener('click', function() {
    imageUpload.click(); // Activa el evento del input de tipo file
  });
  
imageUpload.addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  //subo la imagen al canvas
  reader.onload = function(event) {
    const image = new Image();
    image.src = event.target.result;
    
    
    image.onload = function() {
        canvasId.width = image.width;// Ajusta el ancho del canvas al ancho de la imagen
        canvasId.height = image.height;// Ajusta la altura del canvas a la altura de la imagen
        pincel.drawImage(image, 0, 0); // Dibuja la imagen en las coordenadas (0, 0) del canvas
      };
  };

  reader.readAsDataURL(file);
});


//configuracion de descarga de imagen
const download = document.getElementById("downloadButton");
download.addEventListener("click", function(){
    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL()
    link.click();
    link.delete;
} 
);

/*const downloadButton = document.getElementById('downloadButton');

downloadButton.addEventListener('click', function() {
  const canvas = document.getElementById('canvas');
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'imagen_editada.png';
  link.click();
});
 */

//oculatar el color picker
const palette = document.getElementById('palette');
palette.addEventListener('click', function() {
    const color = document.getElementById('colorpicker');
    color.click();
  });