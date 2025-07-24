// Depuración: mostrar los datos guardados en localStorage
console.log("Datos guardados:", JSON.parse(localStorage.getItem("empleados")));

/** Al cargar la pagina 
 Datos iniciales*/
const empleadosIniciales = [
  {
    id: 1,
    nombre: "Juan Carlos Sánchez",
    puesto: "Consultor Senior",
    resultados: 17,
    evaluacion: {
      equipo: 2.1,
      comunicacion: 3.0,
      iniciativa: 4.0,
    },
  },
  {
    id: 2,
    nombre: "María López",
    puesto: "Gerente de Proyectos",
    resultados: 18,
    evaluacion: {
      equipo: 2.0,
      comunicacion: 3.0,
      iniciativa: 4.0,
    },
  },
  {
    id: 3,
    nombre: "Pedro Fernández",
    puesto: "Analista de Datos",
    resultados: 15,
    evaluacion: {
      equipo: 3.8,
      comunicacion: 3.5,
      iniciativa: 4.0,
    },
  },
  {
    id: 4,
    nombre: "Ana García",
    puesto: "Desarrolladora Frontend",
    resultados: 10,
    evaluacion: {
      equipo: 4.0,
      comunicacion: 4.2,
      iniciativa: 4.0,
    },
  },
];

// Cargar datos iniciales (if isn't)
if (!localStorage.getItem("empleados")) {
  localStorage.setItem("empleados", JSON.stringify(empleadosIniciales));
}

// To el form de agregar empleados
document
  .getElementById("nuevo-empleado-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nuevoEmpleado = {
      id: Date.now(),
      nombre: document.getElementById("nombre").value,
      puesto: document.getElementById("puesto").value,
      resultados: parseFloat(document.getElementById("resultados-ad").value),
      evaluacion: {
        equipo: parseFloat(document.getElementById("equipo-ad").value),
        comunicacion: parseFloat(
          document.getElementById("comunicacion-ad").value
        ),
      },
    };

    const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    empleados.push(nuevoEmpleado);
    localStorage.setItem("empleados", JSON.stringify(empleados));

    // Mostrar resultado
    mostrarResultadoIndividual(nuevoEmpleado);

    console.log("Empleado agregado:", nuevoEmpleado); // Depuración
    alert("¡Empleado guardado!");
    this.reset();
  });

// Mostrar empleados al cargar
function mostrarEmpleados() {
  const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
  const lista = document.getElementById("lista-empleados");

  lista.innerHTML = empleados
    .map(
      (emp) => `
    <div class="empleado-card">
      <h3>${emp.nombre}</h3>
      <p>Puesto: ${emp.puesto}</p>
      <p>Resultados: ${emp.resultados}%</p>
    </div>
  `
    )
    .join("");
}

// Validar t
function validarResultados(nuevoEmpleado) {
  if (nuevoEmpleado.resultados < 1 || nuevoEmpleado.resultados > 20) {
    alert("Los resultados deben estar entre 1 y 20");
    return;
  }
  /**
   * Solo validaste el num de empleados
   * falta validar el rango 1-5 de las evaluaciones
   * y como usar el mismo T.T
   */
}

// funcion de filtrado de empleados con problemas culturales
function filtrarProblemasCultural(empleados) {
  return empleados.filter((empleado) => {
    return (
      empleado.evaluacion.equipo < 2.5 || empleado.evaluacion.comunicacion < 2.5
    );
  });
}
// Para que sirvaa
const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
const problematicos = filtrarProblemasCultural(empleados);
console.log(problematicos);

// Clasifica un empleado según sus resultados y evaluación
function clasificarEmpleado(empleado) {
  const { resultados, evaluacion } = empleado;

  if (resultados >= 15 && evaluacion.equipo <= 2.5) {
    return {
      decision: "No es recomendable promover",
      razon: "Alto desempeño pero bajo trabajo en equipo",
    };
  } else if (resultados >= 12 && evaluacion.equipo >= 4) {
    return {
      decision: "Promocion recomendada",
      razon:
        "Alto desempeño y excelente integraciona los valores de la empresa",
    };
  } else {
    return {
      decision: "Discusion necesaria",
      razon: "Desempeño y cultura equilibrados",
    };
  }
}

