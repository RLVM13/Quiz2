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

let index = 0;

//FUNCION PARA ESCRIBIR LAS PREGUNTAS ALEATORIAS Y NO SALGAN EN EL MISMO ORDEN
function PreguntaAleatoria(array) {
  for (let i = array.length - 1; i > 0; i--) {
    //SE REALIZAN 2 CAMBIOS ALEATORIOS
    const j = Math.floor(Math.random() * (i - 0 + 1) + 0);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//ESCRIBIMOS LAS PREGUNTAS MODIFICANDO EL DOM
function TratamientoDatos() {
  fetch(
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
  )
    .then((res) => res.json()) // Tranforma datos a JSON para tratar en JS {}
    .then((data) => {
      // Pintar preguntas
      let pregunta = data.results[index].question;
      let respuestas = data.results[index].incorrect_answers;
      let correcta = data.results[index].correct_answer;

      DibujarPregunta(pregunta, index);

      if (index != 9) {
        let pie = `<input type = "text" value = "Next Question" class="css-button-rounded--green"/> `;
        document.getElementById("botones").innerHTML = pie;
      } else {
        let pie = `<input type = "submit" value = "End Game" class="css-button-rounded--blue"/> `;
        document.getElementById("botones").innerHTML = pie;
      }

      //sumamos la pregunta correcta al array de preguntas incorrectas
      respuestas.push(correcta);

      //CREAMOS FUNCION PARA ESCRIBIR LAS RESPUESTAS EN DISTINTO ORDEN Y LO PONGA EN EL DOM
      let ArrayRespuestasAleatorias = PreguntaAleatoria(respuestas);

      console.log(ArrayRespuestasAleatorias);

      DibujarRespuestas(index, correcta, ArrayRespuestasAleatorias);

      console.log(index);
    });
  return;
}

function DibujarPregunta(p, i) {
  let datos = "<div>";
  datos = `<legend>Question ` + (i + 1) + " - " + `${p}</legend></div>`;
  document.getElementById("padre").innerHTML = datos;
  index++;
}

function DibujarRespuestas(i2, c, r) {
  let datos2 = "<div>";
  datos2 += `           <div class="radios" ><input type="radio" name="${i2}" value="${c}"/>${r[0]}</div>
                        <div class="radios" ><input type="radio" name="${i2}" value="${c}"/>${r[1]}</div>
                        <div class="radios" ><input type="radio" name="${i2}" value="${c}"/>${r[2]}</div>
                         <div class="radios"><input type="radio" name="${i2}" value="${c}"/>${r[3]}</div>
  </div>`;
  document.getElementById("hijos").innerHTML = datos2;
}

TratamientoDatos();

//VALIDACION DE RESPUESTAS

/* document.querySelector("#quizForm").addEventListener("submit", function (event) {
event.preventDefault(); // paraliza envío formulario
}) */
