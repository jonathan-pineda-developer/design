

let canvas = document.querySelector("canvas");
let pincel = canvas.getContext("2d");
pincel.fillStyle = "grey";
pincel.fillRect(0, 0, 600, 400);
    



function dibujar(evento){
    let x = evento.pageX - canvas.offsetLeft - parseInt(getComputedStyle(canvas).paddingLeft);
    let y = evento.pageY - canvas.offsetTop; //pos y
    //obtener el input del colorpicker
    let colores = document.getElementById('colorpicker').value;
    pincel.fillStyle =  colores;
    pincel.beginPath();
    pincel.arc(x, y, 10, 0, 2 * Math.PI);
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

const resize = e => {
    let newWidth =  e.clientX - sidebar.offsetLeft;
            if(newWidth < 54)  newWidth = 54;
        sidebar.style.width = `${newWidth}px`;
};
const stopResize = e => { 
    window.removeEventListener("mousemove", resize);
    window.removeEventListener("mouseup", stopResize);
};

const initResize = () => { 
    window.addEventListener("mousemove", resize); 
    window.addEventListener( "mouseup", stopResize);
};
handle.addEventListener("mousedown", initResize);


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