// Función para evaluar todos los empleados
function evaluarEquipo() {
  const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
  const resultadosDiv = document.getElementById("resultados-equipo");

  resultadosDiv.innerHTML = empleados
    .map(
      (empleado) => `
    <div class="resultado-empleado">
      <h3>${empleado.nombre}</h3>
      <p><strong>Puesto:</strong> ${empleado.puesto}</p>
      <p><strong>Resultados:</strong> ${empleado.resultados}%</p>
      <p><strong>Decisión:</strong> ${clasificarEmpleado(empleado).decision}</p>
      <p><strong>Razón:</strong> ${clasificarEmpleado(empleado).razon}</p>
    </div>
  `
    )
    .join("");
}
// Prueba de datos:
empleados.forEach((empleado) => {
  console.log(`${empleado.nombre}: ${clasificarEmpleado(empleado)}`);
});

// Evaluación desde formulario (nuevo) copilots version
// Asegúrate que el DOM esté cargado primero
document.addEventListener("DOMContentLoaded", function () {
  // 1. Obtener formulario (verifica el ID correcto)
  const evaluationForm = document.getElementById("evaluation-form");

  // 2. Evento submit
  evaluationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 3. Obtener datos
    const empleadoEvaluado = {
      nombre: document.getElementById("nombre-candidato").value,
      resultados: parseFloat(document.getElementById("resultados").value),
      evaluacion: {
        equipo: parseFloat(document.getElementById("equipo").value),
        comunicacion: parseFloat(document.getElementById("comunicacion").value),
      },
    };

    // 4. Mostrar resultados
    mostrarResultadoIndividual(empleadoEvaluado);
    this.reset();
  });
});

function mostrarResultadoIndividual(empleado) {
  // 1. Clasificar al empleado
  const decision = clasificarEmpleado(empleado);
  const resultadosDiv = document.getElementById("resultados-container");

  if (!resultadosDiv) {
    console.error("Error: Contenedor de resultados no encontrado");
    return;
  }

  // 2. Crear objeto completo para guardar
  const evaluacionCompleta = {
    id: Date.now(), // ID único
    nombre: empleado.nombre,
    puesto: empleado.puesto || "No especificado", // Campo añadido
    resultados: empleado.resultados,
    evaluacion: {
      equipo: empleado.evaluacion.equipo,
      comunicacion: empleado.evaluacion.comunicacion,
    },
    decision: decision.decision,
    razon: decision.razon,
    fecha: new Date().toLocaleDateString(), // Fecha legible
  };

  // 3. Mostrar en UI
  resultadosDiv.innerHTML = `
    <div class="resultado-individual">
      <h3>${evaluacionCompleta.nombre}</h3>
      <p><strong>Puesto:</strong> ${evaluacionCompleta.puesto}</p>
      <p><strong>Participación de mercado:</strong> ${
        evaluacionCompleta.resultados
      }%</p>
      <p><strong>Trabajo en equipo:</strong> ${
        evaluacionCompleta.evaluacion.equipo
      }/5</p>
      <p><strong>Comunicación:</strong> ${
        evaluacionCompleta.evaluacion.comunicacion
      }/5</p>
      <p class="decision ${
        evaluacionCompleta.decision.includes("NO")
          ? "decision-riesgo"
          : "decision-ok"
      }">
        ${evaluacionCompleta.decision}
      </p>
      <p><strong>Razón:</strong> ${evaluacionCompleta.razon}</p>
      <small>Evaluado el: ${evaluacionCompleta.fecha}</small>
    </div>
  `;

  // 4. Guardar en localStorage y actualizar lista
  guardarEvaluacion(evaluacionCompleta);
}

// Función para guardar (nueva)
function guardarEvaluacion(empleado) {
  const evaluaciones = JSON.parse(localStorage.getItem("evaluaciones")) || [];
  evaluaciones.push(empleado);
  localStorage.setItem("evaluaciones", JSON.stringify(evaluaciones));
  actualizarListaEmpleados(); // Actualiza la lista en UI
}

