var  mybutton = document.querySelector("button");
mybutton.addEventListener("click", function(event) {
    var element = document.getElementsByClassName("dot");
    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }

// Let us stop the propagation of events
    event.stopPropagation();
});
addEventListener("click", function(event) {
    var dot = document.createElement("div");
    var dotColor = document.getElementById("Color");
    var dotSize = document.getElementById("dotSize");
    if (document.getElementById("Customizing").contains(event.target) === false)
    {
        dot.className = "dot";
        dot.style.background = dotColor.value;
        dot.style.width = dotSize.value + "px";
        dot.style.height = dotSize.value + "px";
        dot.style.left = (event.pageX - 4) + "px";
        dot.style.top = (event.pageY - 4) + "px";
        document.body.appendChild(dot);
    }

});