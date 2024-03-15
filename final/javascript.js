function isValid() {
    if (Name() && Email())
        return true;
    else
        document.getElementById("submiterror").innerHTML = "<p><strong>Error Submitting — See Above</strong></p>";
    event.preventDefault();
    return false;
}

function Name(){
    //1) Create variable
    var validFirstname=false;

    //2) read value from HTML
    var firstname = document.getElementById("Name").value;
    var errorMessages = "";

    //3) Do validation
    if (firstname==="null" || firstname==="" || firstname.length > 20 ) {
        errorMessages += "<p>The name is required and cannot be greater than 20 characters</p>";
        console.log("First name invalid — length")
    } else if (firstname.match("^[a-zA-Z ,.'-]+$")===null) {
        errorMessages += "<p>Invalid character in last name (accepts only A-Z, a-z, and ,.'-)</p>";
        console.log("First name invalid — bad characters")
    } else {
        validFirstname = true;
        console.log("First name valid")
    }

    //4) Send error message to HTML
    document.getElementById("fname").innerHTML = errorMessages;

    //5) return status of each field
    return (validFirstname);
}

function Email()
{
    var userEmail = document.getElementById("Email").value;
    var validEmail = false;
    var atpos = userEmail.indexOf("@");
    var dotpos = userEmail.lastIndexOf(".");
    var errorMessages = "";

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= userEmail.length) {
        // send error message. For example:  errorMessages = "<p>Invalid email</p>";
        errorMessages += "<p>Invalid Email</p>";
    }
    else {
        validEmail = true; //Or assign the value to a variable. For example validEmail = true
    }
    document.getElementById("fname").innerHTML = errorMessages;
    return (validEmail);
}