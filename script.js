const playButton = document.getElementById("playButton");
playButton.onclick = allInstructios;
let gameStarted = false;

// Insieme di funzioni attive sul pulsante PLAY NOW
function allInstructios() {
  startGame();
  duplicateBox();
}

function startGame() {
  // Faccio sparire il titolo con un'animazione di dissolvenza
  const titles = document.querySelectorAll("h1, span");
  titles.forEach(function (title) {
    title.style.transition = "opacity 0.5s ease";
    title.style.opacity = 0; // Imposto l'opacità a 0 per far sparire il titolo gradualmente
  });

  // Ritardo l'aggiunta dei bicchieri dopo che il titolo è completamente scomparso
  setTimeout(function () {
    titles.forEach(function (title) {
      title.style.display = "none"; // Nascondo il titolo dopo che è completamente scomparso con l'animazione
    });

    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");

    // Controllo se box2 ha esattamente 2 bicchieri prima di aggiungere altri bicchieri
    if (box2.querySelectorAll(".glass_ctr").length === 2) {
      // Rimuovo un bicchiere dal box2
      const glassCtrToRemove = box2.querySelector(".glass_ctr");
      glassCtrToRemove.parentNode.removeChild(glassCtrToRemove);
    }

    // Aggiungo 4 bicchieri ai due scaffali centrali
    for (let i = 0; i < 5; i++) {
      const glass = document.getElementById("glass_water");

      const glassCloneBox1 = glass.cloneNode(true);
      const glassCloneBox2 = glass.cloneNode(true);

      box1.appendChild(glassCloneBox1);
      box2.appendChild(glassCloneBox2);
    }
  }, 1000); // Ritardo di 1 secondo per far scomparire completamente il titolo

  // Faccio sparire il pulsante PLAY NOW
  playButton.style.display = "none";

  //l'ok per far partire il microfono
  gameStarted = true;
}

function duplicateBox() {
  // Duplico il box con i bicchieri d'acqua
  const boxWater1 = document.getElementById("box_water").cloneNode(true);
  const boxWater2 = document.getElementById("box_water").cloneNode(true);

  // Applica il CSS per l'animazione direttamente ai box duplicati
  boxWater1.style.transition = "transform 1.80s ease";
  boxWater1.style.transform = "translateY(-144px)";
  boxWater2.style.transition = "transform 1.80s ease";
  boxWater2.style.transform = "translateY(-144px)";

  // Aggiungo i box duplicati al div "vetrina"
  const vetrina = document.getElementById("vetrina");
  vetrina.appendChild(boxWater1);
  vetrina.appendChild(boxWater2);

  // Animazione per l'allungamento delle mensole verticali
  let mensolaDX = document.getElementById("mensolaDX");
  mensolaDX.style.width = "300px"; // Larghezza iniziale
  mensolaDX.style.transition = "width 2.1s ease"; // Animazione di transizione
  mensolaDX.offsetHeight; // Trucco per far partire l'animazione
  mensolaDX.style.width = "444px"; // Larghezza finale

  let mensolaSX = document.getElementById("mensolaSX");
  mensolaSX.style.width = "300px"; // Larghezza iniziale
  mensolaSX.style.transition = "width 2.1s ease"; // Animazione di transizione
  mensolaSX.offsetHeight; // Trucco per far partire l'animazione
  mensolaSX.style.width = "444px"; // Larghezza finale

  // Avvia l'animazione verso il basso dopo un breve ritardo
  setTimeout(() => {
    boxWater1.style.transform = "translateY(0)";
    boxWater2.style.transform = "translateY(0)";
  }, 100); // Ritardo di 100 millisecondi per consentire la resa iniziale prima dell'animazione
}

// LIBRERIA P5 JS
let mic, analyzer, level;
// Contatore per tener traccia del numero di crepe
function setup() {
  mic = new p5.AudioIn();
  mic.start();
}
function draw() {
  if (gameStarted) {
    getAudioContext().resume();
    //prendo il livello del volume del mic
    level = mic.getLevel();
    // Seleziona il contenitore del bicchiere
    let glasses = document.getElementsByClassName("glass_ctr");
    if (level * 100 > 20 && level * 100 < 50) {
      let num = Math.ceil(Math.random() * glasses.length - 1);

      let glass = glasses[num];

      console.log(glass);

      let cracks = parseInt(glass.dataset["cracks"]);

      if (cracks < 2) {
        glass.dataset.cracks = cracks + 1;
      }
    }
  }
}
