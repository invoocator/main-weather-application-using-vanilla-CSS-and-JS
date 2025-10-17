 let ciudad = document.querySelector("#ciudad");
  let FeelsGrados = document.querySelector(".FeelsGrados");
  let tiempoIzqP = document.querySelector(".tiempoIzqP");
  let tiempoIzqPHora = document.querySelector(".tiempoIzqPHora");
  let tiempoDerechaGrados = document.querySelector(".tiempoDerechaGrados");
  let direccion;
  let fotoTiempo = document.querySelector(".fotoTiempo");
  let FeelsHumedad = document.querySelector(".FeelsHumedad");
  let FeelsViento = document.querySelector(".FeelsViento");
  let Feelslluvia = document.querySelector(".Feelslluvia");
  let lunes = document.querySelector(".lunes");
  let lunesTemperatura = document.querySelector(".lunesTemperatura");
  let lunesImagen = document.querySelector(".lunesImagen");
  let martes = document.querySelector(".martes");
  let martesTemperatura = document.querySelector(".martesTemperatura");
  let martesImagen = document.querySelector(".martesImagen");
  let miercoles = document.querySelector(".miercoles");
  let miercolesTemperatura = document.querySelector(".miercolesTemperatura");
  let miercolesImagen = document.querySelector(".miercolesImagen");
  let jueves = document.querySelector(".jueves");
  let juevesTemperatura = document.querySelector(".juevesTemperatura");
  let juevesImagen = document.querySelector(".juevesImagen");
  let viernes = document.querySelector(".viernes");
  let viernesTemperatura = document.querySelector(".viernesTemperatura");
  let viernesImagen = document.querySelector(".viernesImagen");
  let sabado = document.querySelector(".sabado");
  let sabadoTemperatura = document.querySelector(".sabadoTemperatura");
  let sabadoImagen = document.querySelector(".sabadoImagen");
  let domingo = document.querySelector(".domingo");
  let domingoTemperatura = document.querySelector(".domingoTemperatura");
  let domingoImagen = document.querySelector(".domingoImagen");
  let lunesTemperaturaMax = document.querySelector(".lunesTemperaturaMax");
  let diasEleccion = document.querySelector("#diasEleccion");



  async function cargaDatos() {
    let respuesta = await fetch(direccion);
    let datos = await respuesta.json();
    let latitud = datos.results[0].latitude;
    let longitud = datos.results[0].longitude;
    let ciudad = datos.results[0].name;
    let total = [latitud, longitud];
    let pais = datos.results[0].country

    tiempoIzqP.innerHTML = `${ciudad} ${pais}`;

    return total;
  }

  async function obtenerDireccion() {
    let resultado = await cargaDatos();
    let direccion2 = `https://api.open-meteo.com/v1/forecast?latitude=${resultado[0]}&longitude=${resultado[1]}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,precipitation,temperature_2m,apparent_temperature&daily=apparent_temperature_max,apparent_temperature_min,rain_sum`;
    return (direccion2);
  }

  async function cargaDatosdos() {
    let respuesta = await obtenerDireccion();
    let direccion = await fetch(respuesta);
    let datos = await direccion.json()
    let hora = new Date();
    let diasemanas = hora.getDay();
    let horaActual = hora.getHours();
    let lluviaActual = datos.hourly.precipitation_probability[horaActual];
    let temperaturaAparente = datos.hourly.apparent_temperature[horaActual];
    let humedadRelativa = datos.hourly.relative_humidity_2m[horaActual];
    let vientoRelativo = datos.hourly.wind_speed_10m[horaActual];
    let lluviaRelativo = datos.hourly.precipitation[horaActual];
    let diasSemana = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"]
    let lluviasSemanales = datos.daily.rain_sum;
    let lunesTemperaturaMin = document.querySelector(".lunesTemperaturaMin");
    let martesTemperaturaMin = document.querySelector(".martesTemperaturaMin");
    let martesTemperaturaMax = document.querySelector(".martesTemperaturaMax");
    let miercolesTemperaturaMin = document.querySelector(".miercolesTemperaturaMin");
    let miercolesTemperaturaMax = document.querySelector(".miercolesTemperaturaMax");
    let juevesTemperaturaMax = document.querySelector(".juevesTemperaturaMax");
    let juevesTemperaturaMin = document.querySelector(".juevesTemperaturaMin");
    let viernesTemperaturaMin = document.querySelector(".viernesTemperaturaMin");
    let viernesTemperaturaMax = document.querySelector(".viernesTemperaturaMax");
    let sabadoTemperaturaMax = document.querySelector(".sabadoTemperaturaMax");
    let sabadoTemperaturaMin = document.querySelector(".sabadoTemperaturaMin");
    let domingoTemperaturaMax = document.querySelector(".domingoTemperaturaMax");
    let domingoTemperaturaMin = document.querySelector(".domingoTemperaturaMin");
    let diasEleccion = document.querySelector("#diasEleccion")

    let hora1 = document.querySelector(".hora1");
    let horaSemanaTemp = datos.hourly.apparent_temperature;
    let horaSemanalluvia = datos.hourly.precipitation;
    let metoHoras = document.querySelector(".metoHoras");


    let corte = horaSemanalluvia.slice(0, 38)


    let pasarTodo = [horaSemanaTemp, horaSemanalluvia, horaActual];



    
    console.log(datos);
  
    FeelsGrados.innerHTML = temperaturaAparente + "º";
    tiempoIzqPHora.innerHTML = datos.current.time;
    tiempoDerechaGrados.innerHTML = datos.current.temperature_2m + "º";
    FeelsHumedad.innerHTML = humedadRelativa + "%"
    FeelsViento.innerHTML = vientoRelativo + "mps"
    Feelslluvia.innerHTML = lluviaActual + "%"


    fotoTiempo.src = lluvias(lluviaActual)

    lunes.innerHTML = diasSemana[diasemanas];
    lunesImagen.src = lluviasSemana(lluviasSemanales[1]);
    lunesTemperaturaMax.innerHTML = datos.daily.apparent_temperature_max[1]
    lunesTemperaturaMin.innerHTML = datos.daily.apparent_temperature_min[1]


    martes.innerHTML = diasSemana[diasemanas + 1];
    martesImagen.src = lluviasSemana(lluviasSemanales[2]);
    martesTemperaturaMax.innerHTML = datos.daily.apparent_temperature_max[2]
    martesTemperaturaMin.innerHTML = datos.daily.apparent_temperature_min[2]

    miercoles.innerHTML = diasSemana[diasemanas + 2];
    miercolesImagen.src = lluviasSemana(lluviasSemanales[3]);
    miercolesTemperaturaMax.innerHTML = datos.daily.apparent_temperature_max[3]
    miercolesTemperaturaMin.innerHTML = datos.daily.apparent_temperature_min[3]


    jueves.innerHTML = diasSemana[diasemanas + 3];
    juevesImagen.src = lluviasSemana(lluviasSemanales[4]);
    juevesTemperaturaMax.innerHTML = datos.daily.apparent_temperature_max[4]
    juevesTemperaturaMin.innerHTML = datos.daily.apparent_temperature_min[4]

    viernes.innerHTML = diasSemana[diasemanas + 4];
    viernesImagen.src = lluviasSemana(lluviasSemanales[5]);
    viernesTemperaturaMax.innerHTML = datos.daily.apparent_temperature_max[5]
    viernesTemperaturaMin.innerHTML = datos.daily.apparent_temperature_min[5]

    sabado.innerHTML = diasSemana[diasemanas + 5];
    sabadoImagen.src = lluviasSemana(lluviasSemanales[6]);
    sabadoTemperaturaMax.innerHTML = datos.daily.apparent_temperature_max[6]
    sabadoTemperaturaMin.innerHTML = datos.daily.apparent_temperature_min[6]

    domingo.innerHTML = diasSemana[diasemanas + 6];
    domingoImagen.src = lluviasSemana(lluviasSemanales[0]);
    domingoTemperaturaMax.innerHTML = datos.daily.apparent_temperature_max[0]
    domingoTemperaturaMin.innerHTML = datos.daily.apparent_temperature_min[0]



    let horas1izq = document.querySelector(".horas1izq");
    let horas1img = document.querySelector(".horas1img");
    let horas1der = document.querySelector(".horas1der");
    let horas2izq = document.querySelector(".horas2izq");
    let horas2img = document.querySelector(".horas2img");
    let horas2der = document.querySelector(".horas2der");
    let horas3izq = document.querySelector(".horas3izq");
    let horas3img = document.querySelector(".horas3img");
    let horas3der = document.querySelector(".horas3der");
    let horas4izq = document.querySelector(".horas4izq");
    let horas4img = document.querySelector(".horas4img");
    let horas4der = document.querySelector(".horas4der");
    let horas5izq = document.querySelector(".horas5izq");
    let horas5img = document.querySelector(".horas5img");
    let horas5der = document.querySelector(".horas5der");
    let horas6izq = document.querySelector(".horas6izq");
    let horas6img = document.querySelector(".horas6img");
    let horas6der = document.querySelector(".horas6der");
    let horas7izq = document.querySelector(".horas7izq");
    let horas7img = document.querySelector(".horas7img");
    let horas7der = document.querySelector(".horas7der");



    horas1izq.innerHTML = sicronizarHora(horaActual) + " H";
    horas2izq.innerHTML = sicronizarHora(horaActual + 1) + " H";
    horas3izq.innerHTML = sicronizarHora(horaActual + 2) + " H";
    horas4izq.innerHTML = sicronizarHora(horaActual + 3) + " H";
    horas5izq.innerHTML = sicronizarHora(horaActual + 4) + " H";
    horas6izq.innerHTML = sicronizarHora(horaActual + 5) + " H";
    horas7izq.innerHTML = sicronizarHora(horaActual + 6) + " H";

    horas1der.innerHTML = horaSemanaTemp[horaActual] + "º"
    horas2der.innerHTML = horaSemanaTemp[horaActual + 1] + "º"
    horas3der.innerHTML = horaSemanaTemp[horaActual + 2] + "º"
    horas4der.innerHTML = horaSemanaTemp[horaActual + 3] + "º"
    horas5der.innerHTML = horaSemanaTemp[horaActual + 4] + "º"
    horas6der.innerHTML = horaSemanaTemp[horaActual + 5] + "º"
    horas7der.innerHTML = horaSemanaTemp[horaActual + 6] + "º"

    horas1img.src = lluviasSemana(horaSemanalluvia[horaActual])
    horas2img.src = lluviasSemana(horaSemanalluvia[horaActual + 1])
    horas3img.src = lluviasSemana(horaSemanalluvia[horaActual + 2])
    horas4img.src = lluviasSemana(horaSemanalluvia[horaActual + 3])
    horas5img.src = lluviasSemana(horaSemanalluvia[horaActual + 4])
    horas6img.src = lluviasSemana(horaSemanalluvia[horaActual + 5])
    horas7img.src = lluviasSemana(horaSemanalluvia[horaActual + 6])


    return (pasarTodo);
  }




  function aceptar() {
    direccion = `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad.value}&count=10&language=es&format=json`
    cargaDatosdos()
  }

  async function horaSemanal() {
    let respuesta = await cargaDatosdos();


    let temperatura = respuesta[0];
    let temperatura1 = temperatura.slice(0, 32)
    let temperatura2 = temperatura.slice(23, 56)
    let temperatura3 = temperatura.slice(47, 80)
    let temperatura4 = temperatura.slice(71, 104)
    let temperatura5 = temperatura.slice(95, 128)
    let temperatura6 = temperatura.slice(119, 156)
    let temperaturaAux1 = temperatura.slice(0, 8)
    let temperaturaAux2 = temperatura.slice(143, 168)
    let temperatura7 = temperaturaAux2.concat(temperaturaAux1)

    let lluvias = respuesta[1];
    let lluvias1 = lluvias.slice(0, 32)
    let lluvias2 = lluvias.slice(23, 56)
    let lluvias3 = lluvias.slice(47, 80)
    let lluvias4 = lluvias.slice(71, 104)
    let lluvias5 = lluvias.slice(95, 128)
    let lluvias6 = lluvias.slice(119, 156)
    let lluviasAux1 = lluvias.slice(0, 8)
    let lluviasAux2 = lluvias.slice(143, 168)
    let lluvias7 = lluviasAux2.concat(lluviasAux1)
    let hora = respuesta[2];

    if (diasEleccion.value == 0) {
      horasSemana(temperatura1, lluvias1)
    } else if (diasEleccion.value == 1) {
      horasSemana(temperatura2, lluvias2)
    } else if (diasEleccion.value == 2) {
      horasSemana(temperatura3, lluvias3)
    } else if (diasEleccion.value == 3) {
      horasSemana(temperatura4, lluvias4)
    } else if (diasEleccion.value == 4) {
      horasSemana(temperatura5, lluvias5)
    } else if (diasEleccion.value == 5) {
      horasSemana(temperatura6, lluvias6)
    } else if (diasEleccion.value == 6) {
      horasSemana(temperatura7, lluvias7)
    }






  }




  function lluvias(lluvia) {
    if (lluvia <= 10) {
      return "images/icon-sunny.webp";
    }
    if (lluvia == 10 || lluvia <= 20) {
      return "images/icon-overcast.webp";
    }
    if (lluvia == 20 || lluvia <= 60) {
      return "images/icon-rain.webp";
    }
    if (lluvia == 60 || lluvia <= 85) {
      return "images/icon-drizzle.webp";
    }
    if (lluvia == 85 || lluvia <= 100) {
      return "images/icon-storm.webp";
    }
  }
  function lluviasSemana(lluvia) {
    if (lluvia <= 1) {
      return "images/icon-sunny.webp";
    }
    if (lluvia == 1 || lluvia <= 2) {
      return "images/icon-overcast.webp";
    }
    if (lluvia == 2 || lluvia <= 6) {
      return "images/icon-rain.webp";
    }
    if (lluvia == 6 || lluvia <= 8) {
      return "images/icon-drizzle.webp";
    }
    if (lluvia == 8 || lluvia <= 100) {
      return "images/icon-storm.webp";
    }
  }

  function horasSemana(temperaturaSemana, lluviasSemanal) {
    let cambio;
    let hora = new Date();
    let horaActual = hora.getHours();
    let horas1izq = document.querySelector(".horas1izq");
    let horas1img = document.querySelector(".horas1img");
    let horas1der = document.querySelector(".horas1der");
    let horas2izq = document.querySelector(".horas2izq");
    let horas2img = document.querySelector(".horas2img");
    let horas2der = document.querySelector(".horas2der");
    let horas3izq = document.querySelector(".horas3izq");
    let horas3img = document.querySelector(".horas3img");
    let horas3der = document.querySelector(".horas3der");
    let horas4izq = document.querySelector(".horas4izq");
    let horas4img = document.querySelector(".horas4img");
    let horas4der = document.querySelector(".horas4der");
    let horas5izq = document.querySelector(".horas5izq");
    let horas5img = document.querySelector(".horas5img");
    let horas5der = document.querySelector(".horas5der");
    let horas6izq = document.querySelector(".horas6izq");
    let horas6img = document.querySelector(".horas6img");
    let horas6der = document.querySelector(".horas6der");
    let horas7izq = document.querySelector(".horas7izq");
    let horas7img = document.querySelector(".horas7img");
    let horas7der = document.querySelector(".horas7der");

    let total = [, lluviasSemanal]
    let lluviaHora = total[1]



    horas1izq.innerHTML = sicronizarHora(horaActual) + " H";
    horas2izq.innerHTML = sicronizarHora(horaActual + 1) + " H";
    horas3izq.innerHTML = sicronizarHora(horaActual + 2) + " H";
    horas4izq.innerHTML = sicronizarHora(horaActual + 3) + " H";
    horas5izq.innerHTML = sicronizarHora(horaActual + 4) + " H";
    horas6izq.innerHTML = sicronizarHora(horaActual + 5) + " H";
    horas7izq.innerHTML = sicronizarHora(horaActual + 6) + " H";

    horas1der.innerHTML = temperaturaSemana[horaActual] + "º"
    horas2der.innerHTML = temperaturaSemana[horaActual + 1] + "º"
    horas3der.innerHTML = temperaturaSemana[horaActual + 2] + "º"
    horas4der.innerHTML = temperaturaSemana[horaActual + 3] + "º"
    horas5der.innerHTML = temperaturaSemana[horaActual + 4] + "º"
    horas6der.innerHTML = temperaturaSemana[horaActual + 5] + "º"
    horas7der.innerHTML = temperaturaSemana[horaActual + 6] + "º"

    horas1img.src = lluviasSemana(lluviaHora[horaActual])
    horas2img.src = lluviasSemana(lluviaHora[horaActual + 1])
    horas3img.src = lluviasSemana(lluviaHora[horaActual + 2])
    horas4img.src = lluviasSemana(lluviaHora[horaActual + 3])
    horas5img.src = lluviasSemana(lluviaHora[horaActual + 4])
    horas6img.src = lluviasSemana(lluviaHora[horaActual + 5])
    horas7img.src = lluviasSemana(lluviaHora[horaActual + 6])







  }

  function sicronizarHora(horaActual) {
    let cambio;

    if (horaActual == 25) {
      return cambio = 1;
    } else if (horaActual == 26) {
      return cambio = 2;
    } else if (horaActual == 27) {
      return cambio = 3;
    } else if (horaActual == 28) {
      return cambio = 4;
    } else if (horaActual == 29) {
      return cambio = 5;
    } else if (horaActual == 30) {
      return cambio = 6;
    } else if (horaActual == 31) {
      return cambio = 7;
    } else if (horaActual == 32) {
      return cambio = 8;
    } else {
      return horaActual
    }
  }
