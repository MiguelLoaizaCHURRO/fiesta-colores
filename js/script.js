// Selección de elementos del DOM
const title = document.getElementById('title'); // Título principal
const danceFloor = document.getElementById('dance-floor'); // Contenedor de botones de colores
const addColorBtn = document.getElementById('add-color'); // Botón para agregar colores sorpresa
const resetBtn = document.getElementById('reset'); // Botón para reiniciar la fiesta
const popularColor = document.getElementById('popular-color'); // Texto que muestra el color más popular
const timerDisplay = document.getElementById('timer'); // Temporizador de inactividad
const topColorsPanel = document.getElementById('top-colors-panel'); // Panel emergente para el Top 5
const topColorsList = document.getElementById('top-colors-list'); // Lista dentro del panel Top 5
const closePanelButton = document.getElementById('close-panel-btn'); // Botón para cerrar el panel Top 5
const showPanelButton = document.getElementById('show-panel-btn'); // Botón para mostrar el panel Top 5

// Configuración inicial de colores
const initialColors = ['red', 'blue', 'yellow', 'green']; // Colores iniciales principales
const colorPalette = [
  'orange', 'purple', 'pink', 'brown', 'black', 'white', 'aqua', 'lime', 'teal', 'indigo'
]; // Colores adicionales para los colores sorpresa

let colorVotes = {}; // Objeto para almacenar los votos de cada color
let timer; // Referencia al temporizador de inactividad
let timeLeft = 10; // Tiempo restante en segundos

// Función para crear los botones iniciales en el dance floor
function createInitialButtons() {
  danceFloor.innerHTML = ''; // Limpia el contenedor
  initialColors.forEach(color => createColorButton(color)); // Crea un botón para cada color inicial
}

// Función para crear un botón de color dinámicamente
function createColorButton(color) {
  const button = document.createElement('button');
  button.className = 'color-btn btn rounded-circle'; // Añade las clases de estilo
  button.style.backgroundColor = color; // Establece el color de fondo
  button.dataset.color = color; // Almacena el color como atributo de datos

  // Evento de clic para cambiar el color del título y registrar el voto
  button.addEventListener('click', () => handleColorClick(color));
  danceFloor.appendChild(button); // Añade el botón al contenedor
}

// Función que maneja los clics en los botones de color
function handleColorClick(color) {
  title.style.color = color; // Cambia el color del título
  colorVotes[color] = (colorVotes[color] || 0) + 1; // Incrementa el conteo de clics para el color
  updatePopularColor(); // Actualiza el color más popular en el DOM
  playSound(color); // Reproduce el sonido asociado al color
  resetInactivityTimer(); // Reinicia el temporizador de inactividad
}

// Actualiza el color más popular basado en los votos
function updatePopularColor() {
  const sortedColors = Object.entries(colorVotes).sort((a, b) => b[1] - a[1]); // Ordena los colores por votos
  const [mostPopular] = sortedColors[0] || [null]; // Toma el más votado o null si no hay votos
  popularColor.innerText = mostPopular
    ? `Color más popular: ${mostPopular}`
    : 'Color más popular: Ninguno'; // Muestra el resultado
}

// Evento para agregar un color sorpresa
addColorBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * colorPalette.length); // Genera un índice aleatorio
  const newColor = colorPalette[randomIndex]; // Selecciona un color de la paleta
  createColorButton(newColor); // Crea un botón para el nuevo color
  resetInactivityTimer(); // Reinicia el temporizador
});

// Muestra el panel Top 5 colores
showPanelButton.addEventListener('click', () => {
  const sortedColors = Object.entries(colorVotes).sort((a, b) => b[1] - a[1]).slice(0, 5); // Toma los 5 colores más votados
  topColorsList.innerHTML = sortedColors
    .map(([color, votes]) => `<li>${color}: ${votes} clics</li>`)
    .join(''); // Genera la lista en HTML
  topColorsPanel.classList.remove('d-none'); // Muestra el panel
});

// Cierra el panel Top 5 colores
closePanelButton.addEventListener('click', () => {
  topColorsPanel.classList.add('d-none'); // Oculta el panel
});

// Reinicia el estado de la fiesta
resetBtn.addEventListener('click', resetParty);

function resetParty() {
  createInitialButtons(); // Restablece los colores iniciales
  colorVotes = {}; // Resetea los votos
  popularColor.innerText = 'Color más popular: Ninguno'; // Resetea el texto del color más popular
  title.style.color = 'black'; // Restaura el color del título
  resetInactivityTimer(); // Reinicia el temporizador
}

// Temporizador de inactividad que reinicia la fiesta después de 10 segundos
function resetInactivityTimer() {
  clearInterval(timer); // Limpia el temporizador anterior
  timeLeft = 10; // Reinicia el tiempo restante
  timerDisplay.innerText = `Tiempo restante: ${timeLeft}s`; // Actualiza el texto del temporizador

  timer = setInterval(() => {
    timeLeft -= 1; // Reduce el tiempo en 1 segundo
    timerDisplay.innerText = `Tiempo restante: ${timeLeft}s`; // Actualiza el texto del temporizador

    if (timeLeft <= 0) { // Si el tiempo se acaba
      clearInterval(timer); // Detiene el temporizador
      alert('La fiesta se ha reiniciado por inactividad.'); // Muestra una alerta
      resetParty(); // Reinicia la fiesta
    }
  }, 1000); // Intervalo de 1 segundo
}

// Inicializa el estado inicial de la aplicación
createInitialButtons();
resetInactivityTimer();
