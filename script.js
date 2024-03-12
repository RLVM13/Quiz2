
let index = 0; //contador global de preguntas
let score = 0;
let player = "";
const partida = [{}];

//ESCRIBIMOS LAS PREGUNTAS MODIFICANDO EL DOM
async function consultarApi() {
    await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
        .then((res) => res.json()) // Tranforma datos a JSON para tratar en JS {}
        .then((data) => {
            player = prompt("Dame tu alias de jugador");
            for (let i = 0; i < 10; i++) {
                let pregunta = data.results[i].question;
                let respuestas = data.results[i].incorrect_answers;
                let correcta = data.results[i].correct_answer;

                //sumamos la pregunta correcta al array de preguntas incorrectas
                respuestas.push(correcta);

                //CREAMOS FUNCION PARA ESCRIBIR LAS RESPUESTAS EN DISTINTO ORDEN Y LO PONGA EN EL DOM
                let ArrayRespuestasAleatorias = colocarAleatoria(respuestas);
            }
            pintarPregunta(data, index);
            pintarRespuestas(data, index);
        });
    return;
}

//FUNCION PARA ESCRIBIR LAS PREGUNTAS ALEATORIAS Y NO SALGAN EN EL MISMO ORDEN
function colocarAleatoria(array) {
    for (let i = array.length - 1; i > 0; i--) { //SE REALIZAN 2 CAMBIOS ALEATORIOS
        const j = Math.floor(Math.random() * (i - 0 + 1) + 0);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function pintarPregunta(objeto, indice) {
    if (indice != 10) {
        //console.log(objeto);
        let datos = "<div>";
        datos = `<h3>Question ` + (indice + 1) + " - " + `${objeto.results[indice].question}</h3></div>`;
        document.getElementById("padre").innerHTML = datos;
    }
    else { return };
}

function pintarRespuestas(objeto, indice) {
    if (indice != 10) {
        let datos2 = "<div>";
        datos2 += `<input type="radio" id="r${indice}-0" name="r${indice}" value="${objeto.results[indice].incorrect_answers[0]}"/>${objeto.results[indice].incorrect_answers[0]}<br>
               <input type="radio" id="r${indice}-1" name="r${indice}" value="${objeto.results[indice].incorrect_answers[1]}"/>${objeto.results[indice].incorrect_answers[1]}<br>
               <input type="radio" id="r${indice}-2" name="r${indice}" value="${objeto.results[indice].incorrect_answers[2]}"/>${objeto.results[indice].incorrect_answers[2]}<br>
               <input type="radio" id="r${indice}-3" name="r${indice}" value="${objeto.results[indice].incorrect_answers[3]}"/>${objeto.results[indice].incorrect_answers[3]}<br></div>`;
        document.getElementById("hijos").innerHTML = datos2;
        let pie = `<input type="button" value="Next Question" class="css-button-rounded--green"/>`;
        document.getElementById("botones").innerHTML = pie;

        //AL PULSAR PARA PASAR A LA SIGUIENTE PREGUNTA
        document.getElementsByClassName("css-button-rounded--green")[0].addEventListener("click", function () {
            let opcionElegida = document.querySelector(`input[type="radio"]:checked`).value;
            if (opcionElegida == "") {
                alert("Contesta la pregunta para pasar a la siguiente");
            }
            else {
                //VALIDACION DE RESPUESTAS
                if (opcionElegida == objeto.results[indice].correct_answer) { score++; }

                const jugada = {};
                //ALMACENAR RESPUESTAS DE LA PARTIDA
                const tiempo = new Date().toLocaleDateString();
                jugada.id = index;
                jugada.player = player;
                jugada.fecha = tiempo;
                jugada.question = objeto.results[indice].question;
                jugada.answer = opcionElegida;
                jugada.correct = objeto.results[indice].correct_answer;
                jugada.score = score;
                partida.push(jugada);
                index++;
                console.log(partida);
                localStorage.setItem("quiz2", JSON.stringify(partida));
                //guardarPartida(jugada);
                pintarPregunta(objeto, index);
                pintarRespuestas(objeto, index);
            }
        })
    }
    else {
        
        let pie = `<input type="button" value="Play Again" class="css-button-rounded--green2"/>`;
        pie += `<input type="button" value="End Game" class="css-button-rounded--blue"/>`;
        document.getElementById("botones").innerHTML = pie;
        return;
    }
}

function guardarPartida(partida) {
    console.log(partida);
    //Escribir LocalStorage
    //if (index != 10) {
    jugada.push(partida)
    console.log(jugada);
    localStorage.setItem("quiz2", JSON.stringify(jugada));
}
//else {

// }
//localStorage.setItem("quiz2", JSON.stringify(jugada));
//Leer LocalStorage
//let retrievedData = localStorage.getItem("quiz2");

//Resuperar de LocalStorage al final del juego
//let masDatos = JSON.parse(localStorage.getItem("quiz2"));
//Añadir elementos a un objeto que ya está creado en LocalStorage
//masDatos.push(datosJugador);
//localStorage.setItem("jugada", JSON.stringify("quiz2"));
//}

consultarApi();



