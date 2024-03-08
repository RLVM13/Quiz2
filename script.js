
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
function DibujarPreguntas() {
    fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
        .then((res) => res.json()) // Tranforma datos a JSON para tratar en JS {}
        .then(data => {   // Pintar preguntas
            for (let i = 0; i < data.results.length; i++) {
                let pregunta = data.results[i].question;
                let respuestas = data.results[i].incorrect_answers;
                let correcta = data.results[i].correct_answer;
                //sumamos la pregunta correcta al array de preguntas incorrectas
                respuestas.push(correcta);

                /* console.log(data.results[i].question);
                console.log(data.results[i].incorrect_answers);
                console.log(data.results[i].correct_answer);
                console.log(respuestas); */

                let datos = `<b>${pregunta}></b>`
                document.querySelector("legend").innerHTML = datos;

                //CREAMOS FUNCION PARA ESCRIBIR LAS RESPUESTAS EN DISTINTO ORDEN Y LO PONGA EN EL DOM
                let ArrayRespuestasAleatorias=PreguntaAleatoria(respuestas);

                let questions=`<input type="radio" id="${i}" name="${i}" value="${correcta}"/>${ArrayRespuestasAleatorias[0]}`;
            }
        })


    return;
}

DibujarPreguntas();

//METODO PRIMER QUIZ
/* for (let i = 0; i < preguntas.length; i++) {
    trivial += `<article>
                <h3>Pregunta: `+ (i + 1) + " - " + `${preguntas[i].pregunta}</h3>
                <img src="${preguntas[i].imagen}" width="500" height="300"><br>
                <label for="${preguntas[i].id}"></label>
                <div><h4>
                <input type="radio" id="${preguntas[i].r1}" name="${preguntas[i].id}" value="r1"/>${preguntas[i].r1}<br>
                <input type="radio" id="${preguntas[i].r2}" name="${preguntas[i].id}" value="r2"/>${preguntas[i].r2}<br>
                <input type="radio" id="${preguntas[i].r3}" name="${preguntas[i].id}" value="r3"/>${preguntas[i].r3}<br>
                <input type="radio" id="${preguntas[i].r4}" name="${preguntas[i].id}" value="r4"/>${preguntas[i].r4}</h4></div><br>
              </article>`
}
trivial += `<input type="submit" value="Enviar Respuestas"/>`;
trivial += "</div>";

document.getElementById("quizForm").innerHTML = trivial; */




//VALIDACION DE RESPUESTAS