//Script que controla el funcionamiento de la página
//Nota: hacer que el contenedor del consejo tenga una altura minima, asi cuando sale
//Cargando consejo... no se ve bajito y sigue siendo estetico
//Tambien se podria reemplazar el texto por un circulo de cargando o algo asi, es a preferencia de diseño

const adviceNumber = document.getElementById("Advice_Number");
const adviceText = document.getElementById("Advice_Text");
const randomizerButton = document.getElementById("Randomizer_Button")

document.addEventListener('DOMContentLoaded', () => {
    setAdvice();
});

randomizerButton.addEventListener("click", async(e) => {

    e.preventDefault();

    await setAdvice();

});

const setAdvice = async() => {

        adviceText.textContent = "Cargando consejo...";

        //Al presionar el boton cambiamos su estilo a desabilidado, agregar css de desabilidado
        randomizerButton.disabled = true;
        randomizerButton.style = "background-color: #52ffa8;";

        //Despues de dos segundos despues de presionar el boton, lo habilidatos de nuevo, agregar css de habilitado
        //Esto se hace debido a que la API hace que si el boton es presionado de nuevo antes de 2 segundos, da el mismo consejo
        setTimeout(() => {
            randomizerButton.style = "background-color: #52ffa8;";
            randomizerButton.disabled = false;
        }, 2000);

        const { slip_id, advice } = await getAdvice();

        adviceNumber.textContent = slip_id;
        adviceText.textContent = advice;

};

const getAdvice = async() => {

    const res = await fetch('https://api.adviceslip.com/advice')

    const data = await res.json();

    if(!data.slip || !data.slip.id || !data.slip.advice){
        adviceNumber.textContent = "N/A";
        adviceText.textContent = "Ocurrio un error al encontrar el consejo";
        return
    }

    const { id: slip_id, advice } = data.slip;

    return { slip_id, advice };

};