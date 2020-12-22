var pieChartCanvas = document.getElementById("pieChartCanvas");
pieChartCanvas.width = 300;
pieChartCanvas.height = 400;
var donutChartCanvas = document.getElementById("donutChartCanvas");
donutChartCanvas.width = 300;
donutChartCanvas.height = 400;

var btnDraw = document.getElementById("btnDraw");
btnDraw.addEventListener("click", startDrawing);

var displayArea = document.getElementById("displayAreaContent");

var firstSubName = document.getElementById("firstSubName");
var firstSubValue = document.getElementById("firstSubValue");
var firstSubColor = document.getElementById("firstSubColor");

var secondSubName = document.getElementById("secondSubName");
var secondSubValue = document.getElementById("secondSubValue");
var secondSubColor = document.getElementById("secondSubColor");

var thirdSubName = document.getElementById("thirdSubName");
var thirdSubValue = document.getElementById("thirdSubValue");
var thirdSubColor = document.getElementById("thirdSubColor");

var fourthSubName = document.getElementById("fourthSubName");
var fourthSubValue = document.getElementById("fourthSubValue");
var fourthSubColor = document.getElementById("fourthSubColor");

var pieChart = document.getElementById("pie");
var donutChart = document.getElementById("donut");

var axisXLine = document.getElementById("gAxisXLine");
var axisXBar = document.getElementById("gAxisXBar");

var lineChart = document.getElementById("line");
var barChart = document.getElementById("bar");

var donut =false;
var pie = false;

