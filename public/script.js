var graph1 = document.getElementById("graphQuestion1");
var graph2 = document.getElementById("graphQuestion2");
var graph3 = document.getElementById("graphQuestion3");


let url = ('http://localhost:3000/api');
fetch(url)
    .then(response => response.json())
    .then(data => {

        initGraph(graph1);
        initGraph(graph2);
        initGraph(graph3);

        drawBars(data);
        // drawBars(graph2, data.answerTwo);
        // drawBars(graph3, data.answerThree);
    });

//600 = 120 increments
//300 = 75 increments
const initGraph = (canvas) => {
    var ctx = canvas.getContext("2d");
    ctx.moveTo(120, 0);
    ctx.lineTo(120, 300);
    ctx.stroke();
    ctx.moveTo(0, 225);
    ctx.lineTo(600, 225);
    ctx.stroke();
    ctx.moveTo(120, 120);
    ctx.font = "16px Arial";
    ctx.fillText("100%", 10, 20);
    ctx.fillText("75%", 10, 70);
    ctx.fillText("50%", 10, 120);
    ctx.fillText("25%", 10, 170);
    ctx.fillText("0%", 10, 220);
}

// 216 - 312 - 408 - 504
const drawBars = (data) => {

    var ctx = graph1.getContext("2d");

    var total = data.answerOne.Dog + data.answerOne.Cat + data.answerOne.Turtle + data.answerOne.Buffalo; 
    
    ctx.fillText("Dog", 216, 265);
    ctx.fillRect(216, 225, 40, -((data.answerOne.Dog/total) * 225));
    
    ctx.fillText("Cat", 312, 265);
    ctx.fillRect(312, 225, 40, -((data.answerOne.Cat/total) * 225));

    ctx.fillText("Turtle", 408, 265);
    ctx.fillRect(408, 225, 40, -(data.answerOne.Turtle/total * 225));
    
    ctx.fillText("Buffalo", 504, 265);
    ctx.fillRect(504, 225, 40, -(data.answerOne.Buffalo/total * 225));


    var ctx = graph2.getContext("2d");    

    ctx.fillText("Pizza", 216, 265);
    ctx.fillRect(216, 225, 40, -((data.answerTwo.Pizza/total) * 225));
    
    ctx.fillText("Hamburgers", 312, 265);
    ctx.fillRect(312, 225, 40, -((data.answerTwo.Hamburgers/total) * 225));

    ctx.fillText("Tacos", 408, 265);
    ctx.fillRect(408, 225, 40, -((data.answerTwo.Tacos/total) * 225));

    ctx.fillText("Chicken Sandwich", 504, 265, 96);
    ctx.fillRect(504, 225, 40, -((data.answerTwo['Chicken Sandwich']/total) * 225));


    var ctx = graph3.getContext("2d");
    
    ctx.fillText("Red", 216, 265);
    ctx.fillRect(216, 225, 40, -((data.answerThree.Red/total) * 225));
    
    ctx.fillText("Blue", 312, 265);
    ctx.fillRect(312, 225, 40, -((data.answerThree.Blue/total) * 225));

    ctx.fillText("Yellow", 408, 265);
    ctx.fillRect(408, 225, 40, -((data.answerThree.Yellow/total) * 225));

    ctx.fillText("Green", 504, 265);
    ctx.fillRect(504, 225, 40, -((data.answerThree.Green/total) * 225));
}