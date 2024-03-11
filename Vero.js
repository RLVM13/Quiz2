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
  async function DibujarPreguntas() {
    await fetch(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
    )
      .then((res) => res.json()) // Tranforma datos a JSON para tratar en JS {}
      .then((data) => {
        // Pintar preguntas
        let index = 0;
        for (let i = 0; i < data.results.length; i++) {
          let pregunta = data.results[i].question;
          let respuestas = data.results[i].incorrect_answers;
          let correcta = data.results[i].correct_answer;
          //sumamos la pregunta correcta al array de preguntas incorrectas
          respuestas.push(correcta);
          //CREAMOS FUNCION PARA ESCRIBIR LAS RESPUESTAS EN DISTINTO ORDEN Y LO PONGA EN EL DOM
          let ArrayRespuestasAleatorias = PreguntaAleatoria(respuestas);
          console.log(ArrayRespuestasAleatorias);
          let datos = "<div>";
          datos = `<h3>Question ` + (i + 1) + " - " + `${pregunta}</h3></div>`;
          document.getElementById("padre").innerHTML = datos;
          let datos2 = "<div>";
          datos2 += `<input type="radio" id="${i}" name="${i}" value="${i}"/>${ArrayRespuestasAleatorias[0]}<br>
                              <input type="radio" id="${i}" name="${i}" value="${i}"/>${ArrayRespuestasAleatorias[1]}<br>
                              <input type="radio" id="${i}" name="${i}" value="${i}"/>${ArrayRespuestasAleatorias[2]}<br>
                              <input type="radio" id="${i}" name="${i}" value="${i}"/>${ArrayRespuestasAleatorias[3]}<br></div>`;
          document.getElementById("hijos").innerHTML = datos2;
          index++;
          console.log(index);
          if (index <= 9) {
            let pie = `<input type="button" value="Next Question" class="css-button-rounded--green"/>`;
            let boton = document.createElement("button");
            boton.innerHTML = pie;
            boton.addEventListener("click", pasarAPreguntaSiguiente);
            document.getElementById("botones").appendChild(boton);
          } else {
            let pie = `<input type="button" value="End Game" class="css-button-rounded--blue"/>`;
            let boton = document.createElement("button");
            boton.innerHTML = pie;
            boton.addEventListener("click", enviarRespuestas);
            document.getElementById("botones").appendChild(boton);
          }
        }
        console.log(index);
      });
    return;
  }
  DibujarPreguntas();
  function siguientePregunta() {}
  function enviarRespuestas() {}
  Contraer

  
  
  
  
  
  
  
  
  
  
  