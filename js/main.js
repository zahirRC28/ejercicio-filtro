document.addEventListener("DOMContentLoaded", () => {

/*Variables */
const botones = document.querySelector('#botones');
const principalD = document.querySelector('.principal');
const relacionados = document.querySelector('.relacionados')
const contaText = document.querySelector('.botones div#contador p')
const imagenes = document.querySelector('.relacionados div');
const conta = document.querySelector('span.contador');
const tagSpan = document.querySelector('span.tag');
const urlBase = 'assets/img/';
const fragment = document.createDocumentFragment();

const arrayViajes = [
    {  
        id: 1,
        src: `${urlBase}viajes-1.jpg`,
        alt: 'imagen de viaje 1',
        titulo: 'Titulo de viaje 1',
        tags: ['mar', 'arena', 'palmera','agua']
    },
    {  
        id: 2,
        src: `${urlBase}viajes-2.jpg`,
        alt: 'imagen de viaje 2',
        titulo: 'Titulo de viaje 2',
        tags: ['mar', 'cabaña', 'flotante','agua','estructura']
    },
    {  
        id: 3,
        src: `${urlBase}viajes-3.jpg`,
        alt: 'imagen de viaje 3',
        titulo: 'Titulo de viaje 3',
        tags: ['cielo', 'flechas']
    },
    {  
        id: 4,
        src: `${urlBase}viajes-4.jpg`,
        alt: 'imagen de viaje 4',
        titulo: 'Titulo de viaje 4',
        tags: ['estructura', 'agua','puente','cielo']
    },
    {  
        id: 5,
        src: `${urlBase}viajes-5.jpg`,
        alt: 'imagen de viaje 5',
        titulo: 'Titulo de viaje 5',
        tags: ['puente', 'estructura', 'agua']
    },
    {  
        id: 6,
        src: `${urlBase}viajes-6.jpg`,
        alt: 'imagen de viaje 6',
        titulo: 'Titulo de viaje 6',
        tags: ['mar', 'montaña']
    },
    {  
        id: 7,
        src: `${urlBase}viajes-7.jpg`,
        alt: 'imagen de viaje 7',
        titulo: 'Titulo de viaje 7',
        tags: ['montaña', 'estructura']
    },
];

const arraybotonesProvi = ['mar','cabaña', 'flotante','agua','estructura','arena', 'palmera','cielo', 'flechas','puente','montaña']

/*Eventos */
document.addEventListener('click', (event) =>{
    
    if(event.target.matches('#botones button')){
        mostrar();
        const tag = event.target.id;
        pintarImagenes(tag);
    }
    if(event.target.matches('.relacionados div article img')){
        const imagen = event.target;
        cambiarImagenes(imagen);
    }
    
});

/*Funciones */
const pintarBotones = () => {
    const arrayBotones = conseguirBontones();
    arrayBotones.forEach(element => {
        const btn = document.createElement('button');
        btn.id = element;
        btn.textContent = element;
        fragment.append(btn)
    });
    botones.append(fragment);
}

const filtarImagenes = (tag) => {
    //COMO LO ESTOY HACIENDO SIN FILTER
    // let filtrado = [];
    // arrayViajes.forEach(va => {
    //     va.tags.forEach(element => {
    //     if (element === tag) {
    //         filtrado.push(va);
    //     }
    //     });
    // });
    //CON FILTER
    //console.log(tag);
    
    const filtrado = arrayViajes.filter((va) => 
        // console.log(va.tags ,'array tags')
        // console.log(va.tags.includes(tag));
       va.tags.includes(tag)
    );
    //console.log(filtrado);
    return filtrado;
};
const pintarImagenes = (tag) => {
    borrar(imagenes);
    const arrayFiltrado = filtarImagenes(tag);
    const primerId = arrayFiltrado[0].id;
    pintarPrincipal(arrayFiltrado[0]);
    //console.log(arrayFiltrado,'en pintar')
    arrayFiltrado.forEach(element => {
        if (element.id !== primerId){
        const art = document.createElement('article');
        const titulo = document.createElement('h3');
        const ima = document.createElement('img');
        titulo.textContent = element.titulo;
        ima.id = element.id;
        ima.src = element.src;
        ima.alt = element.alt;
        art.append(titulo);
        art.append(ima);
        fragment.append(art);
        } 
    });
    conta.textContent = arrayFiltrado.length;
    tagSpan.textContent = tag;
    imagenes.append(fragment);

}
const pintarPrincipal = (array) => {
    // Limpiar la zona principal
    borrar(principalD);

    const titulo = document.createElement('h3');
    const ima = document.createElement('img');
    const divi = document.createElement('div');
    titulo.textContent = array.titulo;
    ima.src = array.src;
    ima.alt = array.alt;
    ima.id = array.id;
    divi.append(titulo);
    divi.append(ima);
    principalD.append(divi);
}

const borrar = (valor) =>{
    valor.innerHTML = "";
}
const cambiarImagenes = (imagen) => {
    const imgPrincipal = document.querySelector('.principal img');
    
    const prinpSrc = imgPrincipal.src;
    const prinAlt = imgPrincipal.alt;
    imgPrincipal.src = imagen.src;
    imgPrincipal.alt = imagen.alt;
    imagen.src = prinpSrc;
    imagen.alt = prinAlt;

    const tituloPrincipal = document.querySelector('.principal h3');
    // parentElement sirve para poder pillar el elemento padre de donde estas(en mi caso el padre de imagen es article);
    const tituloRela = imagen.parentElement.querySelector('h3');
    const tituloPrin = tituloPrincipal.textContent;
    tituloPrincipal.textContent = tituloRela.textContent;
    tituloRela.textContent = tituloPrin;

}
const conseguirBontones = () => {
    const caja = [];
    arrayViajes.forEach(obj => {
        obj.tags.forEach(tag => {
            caja.push(tag)
        });
    });
    //con el new set no permite duplicados y con el ... creamos el nuevo array;
    const filtrado = [...new Set(caja)];
    //console.log(filtrado);
    return filtrado;
}

const mostrar = () =>{
    principalD.style.visibility = 'visible'
    relacionados.style.visibility = 'visible'
    contaText.style.visibility = 'visible'
}

/*Invocaciones */
pintarBotones(); 
});