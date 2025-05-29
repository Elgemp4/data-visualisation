const main = async () => {
    const colors = ["#FF5733", "#FFC300", "#3498DB", "#27AE60"];

    //The svg element
    const pie_chart = document.querySelector(".pie_chart");

    //THe labels
    const pie_label = document.querySelector(".pie_label");

    //Getting the json data
    const result = await fetch("/data.json");
    const data = await result.json();

    //Used to know which was the previous angle of the precedent section
    let previousAngle = 0;
    let index = 0;

    //Center and radius of the pie chart
    const centerX = pie_chart.viewBox.baseVal.width / 2;
    const centerY = pie_chart.viewBox.baseVal.height / 2;
    const radius = pie_chart.viewBox.baseVal.width / 2;    

    //Loop on array element
    for(const element of data){
        //Calculate the end angle for the current seciton
        const endAngle = previousAngle + element.value / 100.0 * 360;
        //Get the coordinates of the start of the slice
        const [startX, startY] = calculatePointOnCircle(previousAngle, centerX, centerY, radius);
        //Get the coordinated of the end of the slice
        const [endX, endY] = calculatePointOnCircle(endAngle, centerX, centerY, radius);
        //Move to center
        //Trace Line to startX startY
        //Do an arc of circle with the pie chart radius 0 for circle the big arc flag calculated if the portion is bigger than 180 degree 
        // 1 flag for clockwise rotation and the coordinates of the end of the slice
        const pathData = [
            `M${centerX} ${centerY}`,
            `L${startX} ${startY}`,
            `A${radius} ${radius} 0 ${Math.abs(endAngle - previousAngle) > 180 ? 1 : 0} 1 ${endX} ${endY}`,
        ]

        //Create the path element
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        //Set path attribute and append the path to SVG
        path.setAttribute("d", pathData);
        path.setAttribute("fill", colors[index]);
        path.setAttribute("data-name", element.name);
        path.setAttribute("class", `path-${element.name}`)
        pie_chart.appendChild(path);

        //Add li element to label list
        pie_label.innerHTML+= `<li data-name=${element.name}>${element.name} (${element.value}%)</li>`

        index++;
        previousAngle = endAngle;
    }

    //Get all the element with data-name attributes
    const dataNamesElements = document.querySelectorAll("[data-name]");

    for(const element of dataNamesElements) {
        //Add selection effect on all other element with the same data-name on hover
        element.addEventListener("mouseenter", (e) => {
            const allElements = document.querySelectorAll(`[data-name=${element.dataset.name}]`);
            console.log(allElements)
            allElements.forEach((e) => e.classList.add("selected"));
        })

        //Remove selection effect on all other element with the same data-name on hover leave
        element.addEventListener("mouseout", (e) => {
            const allElements = document.querySelectorAll(`[data-name=${element.dataset.name}]`);
            allElements.forEach((e) => e.classList.remove("selected"));
        })
    }
}

//Used to calculate the coordinates of the angle on the circle perimeter
const calculatePointOnCircle = (angle, centerX, centerY, radius) => {
    //Conversion for degree to radians
    const angleInRadians = (angle - 90) * Math.PI / 180;

    //Using cos to get the X coordinate
    const x = centerX + radius * Math.cos(angleInRadians);
    //Using sing to get the Y coordinate
    const y = centerY + radius * Math.sin(angleInRadians);

    return [x, y];
}


main();