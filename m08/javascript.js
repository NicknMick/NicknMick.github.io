function addItem()
{
    var newElement = document.createElement('li');
    var newText = document.createTextNode(document.getElementById("itemName").value);
    newElement.appendChild(newText);
    var position = document.getElementsByTagName('ul')[0];
    position.appendChild(newElement);
}
