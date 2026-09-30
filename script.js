// Estructura de datos: arreglo de objetos { id, nombre, telefono }
let contactos = [];
let siguienteId = 1;

const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const btnAgregar = document.getElementById("btn-agregar");
const lista = document.getElementById("lista-contactos");
const mensajeError = document.getElementById("mensaje-error");
const mensajeVacio = document.getElementById("mensaje-vacio");
const contador = document.getElementById("contador");
const buscador = document.getElementById("buscador");

function agregarContacto() {
  const nombre = inputNombre.value.trim();
  const telefono = inputTelefono.value.trim();

  inputNombre.classList.toggle("invalido", !nombre);
  inputTelefono.classList.toggle("invalido", !telefono);

  // No se permiten contactos vacíos
  if (!nombre || !telefono) {
    mensajeError.textContent = "Escribe un nombre y un teléfono para agregar el contacto.";
    mensajeError.hidden = false;
    return;
  }

  mensajeError.hidden = true;
  contactos.push({ id: siguienteId++, nombre, telefono });
  inputNombre.value = "";
  inputTelefono.value = "";
  inputNombre.focus();
  renderizar();
}

function eliminarContacto(id) {
  contactos = contactos.filter((c) => c.id !== id);
  renderizar();
}

function renderizar() {
    lista.innerHTML = "";

    // Filtro por nombre (parcial, sin distinguir mayúsculas/minúsculas)
    const termino = buscador.value.trim().toLowerCase();
    const visibles = contactos.filter((c) => c.nombre.toLowerCase().includes(termino));

    visibles.forEach((c) => {
    const li = document.createElement("li");
    li.className = "contacto";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = c.nombre.charAt(0).toUpperCase();

    const datos = document.createElement("div");
    datos.className = "datos";
    const nombre = document.createElement("span");
    nombre.className = "nombre";
    nombre.textContent = c.nombre;
    const telefono = document.createElement("span");
    telefono.className = "telefono";
    telefono.textContent = c.telefono;
    datos.append(nombre, telefono);

    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarContacto(c.id));

    li.append(avatar, datos, btnEliminar);
    lista.appendChild(li);
  });

    mensajeVacio.textContent = contactos.length === 0
    ? "Aún no hay contactos."
    : "Ningún contacto coincide con tu búsqueda.";
    mensajeVacio.hidden = visibles.length > 0;
    // El contador siempre refleja el total real guardado
    contador.textContent = contactos.length;
}

buscador.addEventListener("input", renderizar);
btnAgregar.addEventListener("click", agregarContacto);

// Enter dentro de los campos 
[inputNombre, inputTelefono].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") agregarContacto();
  });
});

renderizar();