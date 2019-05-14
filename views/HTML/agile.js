//Changing Images
function changeImage(){
    var image = document.getElementById('myImage');
    if (image.src.match("../Images/pipo-enemy005.png")){
        image.src = "../Images/pipo-enemy002.png";
    }
    else if(image.src.match("../Images/pipo-enemy002.png")){
        image.src = "../Images/pipo-enemy012.png";
    }
    else if(image.src.match("../Images/pipo-enemy012.png")) {
        image.src = "../Images/pipo-enemy006.png";
    }
    else if(image.src.match("../Images/pipo-enemy006.png")) {
        image.src = "../Images/pipo-enemy014a.png";
    }
    else if(image.src.match("../Images/pipo-enemy014a.png")) {
        image.src = "../Images/pipo-enemy011.png";
    }
    else if(image.src.match("../Images/pipo-enemy011.png")) {
        image.src = "../Images/pipo-enemy016b.png";
    }
    else if(image.src.match("../Images/pipo-enemy016b.png")) {
        image.src = "../Images/pipo-enemy020a.png";
    }
    else if(image.src.match("../Images/pipo-enemy020a.png")) {
        image.src = "../Images/pipo-enemy015a.png";
    }
    else if(image.src.match("../Images/pipo-enemy015a.png")) {
        image.src = "../Images/pipo-enemy019.png";
    }
    else if(image.src.match("../Images/pipo-enemy019.png")) {
        image.src = "../Images/pipo-enemy025.png";
    }
    else if(image.src.match("../Images/pipo-enemy025.png")) {
        image.src = "../Images/pipo-enemy024b.png";
    }
    else if(image.src.match("../Images/pipo-enemy024b.png")) {
        image.src = "../Images/pipo-enemy022.png";
    }
    else if(image.src.match("../Images/pipo-enemy022.png")) {
        image.src = "../Images/pipo-enemy023.png";
    }
    else if(image.src.match("../Images/pipo-enemy023.png")) {
        image.src = "../Images/pipo-enemy021a.png";
    }
    else if(image.src.match("../Images/pipo-enemy021a.png")) {
        image.src = "../Images/pipo-enemy026b.png";
    }
    else if(image.src.match("../Images/pipo-enemy026b.png")) {
    }
    else{
        image.src = "../Images/pipo-enemy005.png";
    }
}
//Agile1.html modal and close
function upgrade() {
    var mymodal = document.querySelector('.bg-modal');
    mymodal.style.visibility = 'visible';
    mymodal.style.opacity = '1';
}
function upgrade2() {
    var mymodal = document.querySelector('.bg-modal2');
    mymodal.style.visibility = 'visible';
    mymodal.style.opacity = '1';
}
function upgrade3() {
    var mymodal = document.querySelector('.bg-modal3');
    mymodal.style.visibility = 'visible';
    mymodal.style.opacity = '1';
}

function close() {
    var mymodal2 = document.querySelector('.bg-modal');
    mymodal2.style.visibility = 'hidden';
    mymodal2.style.opacity = '0';
}