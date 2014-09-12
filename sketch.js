var column = 1;
var nodes; //Declare the object
var nodeNetwork = [];
var startX = 200;

function preload(){
	result = loadTable('data/Degrees.csv');
}

function setup() {
	createCanvas(1280, 720);
	colorMode(HSB, 360, 100, 100, 100);
	textFont("Gotham");
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
	background(0,0,20);
	noStroke();
	fill(0,0,90);
	//Title
	textSize(20);
	text("DESCRIPTIVE", 0, 20);
	text("STATISTICS", 0, 40);
	stroke(180, 100, 50);
	strokeWeight(1);
	line(0, 45, 180, 45);
	line(0, 2, 180, 2);
	line(startX, 2, 675, 2);

	//Description
	noStroke();
	textSize(12);
	fill(0, 0, 60);
	text("Here is where we describe what's happening with this data, how many people responded, what percentage it is of the whole GSAPP, etc, etc, etc. Just a brief description to explain this dashboard and make an interesting point...", 0, 45, 175, 500);
	/*for (var i = 0; i<200; i++){
		noStroke();
		nodeNetwork[floor(random(0, nodeNetwork.length))].display();
		strokeWeight(0.5);
		stroke(150);
		line(nodeNetwork[floor(random(0, nodeNetwork.length))].x, nodeNetwork[floor(random(0, nodeNetwork.length))].y, nodeNetwork[floor(random(0, nodeNetwork.length))].x, nodeNetwork[floor(random(0, nodeNetwork.length))].y)
	}*/
	//background(0);
	barChart();
}

function barChart(){
	//Title
	textSize(14);
	noStroke();
	fill(0, 0, 60);
	text("GSAPP Degrees", startX, 15);

	//Toggle Icons
	fill(0, 0, 40);
	noStroke();
	rect(startX+(column-1)*60, 25, 40, 20);
	for(var i=0; i<6; i++){
		noFill();
		strokeWeight(1);
		stroke(200);
		rect(startX+i*60, 25, 40, 20);
	}
	noStroke();
	fill(0, 0, 60);
	textSize(12);
	textAlign(CENTER);
	text("All", startX+20, 40);
	text("2013", startX+80, 40);
	text("2012", startX+140, 40);
	text("2011", startX+200, 40);
	text("2010", startX+260, 40);
	text("2009", startX+320, 40);

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
	var rectNum = 20;
	for(var i=1; i<result.getRowCount(); i++){
		noStroke;
		for(var j=0; j<map(result.getColumn(column)[i], 0, maxValue, 0, maxLength)/3; j++){
			fill(180, 100, map(j, 0, map(result.getColumn(column)[i], 0, maxValue, 0, maxLength)/3, 30, 100));
			rect(startX+j*3, startY+spaceBetween*i, 1, 7);
		}
		//rect(0, startY+spaceBetween*i, map(result.getColumn(column)[i], 0, maxValue, 0, maxLength), 10);
		noStroke();
		fill(0, 0, 60);
		text((round(result.getColumn(column)[i]/totalYear*100)).toString()+"%", startX+3+map(result.getColumn(column)[i], 0, maxValue, 0, maxLength), startY+spaceBetween*i+9);
		text(result.getColumn(0)[i], startX, startY+spaceBetween*i-2);
	}
}

function mousePressed(){
	if (mouseX > startX && mouseX < startX+40 && mouseY > 25 && mouseY < 45){
		column = 1;
		//print("hello all");
	}
	if (mouseX > startX+60 && mouseX < startX+100 && mouseY > 25 && mouseY < 45){
		column = 2;
		//print("hello 2013");
	}
	if (mouseX > startX+120 && mouseX < startX+160 && mouseY > 25 && mouseY < 45){
		column = 3;
		//print("hello 2012");
	}
	if (mouseX > startX+180 && mouseX < startX+220 && mouseY > 25 && mouseY < 45){
		column = 4;
		//print("hello 2011");
	}
	if (mouseX > startX+240 && mouseX < startX+280 && mouseY > 25 && mouseY < 45){
		column = 5;
		//print("hello 2010");
	}
	if (mouseX > startX+300 && mouseX < startX+340 && mouseY > 25 && mouseY < 45){
		column = 6;
		//print("hello 2009");
	}	
}
