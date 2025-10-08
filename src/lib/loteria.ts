export interface Card {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  descriptionLong: string;
}

// Cartas de la Lotería
export const CARDS: Card[] = [
  {
    id: 1, name: "LA INFORMACIÓN", imageUrl: "/cards/1.jpg", description: "Lo que vale oro y no compartes con todos.", descriptionLong: "Conjunto de datos valiosos que deben protegerse contra accesos no autorizados, pérdidas o alteraciones." },
  { id: 2, name: "EL USUARIO", imageUrl: "/cards/2.jpg", description: "El que con buen juicio y atención, es la primera línea de protección.", descriptionLong: "Persona que interactúa con los sistemas de información, y que suele ser un vector de ataque común para los ciberdelincuentes." },
  { id: 3, name: "EL CIBERDELINCUENTE", imageUrl: "/cards/3.jpg", description: "El que con malas intenciones, roba información en diferentes situaciones.", descriptionLong: "Persona que aprovecha el entorno digital para realizar actividades malintencionadas (robo de información, ataques)" },
  { id: 4, name: "LA CIBERSEGURIDAD", imageUrl: "/cards/4.jpg", description: "El escudo virtual sin igual, que protege el entorno digital.", descriptionLong: "Conjunto de prácticas y tecnologías destinadas a proteger los sistemas informáticos y la información digital." },
  { id: 5, name: "LA INGENIERÍA SOCIAL", imageUrl: "/cards/5.jpg", description: "La técnica que sabe convencer, para tu información confidencial obtener.", descriptionLong: "Técnica de manipulación utilizada por ciberdelincuentes para obtener información confidencial mediante el engaño." },
  { id: 6, name: "LAS CIBERAMENAZAS", imageUrl: "/cards/6.jpg", description: "Los riesgos que debes esquivar, para tu información resguardar.", descriptionLong: "Riesgos asociados al uso de la tecnología que pueden comprometer la información o los sistemas." },
  { id: 7, name: "EL PHISHING", imageUrl: "/cards/7.jpg", description: "El correo que te pesca sin anzuelo.", descriptionLong: "Engaño por correo electrónico para robar información personal." },
  { id: 8, name: "EL MALWARE", imageUrl: "/cards/8.jpg", description: "El software que te llega como amigo, pero se comporta como enemigo.", descriptionLong: "Programa malicioso diseñado para dañar, acceder o robar información en un sistema." },
  { id: 9, name: "INFOSEGURA", imageUrl: "/cards/9.jpg", description: "La estrategia de concientización que te enseña a proteger tu información.", descriptionLong: "Estrategia de concientización en materia de seguridad de la información de la Universidad Veracruzana." },
  { id: 10, name: "LA CONTRASEÑA SEGURA", imageUrl: "/cards/10.jpg", description: "La que en secreto debes tener, para que a tus cuentas nadie pueda acceder.", descriptionLong: "Clave robusta y única que protege el acceso a cuentas o sistemas." },
  { id: 11, name: "LAS COPIAS DE SEGURIDAD", imageUrl: "/cards/11.jpg", description: "Las que haces sin dudar, por si todo llega a fallar.", descriptionLong: "Respaldo de información que permite su recuperación en caso de pérdida." },
  { id: 12, name: "LAS ACTUALIZACIONES DE SOFTWARE", imageUrl: "/cards/12.jpg", description: "Las que realizar en minutos, y te evitan muchos sustos.", descriptionLong: "Mejoras que corrigen errores y refuerzan la seguridad de los dispositivos o programas instalados." },
  { id: 13, name: "EL DOBLE FACTOR DE AUTENTICACIÓN", imageUrl: "/cards/13.jpg", description: "El que te pide doble pase, y al que no eres tú, lo rechace.", descriptionLong: "Mecanismo que permite verificar la identidad de un usuario mediante dos métodos distintos de autenticación." },
  { id: 14, name: "EL ANTIMALWARE", imageUrl: "/cards/14.jpg", description: "El que al malware enfrenta, y tu tranquilidad aumenta.", descriptionLong: "Software que detecta, previene y elimina programas maliciosos." },
  { id: 15, name: "EL SENTIDO COMÚN", imageUrl: "/cards/15.jpg", description: "El que no se instala, pero siempre debes usar.", descriptionLong: "Capacidad del usuario para tomar decisiones seguras en entornos digitales." },
  { id: 16, name: "EL SOFTWARE LEGÍTIMO", imageUrl: "/cards/16.jpg", description: "El que viene sin sorpresas, ni malware que te estresa.", descriptionLong: "Software que se obtiene a través de canales oficiales y confiables." },
  { id: 17, name: "EL UV-CIRST", imageUrl: "/cards/17.jpg", description: "El que responde con destreza, para frenar toda amenaza con certeza", descriptionLong: "Equipo de Respuesta a Incidentes de Ciberseguridad de la Universidad Veracruzana." },
  { id: 18, name: "LA COMUNIDAD SEGURA", imageUrl: "/cards/18.jpg", description: "El grupo que se asesora y su seguridad mejora.", descriptionLong: "Grupo de personas que siguen la campaña de concientización (Infosegura) y adoptan las recomendaciones para el uso responsable de la tecnología y la protección de la información." },
  { id: 19, name: "LA NAVEGACIÓN SEGURA", imageUrl: "/cards/19.jpg", description: "La que, sin apuros, te lleva por caminos seguros.", descriptionLong: "Acciones que reducen los riesgos al usar internet, como evitar sitios inseguros." },
  { id: 20, name: "LOS DISPOSITIVOS PROTEGIDOS", imageUrl: "/cards/20.jpg", description: "Los que mantienes blindados y siempre respaldados.", descriptionLong: "Teléfonos, laptops y tablet protegidos con antivirus, pantallas de bloqueos y actualizaciones al día." },
  { id: 21, name: "LA IDENTIDAD DIGITAL", imageUrl: "/cards/21.jpg", description: "La que cuidas en la red, para que nadie te conozca al pie.", descriptionLong: "Imagen que proyectamos en internet, es una representación de nuestra identidad física en el mundo digital." },
  { id: 22, name: "EL RESPETO EN LÍNEA", imageUrl: "/cards/22.jpg", description: "Lo que al responder implementas sin ofender.", descriptionLong: "Conductas responsables y amables al interactuar en el entorno digital." },
  { id: 23, name: "LOS FRAUDES EN LÍNEA", imageUrl: "/cards/23.jpg", description: "Los descuentos asombrosos que te salen muy costosos.", descriptionLong: "Promociones o descuentos muy atractivos que suelen ser el gancho para engañar a las personas y robar su dinero." },
  { id: 24, name: "LAS COMUNICACIONES CIFRADAS", imageUrl: "/cards/24.jpg", description: "Las que van bien protegidas y mantienen tus charlas escondidas.", descriptionLong: "Comunicaciones protegidas para que solo las personas autorizadas puedan acceder a su contenido." },
  { id: 25, name: "EL WI-FI CONFIABLE", imageUrl: "/cards/25.jpg", description: "La red con clave y cifrado, donde navegas siempre confiado.", descriptionLong: "Redes inalámbricas protegidas con clave y cifrado." },
  { id: 26, name: "EL REPORTE", imageUrl: "/cards/26.jpg", description: "El que realizas al momento, para que no avance con el tiempo.", descriptionLong: "Práctica de informar de manera rápida las posibles amenazas, vulnerabilidades o incidentes para evitar daños mayores." },
  { id: 27, name: "EL CIERRE DE SESIÓN", imageUrl: "/cards/27.jpg", description: "La práctica que al concluir, el acceso a extraños no va a permitir.", descriptionLong: "Práctica de cerrar sesión en las cuentas al terminar de utilizarlas, para evitar accesos no autorizados." },
  { id: 28, name: "EL ESCRITORIO LIMPIO", imageUrl: "/cards/28.jpg", description: "El espacio que al ordenar, tus secretos sabe guardar.", descriptionLong: "Práctica de mantener el espacio de trabajo sin exposición de información sensible, como contraseñas o documentos confidenciales." },
  { id: 29, name: "LA PRIVACIDAD EN REDES SOCIALES", imageUrl: "/cards/29.jpg", description: "Las configuraciones de seguridad, que a curiosos frena con facilidad.", descriptionLong: "Configuraciones de seguridad que en redes sociales ayuda a limitar quién puede ver nuestra información y publicaciones, contribuyendo a mantener la información protegida." },
  { id: 30, name: "LA NORMATIVIDAD", imageUrl: "/cards/30.jpg", description: "La que con normas al frente, la información protege siempre.", descriptionLong: "Marco y leyes aplicables en materia de seguridad de la información." },
  { id: 31, name: "EL AVISO DE PRIVACIDAD", imageUrl: "/cards/31.jpg", description: "El que al revisar con atención, te dice como será tratada tu información", descriptionLong: "Documento que informa a los usuarios cómo se recopilan, usan, almacenan y protegen sus datos en plataformas y aplicaciones utilizadas." },
  { id: 32, name: "LA ALERTA DE SEGURIDAD", imageUrl: "/cards/32.jpg", description: "La que al sonar, no debes ignorar.", descriptionLong: "Notificación que advierte cuando se detecta un inicio de sesión desde un dispositivo nuevo o desconocido, alertando al usuario de posibles accesos no autorizados y permitiendo tomar medidas inmediatas." },
  { id: 33, name: "LOS PERMISOS DE APLICACIONES", imageUrl: "/cards/33.jpg", description: "Los que a cada app limitarán, y solo lo justo les concederán.", descriptionLong: "Mecanismo de seguridad que permite definir y limitar a qué acciones o datos puede acceder una aplicación dentro de un dispositivo." },
  { id: 34, name: "LA CUENTA ÚNICA", imageUrl: "/cards/34.jpg", description: "La que para un fin fue creada, y nunca debe ser mezclada.", descriptionLong: "Cuentas de usuario que se crean para propósitos específicos y no deben mezclarse. Cada cuenta tiene un objetivo concreto, por ejemplo: personal, laboral o escolar." },
  { id: 35, name: "EL BORRADO SEGURO", imageUrl: "/cards/35.jpg", description: "El que al eliminar, nignuna huella dejará.", descriptionLong: "Proceso de eliminar información de manera que no pueda ser recuperada, protegiendo datos sensibles y evitando usos indebidos." },
  { id: 36, name: "LA HIGIENE DIGITAL", imageUrl: "/cards/36.jpg", description: "Los hábitos de protección, que en línea te evitan una infección.", descriptionLong: "Medidas rutinarias de protección que ayudan a reducir la posibilidad de ser víctima de software malicioso (virus) en el entorno digital." },
  { id: 37, name: "LAS COMPRAS SEGURAS", imageUrl: "/cards/37.jpg", description: "Las que antes de realizar, sus elementos debes verificar.", descriptionLong: "Práctica de adquirir productos o servicios en línea de manera protegida, utilizando sitios oficiales, métodos de pago seguros, revisando opiniones, políticas de devolución, entre otras." },
  { id: 38, name: "EL BLOQUEO DE PANTALLA", imageUrl: "/cards/38.jpg", description: "El que con huella, clave o patrón, protege los dispositivos de una intrusión.", descriptionLong: "Función de seguridad que evita el acceso no autorizado a un dispositivo o equipo cuando el usuario se aleja o no lo está utilizando." },
  { id: 39, name: "EL ESTUDIANTE CIBERSEGURO", imageUrl: "/cards/39.jpg", description: "El que con buenas prácticas al implementar, su información académica sabe cuidar.", descriptionLong: "Usuario que aplica buenas prácticas de seguridad en el entorno digital durante su actividad académica, protegiendo su información, sus cuentas, dispositivos y los sistemas tecnológicos académicos a los que tiene acceso como estudiante." },
  { id: 40, name: "EL SMISHING", imageUrl: "/cards/40.jpg", description: "El que por mensaje llega al celular y siempre debes ignorar.", descriptionLong: "Técnica de engaño en la que los ciberdelincuentes envían mensajes de texto falsos con enlaces o solicitudes para robar información personal o financiera." },
  { id: 41, name: "EL VISHING", imageUrl: "/cards/41.jpg", description: "El que se hace sonar, y con falsas palabras busca engañar.", descriptionLong: "Técnica de engaño en la que los ciberdelincuentes utilizan llamadas telefónicas para obtener información confidencial, como contraseñas, datos bancarios o información personal." },
  { id: 42, name: "EL QUISHING", imageUrl: "/cards/42.jpg", description: "El que a simple vista es difícil detectar, por ser un código para escanear.", descriptionLong: "Técnica de engaño en la que los ciberdelincuentes utilizan códigos QR para robar información personal, financiera o instalar malware en dispositivos de los usuarios." },
  { id: 43, name: "EL RANSOMWARE", imageUrl: "/cards/43.jpg", description: "El que tu información busca cifrar, y nunca debes pagar.", descriptionLong: "Software malicioso que cifra archivos o bloquea dispositivos y sistemas para exigir el pago de un rescate a cambio de devolver el acceso." },
  { id: 44, name: "LOS DEEPFAKES", imageUrl: "/cards/44.jpg", description: "El video que parece real, pero es un engaño digital.", descriptionLong: "Imágenes o videos falsos que suplantan la identidad de una persona haciendo parecer que dice o hace cosas que no se ajustan a la realidad." },
  { id: 45, name: "EL CYBERBULLYING", imageUrl: "/cards/45.jpg", description: "El que a personas puede lastimar, y en línea hay que eliminar.", descriptionLong: "Comportamiento abusivo, agresivo o acosador en línea." },
  { id: 46, name: "LOS DATOS PERSONALES", imageUrl: "/cards/46.jpg", description: "Los datos de identificación, que mantienes bajo protección.", descriptionLong: "Información sensible que identifica a una persona o individuo  (nombre, dirección, teléfono, correo), y que no debe ser compartida con cualquier persona para protegerla de usos indebidos." },
  { id: 47, name: "LA PUBLICIDAD ENGAÑOSA", imageUrl: "/cards/47.jpg", description: "La que analizas con cuidado, para no ser engañado.", descriptionLong: "Forma de publicidad falsa que suele implicar el uso de exageraciones o insinuaciones para convencer a los consumidores de que compren o realicen una acción. " },
  { id: 48, name: "EL SPAM", imageUrl: "/cards/48.jpg", description: "El correo molesto y sin razón, que llega sin invitación.", descriptionLong: "Mensajes no solicitados y repetitivos que saturan la bandeja de entrada del correo electrónico, generalmente con enlaces maliciosos o publicidad." },
  { id: 49, name: "EL DISI", imageUrl: "/cards/49.jpg", description: "El que conmemora con unión, la seguridad de la información.", descriptionLong: "Conmemoración del Día Internacional de la Seguridad de la Información que resalta la importacia de la protección de la información y fomenta buenas prácticas." },
  { id: 50, name: "EL SOFTWARE PIRATA", imageUrl: "/cards/50.jpg", description: "El que por tu seguridad, no debes instalar.", descriptionLong: "Programas sin licencia oficial que parecen gratuitos, pero exponen los equipos a infecciones de malware y no cuentan con los beneficios de un software con licencia (actualizaciones de seguridad, garantia)." },
  { id: 51, name: "LAS FAKE NEWS", imageUrl: "/cards/51.jpg", description: "Las noticias que desinforman, y la verdad disorsionan.", descriptionLong: "Noticias falsas creadas para desinformar, manipular opiniones o generar confusión en redes y medios digitales." },
  { id: 52, name: "LA USB DESCONOCIDA", imageUrl: "/cards/52.jpg", description: "La que sin conocer no debes conectar, para tu equipo no infectar.", descriptionLong: "Unidad de almacenamiento extraíble que puede ser utilizada por personas malintencionadas para infectar equipos con malware." },
  { id: 53, name: "EL BORRADO REMOTO", imageUrl: "/cards/53.jpg", description: "El que por seguridad has de usar, si llegas a perder tu celular.", descriptionLong: "Función que permite eliminar los datos de un dispositivo a distancia para proteger la información ante una pérdida, robo o extravío." },
  { id: 54, name: "LA REPUTACIÓN EN LÍNEA", imageUrl: "/cards/54.jpg", description: "La que con buen actuar, en línea debes cuidar.", descriptionLong: "Percepción o imagen que se forma sobre una persona a partir de la información, publicaciones y comportamiento que muestra en internet y redes sociales." },
  { id: 55, name: "EL PERFIL DESCONOCIDO", imageUrl: "/cards/55.jpg", description: "Al que no le das tu amistad, si no conoces su identidad.", descriptionLong: "Cuenta en redes sociales o plataformas digitales que envía mensajes y solicitudes de amistad, de la cual no se tiene información ni certeza de quién está detrás, lo que puede representar un riesgo." }

];

