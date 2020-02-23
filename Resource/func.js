// 	document.getElementById("getDecBtn").addEventListener("click", 
// 														  () => 
// 														  {posDecToBinary(decValue)}
// 														 ) ;

// Positive or Negative Decimal Number to Binary Number
document.getElementById("getDecBtn").addEventListener("click", getDecInput ) ;

//Positive Binary Representation in Decimal Form
document.getElementById("getbinaryBtn").addEventListener("click", getBinInput ) ;

document.getElementById("getTwosCompBtn").addEventListener("click", getTwosCompInput ) ;

function spaceRemover(binaryVal){
	//accounting for spaces in input with includes function
	while( binaryVal.includes(" ") == true ){
		  var spaceIndex = binaryVal.indexOf(" ");
		  var firstHalf = binaryVal.substr(0, spaceIndex);
		  var secondHalf = binaryVal.substr(spaceIndex+1);
		  binaryVal = firstHalf + secondHalf;
	  }
	return binaryVal;
}

function getTwosCompInput(){
	var TCVal = document.getElementById("TwosCompVal").value;
	// Selecting the input element and get its value
	
	var decVal = 0; 
	var tempNum = 0; // so string can be converted to int

	// remove all spaces from user input
	TCVal = spaceRemover(TCVal);
		
	//traverse through - Adding correct powers of 2 based on placement on 1s in binary string
	for(var i = 0 ; i < TCVal.length ; ++i){
		//convert char to an integer value
		tempNum = Number(TCVal.charAt(i) );
		   
		//first index should be multiplied by -1 
		if(i ==0 ){
			decVal = decVal + (tempNum * Math.pow(2, TCVal.length-1-i) *(-1) );
		}
		else{
			decVal = decVal + (tempNum * Math.pow(2, TCVal.length-1-i) );
		}
	}
	
	//Create paragraph element containing the conversion to 
	let p3 = document.createElement("p");
	p3.textContent = "Twos comp: " + TCVal + " is " + decVal + " in decimal form.";
	document.body.appendChild(p3);
	return decVal; 
}

function getDecInput(){ 
	// have to reset these arrays every time a different input is retrieved
	var binary = []; 
	var negBinary = [];
	  
	// Selecting the input element and get its value   
	var inputVal = document.getElementById("decVal").value;
	
	// Convert string to int
	var inputValNum = Number(inputVal);
	if(inputVal == ""){
		return;
	}
	if(inputValNum >= 0){ // Input value is positive
		var binaryArr = posDecToBinary(inputValNum, binary); //12
		binaryArr = lengthenOutput(binaryArr);
		console.log("Binary array: " + binaryArr);
		
		// convert array into string that can be outputted  
		var stringbinary = binaryArr.join("");
		  
		// Output what the decimal converted to Binary will be
	    let p1 = document.createElement("p");
		p1.textContent = "+" + inputVal + " is " + stringbinary + " in binary.";
		document.body.appendChild(p1);

	  }
	  else{ // The input value is negative
		  
		  // convert the positive version of the neg input to binary	  
		  var binaryArr = posDecToBinary(inputValNum*(-1), binary); // need to make negative input value a positive so multiply by -1 
		  binaryArr = lengthenOutput(binaryArr);
		  
		  //Twos Complement Binary Representation
		  var negBinaryArr = TwosComp(binaryArr, negBinary);
		  
		  // convert array into string  
		  var negStringBinary = negBinaryArr.join("");
		  
		  let p2 = document.createElement("p");
		  p2.textContent = inputVal + " is " + negStringBinary + " in Two's Complement binary";
		  document.body.appendChild(p2);	
	  }
	
}

function posDecToBinary(decValue, binary) {
	var origValue = decValue;
	
	while(decValue > 0){
		var Remainder = decValue % 2 ;

// 	if(Remainder == 1 | Remainder == 0){
		binary.unshift(Remainder);	
// 	}
		decValue = decValue / 2;
		decValue = Math.floor(decValue);  
  }

  return binary;
}

//Two's Complement Representation of Negative Numbers
function TwosComp(binaryArr, negBinary){
	
	//Flipping bits of user inputted number ALREADY in positive binary
	for(var i = 0 ; i < binaryArr.length ;  ++i ){
		if(binaryArr[i] == 1){
			negBinary.push(0); 
		}
		else if (binaryArr[i] == 0){
			negBinary.push(1);
		}
	}
	
	if(negBinary[0] == 0){
		negBinary.unshift(1);
	}
	// ADDING 1 to the lowest bit
	var carryOver = 0 ;
	for(var i =  negBinary.length -1 ; i > 0; --i  ){
		if(i == negBinary.length-1){
			if(negBinary[i] == 0 ){  
				negBinary.splice(i, 1, 1); // add index i, remove 1 element, and add a one
				break;
			}
			else{
				negBinary.splice(i, 1, 0);
				carryOver = 1; 
				continue; //carry over the one
			}
		}
		else{
			if( carryOver == 1 && negBinary[i] == 0){
				negBinary.splice(i, 1, 1); // add index i, remove 1 element, and add a one
				carryOver = 0;
				break;
			}
			else if (carryOver == 1 && negBinary[i] == 1){
				negBinary.splice(i, 1, 0);
				carryOver = 1;
			}
		}
	}
	return negBinary;
}

// if length of binary string is not a multiple of 4, add correct number of 0s needed to get there
function lengthenOutput(binaryArr){
	var extraNum = binaryArr.length % 4;
	var extraString ; 
	switch(extraNum){
		case 1: 
			binaryArr.unshift(0);
			binaryArr.unshift(0);
			binaryArr.unshift(0);
			break;
		case 2:
			binaryArr.unshift(0);
			binaryArr.unshift(0);
			break;
		case 3:
			binaryArr.unshift(0);
			break;
		default:
			break;
	}	
	return binaryArr;	
}

//Sign and Magnitude Representation of Negative Numbers
// function SignAndMag(){
	
// }

// Used for POSITIVE binary to decimal conversions
function getBinInput(){
	// Selecting the input element and get its value
	var decVal = 0; 
    var binVal = document.getElementById("binaryVal").value;
	
	var tempNum = 0; // so string can be converted to int
	
	// remove all spaces from user input
	binVal = spaceRemover(binVal);
		
	//traverse through
	for(var i = 0 ; i < binVal.length ; ++i){
		//convert char to an integer value
		tempNum = Number(binVal.charAt(i) );
		//Add correct powers of 2 based on placement on 1s in binary string
		decVal = decVal + (tempNum * Math.pow(2, binVal.length-1-i) );
	}
	
	//Create paragraph element containing the conversion to 
	let p3 = document.createElement("p");
	p3.textContent = binVal + " is " + decVal + " in decimal form.";
	document.body.appendChild(p3);
	return decVal; 
}