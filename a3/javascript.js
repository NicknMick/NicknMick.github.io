var rHeight = 5;
var colorEven = "orange"
var colorOdd = "black";
var symbol = "*"

function createRhombus(pHeight, pColorEven, pColorOdd, pSymbol)
{
    upLeft(pHeight, pColorEven, pColorOdd, pSymbol);
    upRight(pHeight, pColorEven, pColorOdd, pSymbol);
    downLeft(pHeight, pColorEven, pColorOdd, pSymbol);
    downRight(pHeight, pColorEven, pColorOdd, pSymbol);
}

function upRight(pHeight, pColorEven, pColorOdd, pSymbol)
{
    var rLine = "";
    for (i=0; i < pHeight; i++)
    {
        rLine = rLine + "<p>";
        //Create each line of the Rhombus
        for (n=0; n <= i; n++)
        {
            //Is the position even or odd, so we can change the color
            if (n%2)
                //even
                rLine = rLine + "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
            else
                //odd
                rLine = rLine + "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";
        }
        rLine = rLine + "</p>";
        console.log(rLine)
    }
    document.getElementById("upRight").innerHTML = rLine;
}

function upLeft(pHeight, pColorEven, pColorOdd, pSymbol) {
    var rLine = "";
    for (i = 0; i < pHeight; i++) {
        rLine = rLine + "<p>";

        // Add spaces to slant the text to the left
        for (var j = 0; j < pHeight - i - 1; j++) {
            rLine += "&nbsp;&nbsp;"; // Adding two non-breaking spaces for each missing symbol
        }

        // Create each line of the Rhombus
        for (n = 0; n <= i; n++) {
            // Is the position even or odd, so we can change the color
            if (n % 2)
                // even
                rLine = rLine + "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
            else
                // odd
                rLine = rLine + "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";
        }
        rLine = rLine + "</p>";
    }
    document.getElementById("upLeft").innerHTML = rLine;
}

function downLeft(pHeight, pColorEven, pColorOdd, pSymbol)
{
    var rLine = "";
    for (i = pHeight; i > 0; i--) {
        rLine = rLine + "<p>";

        // Add spaces to slant the text to the right
        for (var j = pHeight - i; j > 0; j--) {
            rLine += "&nbsp;&nbsp;";
        }

        // Create each line of the Rhombus
        for (n = 0; n < i; n++) {
            // Is the position even or odd, so we can change the color
            if (n % 2)
                // even
                rLine = rLine + "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
            else
                // odd
                rLine = rLine + "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";
        }
        rLine = rLine + "</p>";
    }
    document.getElementById("downleft").innerHTML = rLine;
}
function downRight(pHeight, pColorEven, pColorOdd, pSymbol)
{
    var rLine = "";
    for (i=pHeight; i > 0; i--)
    {
        rLine = rLine + "<p>";
        //Create each line of the Rhombus
        for (n=0; n < i; n++)
        {
            //Is the position even or odd, so we can change the color
            if (n%2)
                //even
                rLine = rLine + "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
            else
                //odd
                rLine = rLine + "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";
        }
        rLine = rLine + "</p>";
    }
    document.getElementById("downRight").innerHTML = rLine;
}