// Función para actualizar lista (nueva)
function actualizarListaEmpleados() {
  const lista = document.getElementById("lista-empleados");
  const evaluaciones = JSON.parse(localStorage.getItem("evaluaciones")) || [];

  lista.innerHTML = evaluaciones
    .map(
      (emp) => `
    <div class="empleado-lista-item">
      <h4>${emp.nombre}</h4>
      <p>${emp.puesto} | ${emp.resultados}% mercado</p>
      <p class="decision-mini ${
        emp.decision.includes("NO") ? "decision-riesgo" : "decision-ok"
      }">
        ${emp.decision}
      </p>
    </div>
  `
    )
    .join("");
}

// 3. Evaluación de equipo existente no estoy seguro pero conservemos mantiene por si la necesitas
document
  .getElementById("btn-evaluar-equipo")
  .addEventListener("click", function () {
    const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    const contenedorScroll = document.querySelector(
      ".contenedor-scroll-equipo"
    );
    const resultadosDiv = document.getElementById("resultados-equipo");

    // 1. Generar HTML de resultados
    resultadosDiv.innerHTML = empleados
      .map((emp) => {
        const decision = clasificarEmpleado(emp);
        return `
      <div class="resultado-equipo-item">
        <h4>${emp.nombre}</h4>
        <p>${emp.puesto} | ${emp.resultados}%</p>
        <p class="decision-mini ${
          decision.decision.includes("NO") ? "decision-riesgo" : "decision-ok"
        }">
          ${decision.decision}
        </p>
      </div>
    `;
      })
      .join("");

    // 2. Mostrar contenedor con scroll (altura calculada para ~4 items)
    contenedorScroll.style.display = "block";

    // 3. Opcional: Scroll automático al inicio
    contenedorScroll.scrollTop = 0;
  });

// los filtros para clasificar
function filtrarEmpleados() {
  const criterio = document.getElementById("criterio-filtro").value;
  const empleados = JSON.parse(localStorage.getItem("empleados")) || [];

  // 1. Ocultar lista principal y mostrar lista filtrada
  document.getElementById("lista-empleados").style.display = "none";
  const listaFiltrada = document.getElementById("lista-filtrada");
  listaFiltrada.style.display = "block";

  // 2. Aplicar filtros (tu lógica existente)
  let empleadosFiltrados;
  switch (criterio) {
    case "riesgo":
      empleadosFiltrados = empleados.filter((e) => e.evaluacion.equipo <= 2.5);
      break;
    case "promocion":
      empleadosFiltrados = empleados.filter(
        (e) => e.evaluacion.equipo >= 4 && e.resultados >= 12
      );
      break;
    default:
      empleadosFiltrados = empleados;
  }

  // 3. Mostrar resultados filtrados
  const contenido = document.getElementById("contenido-filtrado");
  contenido.innerHTML = empleadosFiltrados
    .map(
      (emp) => `
    <div class="empleado-item">
      <h4>${emp.nombre}</h4>
      <p>Equipo: ${emp.evaluacion.equipo}/5 | Resultados: ${emp.resultados}%</p>
      <p class="decision ${
        emp.evaluacion.equipo <= 2.5 ? "decision-riesgo" : "decision-ok"
      }">
        ${
          emp.evaluacion.equipo <= 2.5 ? "NO PROMOVER" : "PROMOCIÓN RECOMENDADA"
        }
      </p>
    </div>
  `
    )
    .join("");
}

// Función para ocultar resultados filtrados
function ocultarFiltrados() {
  document.getElementById("lista-filtrada").style.display = "none";
  document.getElementById("lista-empleados").style.display = "block";
}

// Función para cargar empleados con scroll
function cargarListaEmpleados() {
  const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
  const contenedor = document.querySelector(
    "#lista-empleados .contenedor-scroll"
  );

  contenedor.innerHTML = empleados
    .map(
      (emp) => `
    <div class="empleado-item">
      <h4>${emp.nombre}</h4>
      <p>${emp.puesto} | ${emp.resultados}%</p>
      <p class="decision-mini ${
        emp.decision?.includes("NO") ? "decision-riesgo" : "decision-ok"
      }">
        ${emp.decision || "Sin evaluar"}
      </p>
    </div>
  `
    )
    .join("");
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", cargarListaEmpleados);

//para el perfil del los empleados
function mostrarPerfilEmpleado(empleado) {
  document.getElementById("perfil-empleado").style.display = "block";
  document.getElementById("nombre-empleado").textContent = empleado.nombre;

  const ctx = document.getElementById("radarChart").getContext("2d");
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["Trabajo en equipo", "Comunicación", "Resultados"],
      datasets: [
        {
          label: "Evaluación",
          data: [
            empleado.evaluacion.equipo,
            empleado.evaluacion.comunicacion,
            empleado.resultados / 5, // Normalizado a escala 1-5
          ],
          backgroundColor: "rgba(46, 91, 255, 0.2)",
          borderColor: "#2E5BFF",
        },
      ],
    },
    options: { scales: { r: { beginAtZero: true, max: 5 } } },
  });
}

