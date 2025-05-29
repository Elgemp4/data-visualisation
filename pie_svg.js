const main = async () => {
    const colors = ["#FF5733", "#FFC300", "#3498DB", "#27AE60"];

    const pie_chart = document.querySelector(".pie_chart");
    const pie_label = document.querySelector(".pie_label");

    const result = await fetch("/data.json");

    const data = await result.json();


    let previousAngle = 0;
    let index = 0;

    const centerX = 250;
    const centerY = 250;
    const radius = 250;    

    for(const element of data){
        const angle = previousAngle + element.value / 100.0 * 360;
        const [startX, startY] = calculatePointOnCircle(previousAngle, centerX, centerY, radius);
        const [endX, endY] = calculatePointOnCircle(angle, centerX, centerY, radius);
        const pathData = [
            `M${centerX} ${centerY}`,
            `L${startX} ${startY}`,
            `A${radius} ${radius} 0 ${Math.abs(angle - previousAngle) > 180 ? 1 : 0} 1 ${endX} ${endY}`,
        ]
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        path.setAttribute("d", pathData);
        path.setAttribute("fill", colors[index]);
        path.setAttribute("data-name", element.name);
        path.setAttribute("class", `path-${element.name}`)
        pie_chart.appendChild(path);


        pie_label.innerHTML+= `<li data-name=${element.name}>${element.name} (${element.value}%)</li>`

        index++;
        previousAngle = angle;
    }

    const dataNamesElements = document.querySelectorAll("[data-name]");

    for(const element of dataNamesElements) {
        element.addEventListener("mouseenter", (e) => {
            const allElements = document.querySelectorAll(`[data-name=${element.dataset.name}]`);
            console.log(allElements)
            allElements.forEach((e) => e.classList.add("selected"));
        })

        element.addEventListener("mouseout", (e) => {
            const allElements = document.querySelectorAll(`[data-name=${element.dataset.name}]`);
            allElements.forEach((e) => e.classList.remove("selected"));
        })
    }
}

const calculatePointOnCircle = (angle, centerX, centerY, radius) => {
    const angleInRadians = (angle - 90) * Math.PI / 180;

    const x = centerX + radius * Math.cos(angleInRadians);
    const y = centerY + radius * Math.sin(angleInRadians);

    return [x, y];
}


main();