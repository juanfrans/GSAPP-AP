var column = 1;
var nodes; //Declare the object
var nodeNetwork = [];

function preload(){
	result = loadTable('data/Degrees.csv');
}

function setup() {
	createCanvas(640, 480);
	for(var i = 0; i<2000; i++){
		nodes = new node(random(width), random(height), 5);
		nodeNetwork[i] = nodes;
	}
	print(nodeNetwork);
	//print(result);
}

//node Class
function node(x, y, diameter){
	this.x = x;
	this.y = y;
	this.diameter = diameter;
}

node.prototype.display = function(){
	ellipse(this.x, this.y, this.diameter, this.diameter);
}

function draw() {
	background(51,51,51);
	fill(200);
	for (var i = 0; i<200; i++){
		noStroke();
		nodeNetwork[floor(random(0, nodeNetwork.length))].display();
		strokeWeight(0.5);
		stroke(150);
		line(nodeNetwork[floor(random(0, nodeNetwork.length))].x, nodeNetwork[floor(random(0, nodeNetwork.length))].y, nodeNetwork[floor(random(0, nodeNetwork.length))].x, nodeNetwork[floor(random(0, nodeNetwork.length))].y)
	}
	//background(0);
	barChart();
}

function barChart(){
	//Title
	textSize(14);
	noStroke();
	fill(200);
	text("GSAPP Degrees", 0, 15);

	//Toggle Icons
	fill(150);
	noStroke();
	rect((column-1)*60, 25, 40, 20);
	for(var i=0; i<6; i++){
		noFill();
		strokeWeight(1);
		stroke(200);
		rect(i*60, 25, 40, 20);
	}
	noStroke();
	fill(200);
	textSize(12);
	textAlign(CENTER);
	text("All", 20, 40);
	text("2013", 80, 40);
	text("2012", 140, 40);
	text("2011", 200, 40);
	text("2010", 260, 40);
	text("2009", 320, 40);

	//Bar Chart
	var startY = 50;
	var spaceBetween = 25;
	var maxValue = 0;
	var totalYear = 0;
	var maxLength = 400;
	for (var i=1; i<result.getRowCount(); i++){
		maxValue = max(maxValue, result.getColumn(column)[i]);
		totalYear = totalYear + parseInt(result.getColumn(column)[i]);
	}
	textAlign(LEFT);
	textSize(8);
	for(var i=1; i<result.getRowCount(); i++){
		noStroke();
		fill(255);
		rect(0, startY+spaceBetween*i, map(result.getColumn(column)[i], 0, maxValue, 0, maxLength), 10);
		noStroke();
		fill(200);
		text((round(result.getColumn(column)[i]/totalYear*100)).toString()+"%", 3+map(result.getColumn(column)[i], 0, maxValue, 0, maxLength), startY+spaceBetween*i+9);
		text(result.getColumn(0)[i], 0, startY+spaceBetween*i-2);
	}
}

function mousePressed(){
	if (mouseX > 0 && mouseX < 40 && mouseY > 25 && mouseY < 45){
		column = 1;
		//print("hello all");
	}
	if (mouseX > 60 && mouseX < 100 && mouseY > 25 && mouseY < 45){
		column = 2;
		//print("hello 2013");
	}
	if (mouseX > 120 && mouseX < 160 && mouseY > 25 && mouseY < 45){
		column = 3;
		//print("hello 2012");
	}
	if (mouseX > 180 && mouseX < 220 && mouseY > 25 && mouseY < 45){
		column = 4;
		//print("hello 2011");
	}
	if (mouseX > 240 && mouseX < 280 && mouseY > 25 && mouseY < 45){
		column = 5;
		//print("hello 2010");
	}
	if (mouseX > 300 && mouseX < 340 && mouseY > 25 && mouseY < 45){
		column = 6;
		//print("hello 2009");
	}	
}
