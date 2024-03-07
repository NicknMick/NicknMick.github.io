var backB = document.getElementById("backButton");
var nextB = document.getElementById("nextButton");
var image = document.getElementById("image");
var description = document.getElementById("description");

var count = 1;

setInterval(function() {nextB.click()}, 5000);
nextB.addEventListener("click", function(event) {
    count++;
    if (count === 6) {
        count = 1
    }
    if (count === 2) {
        image.src = "images/TrackPoleVault.jpg";
        image.alt = "Track Pole Vault";
        description.innerText = "This is pole vault, where you attempt to push your body as high as you can with a pole.";
    }
    else if (count === 3) {
        image.src = "images/TrackRelay.jpg";
        image.alt = "Track Relay";
        description.innerText = "This is the 4x100 relay, where a team of 4 athletes each run 100 meter, passing a baton each time."
    }
    else if (count === 4) {
        image.src = "images/TrackTripleJump.jpg";
        image.alt = "Track Triple Jump";
        description.innerText = "This is triple jump, where you jump 3 times before launching yourself into a sand pit for distance."
    }
    else if (count === 5) {
        image.src = "images/TrackLongJump.jpg";
        image.alt = "Track Long Jump";
        description.innerText = "This is long jump, where you jump as far as you possibly can."
    }
    else if (count === 1) {
        image.src = "images/Track100Meter.jpg";
        image.alt = "Track 100 Meter";
        description.innerText = "This is the 100-meter dash, where you sprint all out for 100 meters.";
    }

    event.stopPropagation();
})

backB.addEventListener("click", function(event) {
    count--;
    if (count === 0) {
        count = 5;
    }
    if (count === 2) {
        image.src = "images/TrackPoleVault.jpg";
        image.alt = "Track Pole Vault";
        description.innerText = "This is pole vault, where you attempt to push your body as high as you can with a pole.";
    }
    else if (count === 3) {
        image.src = "images/TrackRelay.jpg";
        image.alt = "Track Relay";
        description.innerText = "This is the 4x100 relay, where a team of 4 athletes each run 100 meter, passing a baton each time."
    }
    else if (count === 4) {
        image.src = "images/TrackTripleJump.jpg";
        image.alt = "Track Triple Jump";
        description.innerText = "This is triple jump, where you jump 3 times before launching yourself into a sand pit for distance."
    }
    else if (count === 5) {
        image.src = "images/TrackLongJump.jpg";
        image.alt = "Track Long Jump";
        description.innerText = "This is long jump, where you jump as far as you possibly can."
    }
    else if (count === 1) {
        image.src = "images/Track100Meter.jpg";
        image.alt = "Track 100 Meter";
        description.innerText = "This is the 100-meter dash, where you sprint all out for 100 meters.";
    }

    event.stopPropagation();
})