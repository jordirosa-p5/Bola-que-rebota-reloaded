let xCercle, yCercle;
let xRect;
let bolaBaixa = true;
let bolaDreta = true;
let velocitat = 4;
let vides = 5;
let dibuixaTret = false;
//let posXTret, posYTret;
//let tret = { 
//    x : -1,
//    y : -1
//}
let trets = [];

let imgBola, imgFons;

function preload() {
    imgBola = loadImage('img/bola.png');
    imgFons = loadImage('img/nebula.jpg');
}

function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);

    //background(220, 65, 145);    
    xCercle = width / 2;
    yCercle = 0;

    xRect = width / 2;
}

function draw() {
    // put drawing code here
    background(220, 65, 145);
    imageMode(CORNER);
    image(imgFons, 0, 0, width, height);


    if (vides > 0) {

        if (dibuixaTret) {
            stroke(255);

            for (let i = 0; i < trets.length; i++) {
                
                let tret = trets[i];
                
                line(tret.x, tret.y, tret.x, tret.y - 5);

                tret.y = tret.y - 10;

                if (tret.x >= xCercle - 20 &&
                    tret.x <= xCercle + 20 &&
                    tret.y >= yCercle - 20 &&
                    tret.y <= yCercle + 20) {
                    //alert("Yuhuuuu");
                    dibuixaTret = false;
                    xCercle = width / 2;
                    yCercle = 0;
                    vides = vides + 1;
                    document.getElementById("divVides").innerHTML = "<p>" + vides + "</p>";
                }
            }


        }

        let vermell, verd, blau;
        vermell = (xCercle / width) * 255;
        verd = (yCercle / height) * 255;
        blau = frameCount % 256;

        fill(vermell, verd, blau, 120);
        noStroke();
        circle(xCercle, yCercle, 40);
        imageMode(CENTER);
        image(imgBola, xCercle, yCercle, 40, 40);


        if (keyIsDown(LEFT_ARROW)) {
            xRect = xRect - 10;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            xRect += 10;
        }


        fill(206, 147, 216);
        rect(xRect, height - 25, 100, 20);

        if (bolaDreta) {
            // Moviment cap a la dreta
            if (xCercle < width) {
                xCercle = xCercle + velocitat;
            } else {
                bolaDreta = false;
            }
        } else {
            // Moviment cap a l'esquerra
            if (xCercle > 0) {
                xCercle = xCercle - velocitat;
            } else {
                bolaDreta = true;
            }
        }


        // Adalt i abaix
        if (bolaBaixa) {
            //codi per què baixi
            // Fer que baixi
            if (yCercle < height - 45) {
                yCercle = yCercle + velocitat;
            } else {
                //Bola abaix de tot
                if (xCercle >= xRect && xCercle <= xRect + 75) {
                    //Bola toca al rectangle
                    bolaBaixa = false;
                } else {
                    //Bola surt per abaix =>> perd una vida!!
                    yCercle = 0;
                    //velocitat+=1;
                    vides--;
                    document.getElementById("divVides").innerHTML = "<p>" + vides + "</p>";
                }
            }
        } else {
            //codi per què puji
            // Fer que puji
            if (yCercle > 0) {
                yCercle = yCercle - velocitat;
            } else {
                bolaBaixa = true;
            }
        }
    }

    //circle( mouseX, mouseY, 45);

    //ellipse( 400, 200, 100, 20);

    //triangle(500,20, mouseX, mouseY, 300, 190);
}


function keyPressed() {
    if (key === " ") {
        dispara(xRect + 50);
    }
}


function mouseMoved() {
    xRect = mouseX;
}

function dispara(posTretParametre) {
    let tret = {
        x: posTretParametre,
        y: height - 25
    }

    trets.push(tret);

    dibuixaTret = true;


}