var PieChart = function (subObject) {
  this.subObject = subObject;
  this.canvas = subObject.currCanvas;
  this.ctx = this.canvas.getContext("2d");
  this.donutCanvas = subObject.donutCanvas;
  this.ctxDonut = this.donutCanvas.getContext("2d");

  
  var subObj = {
    "First Value": firstSubValue.value,
    "Second Value": secondSubValue.value,
    "Third Value": thirdSubValue.value,
    "Fourth Value": fourthSubValue.value,
  };
  var subNamesArr = [
    firstSubName.value,
    secondSubName.value,
    thirdSubName.value,
    fourthSubName.value,
  ];
  var colorsArr = [
    firstSubColor.value,
    secondSubColor.value,
    thirdSubColor.value,
    fourthSubColor.value,
  ];

  var total =
    Number(firstSubValue.value) +
    Number(secondSubValue.value) +
    Number(thirdSubValue.value) +
    Number(fourthSubValue.value);

  var percentageArr = [
    ((firstSubValue.value / total) * 100).toFixed(1) + "%",
    ((secondSubValue.value / total) * 100).toFixed(1) + "%",
    ((thirdSubValue.value / total) * 100).toFixed(1) + "%",
    ((fourthSubValue.value / total) * 100).toFixed(1) + "%",
  ];



  this.draw = function () {
    if(this.validate()){
      this.drawArcData();
      this.drawSVGLine();
    }
    
  }


  this.validate = function () {

    var checkedChart = document.querySelectorAll('input[type="checkbox"]:checked');
    document.getElementById('error-messages').innerHTML="";
    var pattern = /^[a-zA-Z]+$/;
    var valid = true;
  
    // checkboxes 
    if(checkedChart.length < 1){
      var chartErr = document.createElement("p");
      var sportErrText = document.createTextNode("Please select at least one chart");
      chartErr.appendChild(sportErrText);
      var divErr = document.getElementById("error-messages");
      divErr.append(chartErr);
      valid = false;
  }

  // Names 
    if(!firstSubName.value || !secondSubName.value || !thirdSubName.value || !fourthSubName.value){
        var nameErr = document.createElement("p");
        var nameErrText = document.createTextNode("Please add all subjects list");
        nameErr.appendChild(nameErrText);
        var divErr = document.getElementById("error-messages");
        divErr.append(nameErr);
        valid = false;
    }
    else if(!pattern.test(firstSubName.value) || !pattern.test(secondSubName.value) || !pattern.test(thirdSubName.value) || !pattern.test(fourthSubName.value) ){

      var passErr = document.createElement("p");
      var passErrText = document.createTextNode("Only letters are allowed in subject name");
      passErr.appendChild(passErrText);
      var divErr = document.getElementById("error-messages");
      divErr.append(passErr);
      valid = false;    
  }


// Values 
      if(!firstSubValue.value || !secondSubValue.value || !thirdSubValue.value || !fourthSubValue.value){
        var emailErr = document.createElement("p");
        var emailErrText = document.createTextNode("Please add all subjects values");
        emailErr.appendChild(emailErrText);
        var divErr = document.getElementById("error-messages");
        divErr.append(emailErr);
        valid = false;
    }

    else if(total == 0){
      var emailErr = document.createElement("p");
      var emailErrText = document.createTextNode("Please add at least one value > 0");
      emailErr.appendChild(emailErrText);
      var divErr = document.getElementById("error-messages");
      divErr.append(emailErr);
      valid = false;
  }

    return valid;
  }



// collect data
  this.drawArcData = function () {
    var colorIndex = 0;
    var totalValues = 0;
    if(donutChart.checked){
      donut = true;
    }

    if(pieChart.checked){
      pie=true;
    }
    for (var obj in subObj) {
      var eachValue = Number(subObj[obj]);
      totalValues += eachValue;
    }

    var startAngel = 0;
    for (obj in subObj) {
      eachValue = subObj[obj];
      var eachAngel = (2 * Math.PI * eachValue) / totalValues;
      var eachPercentage = ((eachValue/totalValues)*100).toFixed(1);
      var eachColor = colorsArr[colorIndex];
      var textX = (this.canvas.width / 2) + (this.canvas.width / 3) * Math.cos(startAngel+eachAngel/2); 
      var textY = (this.canvas.height / 2) + (this.canvas.height / 3) * Math.sin(startAngel+eachAngel/2); 
      
      console.log(textX);
      console.log(textY);

      this.drawArc(
        this.ctx,
        this.ctxDonut,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        startAngel,
        startAngel + eachAngel,
        eachColor,
        textX,
        textY,
        eachPercentage
      );
      colorIndex++;
      startAngel += eachAngel;
    }

    if (this.subObject.displayAreaContent) {

      var contentArea = "";
      for (var temp = 0; temp < 4; temp++) {
        contentArea +=
          "<div><span style='display:inline-block;width:20px;background-color:" +
          colorsArr[temp] +
          ";'> &nbsp; </span> &emsp; " +
          subNamesArr[temp] +
          "&emsp;" +
          percentageArr[temp]+ "</div>";
      }
      this.subObject.displayAreaContent.innerHTML = contentArea;
    }


  };

  this.drawArc = function (
    ctx,
    ctxDonut,
    centerX,
    centerY,
    radius,
    startAngle,
    eachAngel,
    eachColor,
    textX,
    textY,
    percentage
  ) {


    if(pie){
      ctx.fillStyle = eachColor;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, eachAngel);
      ctx.strokeStyle= eachColor;
      ctx.stroke();
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = "white";
      ctx.font= "15px Arial";
      ctx.fillText(percentage+"%", textX, textY); 
  

    }


    if(donut){
      ctxDonut.fillStyle = eachColor;
      ctxDonut.beginPath();
      ctxDonut.moveTo(centerX, centerY);
      ctxDonut.arc(centerX, centerY, radius, startAngle, eachAngel);
      ctxDonut.strokeStyle= eachColor;
      ctxDonut.stroke(); 
      ctxDonut.closePath();
      ctxDonut.fill();
      ctxDonut.fillStyle = "white";
      ctxDonut.beginPath();
      ctxDonut.moveTo(centerX, centerY);
      ctxDonut.arc(centerX, centerY, radius/3, 0, 2*Math.PI);
      ctxDonut.closePath();
      ctxDonut.fill(); 
      
        
    ctxDonut.fillStyle = "white";
    ctxDonut.font= "15px Arial";
    ctxDonut.fillText(percentage+"%", textX, textY); 
      
    }

        




  };