export const WINNING_PATTERNS: number[][] = [
  // Filas
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // Columnas
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // Diagonales
  [0, 5, 10, 15],
  [3, 6, 9, 12],
  // Esquinas
  [0, 3, 12, 15],
  // Cuadrado central
  [5, 6, 9, 10],
];

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param array The array to shuffle.
 * @returns The shuffled array.
 */
export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Generates a random 16-card Lotería board.
 * @returns An array of 16 unique Card objects.
 */
export function generateBoard(): Card[] {
  return shuffle(CARDS).slice(0, 16);
}

/**
 * Creates a full shuffled deck for the dealer.
 * @returns A shuffled array of all Card objects.
 */
export function createDeck(): Card[] {
  return shuffle(CARDS);
}

/**
 * Checks if a set of marked indices on a board constitutes a win.
 * @param markedIndices The indices of the marked cards (0-15).
 * @returns True if a winning pattern is met, false otherwise.
 */
export function checkWin(
  markedIndices: number[],
  board: Card[],
  calledCardIds: number[],
  gameMode: string = "full"
): boolean {
  // Validar que las cartas marcadas estén en las llamadas
  const validMarks = markedIndices.every(
    (idx) => calledCardIds.includes(board[idx].id)
  );
  if (!validMarks) return false;

  switch (gameMode) {
    case "full":
      return markedIndices.length === 16;

    case "horizontal": {
      const rowPatterns = WINNING_PATTERNS.slice(0, 4);
      return rowPatterns.some((pattern) =>
        pattern.every((idx) => markedIndices.includes(idx))
      );
    }

    case "vertical": {
      const colPatterns = WINNING_PATTERNS.slice(4, 8);
      return colPatterns.some((pattern) =>
        pattern.every((idx) => markedIndices.includes(idx))
      );
    }

    case "diagonal": {
      const diagPatterns = WINNING_PATTERNS.slice(8, 10);
      return diagPatterns.some((pattern) =>
        pattern.every((idx) => markedIndices.includes(idx))
      );
    }

    case "corners": {
      const corners = WINNING_PATTERNS[10];
      return corners.every((idx) => markedIndices.includes(idx));
    }

    case "square": {
      const squarePatterns = WINNING_PATTERNS.slice(11);
      return squarePatterns.some((pattern) =>
        pattern.every((idx) => markedIndices.includes(idx))
      );
    }

    default:
      return false;
  }
}
// Genera una función de restricción basada en el modo de juego y la primera carta marcada
export function getRestriction(
  mode: string,
  firstCard: { row: number; col: number }
): (pos: { row: number; col: number }) => boolean {
  switch (mode) {
    case "horizontal": // solo esa fila
      return (pos) => pos.row === firstCard.row;

    case "vertical": // solo esa columna
      return (pos) => pos.col === firstCard.col;

    case "diagonal": {
      const diagonals = [
        [0, 5, 10, 15], // diagonal principal
        [3, 6, 9, 12]   // diagonal secundaria
      ];

      if (!firstCard) {
        // Al inicio del juego, ambas diagonales son clicleables
        const activeIndices = [...diagonals[0], ...diagonals[1]];
        return (pos) => activeIndices.includes(pos.row * 4 + pos.col);
      }

      // Una vez se cliquea la primera carta, se bloquea la otra diagonal
      const firstIndex = firstCard.row * 4 + firstCard.col;
      const activeDiagonal = diagonals.find((diag) => diag.includes(firstIndex)) || [];
      return (pos) => activeDiagonal.includes(pos.row * 4 + pos.col);
    }


    case "corners": // las 4 esquinas del tablero
      return (pos) =>
        (pos.row === 0 || pos.row === 3) &&
        (pos.col === 0 || pos.col === 3);
    /*
    case "square": // cuadrado de 2x2 donde está la primera carta
      return (pos) =>
        Math.abs(pos.row - firstCard.row) <= 1 &&
        Math.abs(pos.col - firstCard.col) <= 1;

    */
    // Cuadrado dinámico de 2x2 según la carta seleccionada
    case "square":
      if (!firstCard) {
        // Permite seleccionar cualquier carta como inicio
        return () => true;
      }
      // Calcula las posiciones del cuadrado 2x2 alrededor de la carta seleccionada
      const { row, col } = firstCard;
      const indices: number[] = [];
      // Asegura que el cuadrado no se salga del tablero
      const startRow = row === 3 ? 2 : row;
      const startCol = col === 3 ? 2 : col;
      for (let r = startRow; r < startRow + 2; r++) {
        for (let c = startCol; c < startCol + 2; c++) {
          indices.push(r * 4 + c);
        }
      }
      return (pos) => indices.includes(pos.row * 4 + pos.col);


    default: // "full" → libre
      return () => true;
  }
}
