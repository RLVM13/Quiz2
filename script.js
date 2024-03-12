
let index = 0; //contador global de preguntas
let player; //nombre del jugador

const objeto = [
    {
        id: 0,
        question: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correct: "",
    },
    {
        id: 1,
        question: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correct: "",
    },
    {
        id: 2,
        question: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correct: "",
    },
    {
        id: 3,
        question: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correct: "",
    },
    {
        id: 4,
        question: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correct: "",
    },
    {
        id: 5,
        question: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correct: "",
    },
    {
        id: 6,
        question: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correct: "",
    },
    {
        id: 7,
        question: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correct: "",
    },
    {
        id: 8,
        question: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correct: "",
    },
    {
        id: 9,
        question: "",
        answer0: "",
        answer1: "",
        answer2: "",
        answer3: "",
        correct: "",
    },
]

const respuestasUsuario=[
    {
        id:0,
        respuesta0:
        

    },
]

//ESCRIBIMOS LAS PREGUNTAS MODIFICANDO EL DOM
async function ConsultarApi() {
    await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
        .then((res) => res.json()) // Tranforma datos a JSON para tratar en JS {}
        .then((data) => {
            for (let i = 0; i < 10; i++) {
                let pregunta = data.results[i].question;
                let respuestas = data.results[i].incorrect_answers;
                let correcta = data.results[i].correct_answer;

                //sumamos la pregunta correcta al array de preguntas incorrectas
                respuestas.push(correcta);

                //CREAMOS FUNCION PARA ESCRIBIR LAS RESPUESTAS EN DISTINTO ORDEN Y LO PONGA EN EL DOM
                let ArrayRespuestasAleatorias = ColocarAleatoria(respuestas);

                objeto[i].question = pregunta;
                objeto[i].answer0 = ArrayRespuestasAleatorias[0];
                objeto[i].answer1 = ArrayRespuestasAleatorias[1];
                objeto[i].answer2 = ArrayRespuestasAleatorias[2];
                objeto[i].answer3 = ArrayRespuestasAleatorias[3];
                objeto[i].correct = correcta;
                //console.log(objeto);
            }
            PintarPregunta(objeto, 0);
            PintarRespuestas(objeto, 0);

        });
    return;
}

//FUNCION PARA ESCRIBIR LAS PREGUNTAS ALEATORIAS Y NO SALGAN EN EL MISMO ORDEN
function ColocarAleatoria(array) {
    for (let i = array.length - 1; i > 0; i--) { //SE REALIZAN 2 CAMBIOS ALEATORIOS
        const j = Math.floor(Math.random() * (i - 0 + 1) + 0);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function PintarPregunta(objeto, indice) {
    let datos = "<div>";
    datos = `<h3>Question ` + (indice + 1) + " - " + `${objeto[indice].question}</h3></div>`;
    document.getElementById("padre").innerHTML = datos;
    return;
}

function PintarRespuestas(objeto, indice) {
    let datos2 = "<div>";
    datos2 += `<input type="radio" id="r${indice}-0" name="r${indice}" value="${objeto[indice].answer0}"/>${objeto[indice].answer0}<br>
               <input type="radio" id="r${indice}-1" name="r${indice}" value="${objeto[indice].answer1}"/>${objeto[indice].answer1}<br>
               <input type="radio" id="r${indice}-2" name="r${indice}" value="${objeto[indice].answer2}"/>${objeto[indice].answer2}<br>
               <input type="radio" id="r${indice}-3" name="r${indice}" value="${objeto[indice].answer3}"/>${objeto[indice].answer3}<br></div>`;
    document.getElementById("hijos").innerHTML = datos2;

    if (indice < 10) {
        let pie = `<input type="button" value="Next Question" class="css-button-rounded--green"/>`;
        document.getElementById("botones").innerHTML = pie;

        //AL PULSAR PARA PASAR A LA SIGUIENTE PREGUNTA
        document.getElementsByClassName("css-button-rounded--green")[0].addEventListener("click", function () {
            let opcionElegida = document.querySelector(`input[type="radio"]:checked`).value;
            console.log(opcionElegida);
            index++;
            console.log(index);
            PintarPregunta(objeto, index);
            PintarRespuestas(objeto,index);
        })
    }
    else {
        let pie = `<input type="button" value="End Game" class="css-button-rounded--blue"/>`;
        document.getElementById("botones").innerHTML = pie;
    }
}

/* function guardarDatosJugador(player, question, resp, ok) {
    let veces = 0;
    const tiempo = new Date().toLocaleDateString();
    console.log(tiempo);
    //const tiempoTranscurrido = Date.now();
    //const hoy = new Date(tempoTranscurrido);
    if (veces < 10) {
 
        contestaciones[veces].jugador = player;
        contestaciones[veces].fecha = tiempo;
        contestaciones[veces].pregunta = question;
        contestaciones[veces].respuesta = resp;
        contestaciones[veces].correcta = ok;
    }
    //Escribir Local Staorage
    localStorage.setItem("quiz2", JSON.stringify(contestaciones));
    //Leer Local Storage
    var retrievedData = localStorage.getItem("quiz2");
    return;
} */

ConsultarApi();

//VALIDACION DE RESPUESTAS

