function isValid() {
    if (firstName() && lastName() && email() && phone() && username() && password() && address() && city() && country() && userState() && zipcode())
        return true;
    else
        document.getElementById("submiterror").innerHTML = "<p><strong>Error Submitting — See Above</strong></p>";
    event.preventDefault();
    return false;
}


function firstName(){
    //1) Create variable
    var validFirstname=false;

    //2) read value from HTML
    var firstname = document.getElementById("FirstName").value;
    var errorMessages = "";

    //3) Do validation
    if (firstname==="null" || firstname==="" || firstname.length > 20 ) {
        errorMessages += "<p>The first name is required and cannot be greater than 20 characters</p>";
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

function lastName()
{
    var validLastName = false;

    var lastname = document.getElementById("LastName").value;
    var errorMessages = "";

    if (lastname==="null" || lastname==="" || lastname.length > 50 ) {
        errorMessages += "<p>The last name is required and cannot be greater than 50 characters</p>";
        console.log("Last name invalid — length")
    } else if (lastname.match("^[a-zA-Z ,.'-]+$")===null) {
        errorMessages += "<p>Invalid character in last name (accepts only A-Z, a-z, and ,.'-)</p>";
        console.log("Last name invalid — bad characters")
    } else {
        validLastName = true;
        console.log("Last name valid")
    }
    document.getElementById("fname").innerHTML = errorMessages;
    return (validLastName);
}

function email()
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

function phone()
{
    var userPhone = document.getElementById("Phone").value;
    var validPhoneNum = false;
    var errorMessages = "";
    if (isNaN(userPhone) || userPhone.length > 15 || userPhone===null || userPhone==="")
    {
        errorMessages += "<p>Invalid Phone Number</p>";
    }
    else
    {
        validPhoneNum = true;
    }
    document.getElementById("fname").innerHTML = errorMessages;
    return (validPhoneNum);
}

function username()
{
    var userName = document.getElementById("Username").value;
    var validUsername = false;
    var errorMessages = "";

    if (userName.length > 12 || userName === "" || userName === null) {
        errorMessages += "<p>Invalid Username or Username Too Long</p>";
    }
    else {
        validUsername = true;
    }
    document.getElementById("fname").innerHTML = errorMessages;
    return (validUsername);
}

function password()
{
    var passWord = document.getElementById("Password").value;
    var validPassword = false;
    var errorMessages = "";

    if (passWord.length > 7 || passWord === "" || passWord === null) {
        errorMessages += "<p>Invalid Password or Password Too Long</p>";
    }
    else {
        validPassword = true;
    }
    document.getElementById("fname").innerHTML = errorMessages;
    return (validPassword);
}

function address()
{
    var userAddress = document.getElementById("Address").value;
    var validAddress = false;
    var errorMessages = "";

    if (userAddress === null || userAddress === "") {
        errorMessages += "<p>Invalid Address</p>";
    }
    else {
        validAddress = true;
    }
    document.getElementById("fname").innerHTML = errorMessages;
    return (validAddress);
}

function city()
{
    var userCity = document.getElementById("City").value;
    var validCity = false;
    var errorMessages = "";

    if (userCity === null || userCity === "") {
        errorMessages += "<p>Invalid City</p>";
    }
    else {
        validCity = true;
    }
    document.getElementById("fname").innerHTML = errorMessages;
    return (validCity);
}

function country()
{
    var userCountry = document.getElementById("Country").value;
    var validCountry = false;
    var errorMessages = "";

    if (userCountry === "000") {
        errorMessages += "<p>Please Pick a Country</p>";
    }
    else {
        validCountry = true;
    }
    document.getElementById("fname").innerHTML = errorMessages;
    return (validCountry);
}

function userState()
{
    var state = document.getElementById("State").value;
    var validState = false;
    var errorMessages = "";

    if (state === "000") {
        errorMessages += "<p>Please Pick a State</p>";
    }
    else {
        validState = true;
    }
    document.getElementById("fname").innerHTML = errorMessages;
    return (validState);
}

function zipcode()
{
    var userZipcode = document.getElementById("Zipcode").value;
    var country = document.getElementById("Country").value;
    var validZipcode = false;
    var errorMessages = "";

    if (country === "United States") {
        if (userZipcode.length > 5 || userZipcode === "" || userZipcode === null)
        {
            errorMessages += "<p>Invalid Zipcode</p>";
        }
        else
        {
            validZipcode = true;
        }
    }
    else {
        validZipcode = true;
    }
    document.getElementById("fname").innerHTML = errorMessages;
    return (validZipcode);
}