// Función compartida para mostrar resultados
function mostrarResultados(data, origen = "test") {
  const contenedor = document.getElementById("resultados-container");

  const resultadoHTML = `
    <div class="resultado ${origen}">
      <h3>${data.nombre}</h3>
      <p><strong>Origen:</strong> ${
        origen === "test" ? "Evaluación por Test" : "Registro Rápido"
      }</p>
      <table>
        <!-- Tabla con resultados -->
      </table>
    </div>
  `;

  contenedor.innerHTML = resultadoHTML;
}

// ahhh chatgpt dio esto para el Evento para el test
document
  .getElementById("evaluation-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar que todas las preguntas estén respondidas
    const radios = this.querySelectorAll('input[type="radio"]:checked');
    if (radios.length < 6) {
      // 6 preguntas en total
      alert("¡Debes responder todas las preguntas!");
      return;
    }

    // Procesar respuestas
    const resultados = {
      nombre: this.querySelector("#nombre-candidato").value,
      participacion: calcularPuntuacion(["p1", "p2"]),
      comunicacion: calcularPuntuacion(["p3", "p4"]),
      equipo: calcularPuntuacion(["p5", "p6"]),
    };

    mostrarResultados(resultados, "test");
  });

// Funciones para calcular puntuación
function calcularPuntuacion(preguntas) {
  let puntos = 0;
  preguntas.forEach((p) => {
    const seleccionado = document.querySelector(`input[name="${p}"]:checked`);
    if (seleccionado) puntos += parseInt(seleccionado.value);
  });
  return convertirANivel(puntos);
}

function convertirANivel(puntos) {
  const escalas = { 4: 5, 3: 4, 2: 3, 1: 2, 0: 1 };
  return escalas[puntos] || 1;
}

function mostrarResultados(data) {
  const contenedor = document.getElementById("resultados-container");
  contenedor.innerHTML = `
    <div class="resultado">
      <h3>${data.nombre}</h3>
      <table>
        <tr><th>Categoría</th><th>Puntuación (1-5)</th></tr>
        <tr><td>Participación</td><td>${data.participacion}</td></tr>
        <tr><td>Comunicación</td><td>${data.comunicacion}</td></tr>
        <tr><td>Trabajo en equipo</td><td>${data.equipo}</td></tr>
      </table>
    </div>
  `;

  // Hacer scroll a los resultados
  contenedor.scrollIntoView({ behavior: "smooth" });
}

function guardarEvaluacion(empleado) {
  const evaluaciones = JSON.parse(localStorage.getItem("evaluaciones")) || [];
  evaluaciones.push({
    ...empleado,
    id: Date.now(), // ID único
    fecha: new Date().toLocaleDateString(),
  });
  localStorage.setItem("evaluaciones", JSON.stringify(evaluaciones));
  actualizarListaEmpleados();
}

function actualizarListaEmpleados() {
  const lista = document.getElementById("lista-empleados");
  const evaluaciones = JSON.parse(localStorage.getItem("evaluaciones")) || [];

  lista.innerHTML = evaluaciones
    .map(
      (emp) => `
    <div class="empleado-item">
      <h4>${emp.nombre}</h4>
      <p>Puesto: ${emp.puesto}</p>
      <p class="decision ${
        emp.decision.includes("NO") ? "decision-riesgo" : "decision-ok"
      }">
        ${emp.decision}
      </p>
      <small>Evaluado el: ${emp.fecha}</small>
    </div>
  `
    )
    .join("");
}
