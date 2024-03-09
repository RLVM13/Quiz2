
/*let a = ['Java Vendor Machine', 'Java Visual Machine', 'Just Virtual Machine', 'Java Virtual Machine'];
 function PreguntaAleatoria(array) {
    let resp = [];
    let contador=6;
    for (let j = 4; j > 0; j--) {
        let n = Math.floor(Math.random() * (j - 0 + 1) + 0);
        contador-=n;
        resp.push(array[n]);
        console.log(n);
        console.log(contador);
        console.log(resp);
    }
    resp.push(array[contador]);
} */
//PreguntaAleatoria(a);

//FUNCION PARA ESCRIBIR LAS PREGUNTAS ALEATORIAS Y NO SALGAN EN EL MISMO ORDEN
function PreguntaAleatoria(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//ESCRIBIMOS LAS PREGUNTAS MODIFICANDO EL DOM
async function DibujarPreguntas() {
    await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
        .then((res) => res.json()) // Tranforma datos a JSON para tratar en JS {}
        .then(data => {   // Pintar preguntas
            for (let i = 0; i < data.results.length; i++) {
                let pregunta = data.results[i].question;
                let respuestas = data.results[i].incorrect_answers;
                let correcta = data.results[i].correct_answer;
                let arrayUsuario
                //sumamos la pregunta correcta al array de preguntas incorrectas
                respuestas.push(correcta);

                /* console.log(data.results[i].question);
                console.log(data.results[i].incorrect_answers);
                console.log(data.results[i].correct_answer);
                console.log(respuestas); */

                //CREAMOS FUNCION PARA ESCRIBIR LAS RESPUESTAS EN DISTINTO ORDEN Y LO PONGA EN EL DOM
                let ArrayRespuestasAleatorias = PreguntaAleatoria(respuestas);
                console.log(ArrayRespuestasAleatorias);

                let datos = "<div>";
                datos = `<h3>Question ` + (i + 1) + " - " + `${pregunta}</h3></div>`
                document.getElementById("padre").innerHTML = datos;

                let datos2 = "<div>";
                datos2 += `<input type="radio" id="${i}" name="${i}" value="${correcta}"/>${ArrayRespuestasAleatorias[0]}<br>
                            <input type="radio" id="${i}" name="${i}" value="${correcta}"/>${ArrayRespuestasAleatorias[1]}<br>
                            <input type="radio" id="${i}" name="${i}" value="${correcta}"/>${ArrayRespuestasAleatorias[2]}<br>
                            <input type="radio" id="${i}" name="${i}" value="${correcta}"/>${ArrayRespuestasAleatorias[3]}<br></div>`
                document.getElementById("hijos").innerHTML = datos2;

                if (i != 9) {
                    let pie = `<input type = "text" value = "Next Question" class="css-button-rounded--green"/> `;
                    document.getElementById("botones").innerHTML = pie;
                }
                else {
                    let pie = `<input type = "submit" value = "End Game" class="css-button-rounded--blue"/> `;
                    document.getElementById("botones").innerHTML = pie;
                }
            }
            //document.getElementById("hijos").innerHTML = questions;


        })
    return;
}

DibujarPreguntas();


//VALIDACION DE RESPUESTAS

    /* document.querySelector("#quizForm").addEventListener("submit", function (event) {
    event.preventDefault(); // paraliza envío formulario
}) */