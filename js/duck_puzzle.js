const lightEl = document.querySelector("#light");

function handleMouseMove(event) {
    const { clientX, clientY } = event;

    lightEl.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 10px, #000000ee 100px)`;
}

document.addEventListener("mousemove", handleMouseMove)