// SVG 

  this.drawSVGLine= function() {
    var total =
      Number(firstSubValue.value) +
      Number(secondSubValue.value) +
      Number(thirdSubValue.value) +
      Number(fourthSubValue.value);
  
    var percentageArr = [
      ((firstSubValue.value / total) * 100),
      ((secondSubValue.value / total) * 100),
      ((thirdSubValue.value / total) * 100),
      ((fourthSubValue.value / total) * 100),
    ];
  
    var percentageChartArr = [
      (330 - percentageArr[0] * (330 / 100)).toFixed(1),
      (330 - percentageArr[1] * (330 / 100)).toFixed(1),
      (330 - percentageArr[2] * (330 / 100)).toFixed(1),
      (330 - percentageArr[3] * (330 / 100)).toFixed(1)
    ]
  
    if (lineChart.checked) {
      document.getElementById("svgLine").style.display = "inline-block";
      document.getElementById("polyLine").setAttribute("points",
            "90," + percentageChartArr[0] +
            " 180," + percentageChartArr[1] +
            " 270," + percentageChartArr[2] +
            " 360," + percentageChartArr[3]
        );
  
      var firstSubText = "<text x='90' y='360'>" + firstSubName.value + "</text>";
      var secondSubText = "<text x='180' y='360'>" + secondSubName.value + "</text>";
      var thirdSubText = "<text x='270' y='360'>" + thirdSubName.value + "</text>";
      var fourthSubText = "<text x='360' y='360'>" + fourthSubName.value + "</text>";
  
      document.getElementById("firstCircle").setAttribute("cx", "90");
      document.getElementById("firstCircle").setAttribute("cy", percentageChartArr[0]);
      document.getElementById("firstCircle").setAttribute("fill", firstSubColor.value);
  
      document.getElementById("secondCircle").setAttribute("cx", "180");
      document.getElementById("secondCircle").setAttribute("cy", percentageChartArr[1]);
      document.getElementById("secondCircle").setAttribute("fill", secondSubColor.value);
  
      document.getElementById("thirdCircle").setAttribute("cx", "270");
      document.getElementById("thirdCircle").setAttribute("cy", percentageChartArr[2]);
      document.getElementById("thirdCircle").setAttribute("fill", thirdSubColor.value);
  
      document.getElementById("fourthCircle").setAttribute("cx", "360");
      document.getElementById("fourthCircle").setAttribute("cy", percentageChartArr[3]);
      document.getElementById("fourthCircle").setAttribute("fill", fourthSubColor.value);
  
      axisXLine.innerHTML = firstSubText + secondSubText + thirdSubText + fourthSubText;
    }
  
    if (barChart.checked) {
      document.getElementById("svgBar").style.display = "inline-block";
  
      var firstSubText = "<text x='90' y='360'>" + firstSubName.value + "</text>";
      var secondSubText = "<text x='180' y='360'>" + secondSubName.value + "</text>";
      var thirdSubText = "<text x='270' y='360'>" + thirdSubName.value + "</text>";
      var fourthSubText = "<text x='360' y='360'>" + fourthSubName.value + "</text>";
  
      document.getElementById("firstRect").setAttribute("height", (percentageArr[0] * (330 / 100)));
      document.getElementById("firstRect").setAttribute("y", (330 - percentageArr[0] * (330 / 100)));
      document.getElementById("firstRect").setAttribute("fill", firstSubColor.value);
  
      document.getElementById("secondRect").setAttribute("height", (percentageArr[1] * (330 / 100)));
      document.getElementById("secondRect").setAttribute("y", (330 - percentageArr[1] * (330 / 100)));
      document.getElementById("secondRect").setAttribute("fill", secondSubColor.value);
  
      document.getElementById("thirdRect").setAttribute("height", (percentageArr[2] * (330 / 100)));
      document.getElementById("thirdRect").setAttribute("y", (330 - percentageArr[2] * (330 / 100)));
      document.getElementById("thirdRect").setAttribute("fill", thirdSubColor.value);
  
      document.getElementById("fourthRect").setAttribute("height", (percentageArr[3] * (330 / 100)));
      document.getElementById("fourthRect").setAttribute("y", (330 - percentageArr[3] * (330 / 100)));
      document.getElementById("fourthRect").setAttribute("fill", fourthSubColor.value);
  
  
  
      axisXBar.innerHTML = firstSubText + secondSubText + thirdSubText + fourthSubText;
    }
  }



};

function startDrawing() {
  var pieChart = new PieChart({
    currCanvas: pieChartCanvas,
    donutCanvas: donutChartCanvas,
    displayAreaContent: displayArea,
  });
  pieChart.draw();
}
