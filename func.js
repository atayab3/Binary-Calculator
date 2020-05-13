
// // Positive or Negative Decimal Number to Binary Number
document.getElementById("getDecBtn").addEventListener("click", convertDecimaltoBinary ) ;

//Positive Binary Representation in Decimal Form
document.getElementById("getbinaryBtn").addEventListener("click", convertPosBinToDecimal ) ;

document.getElementById("getTwosCompBtn").addEventListener("click", convertTwosComptoDecimal ) ;
//check validity of input
function validityCheck(inputVal){
	// if either if statment returns TRUE - input from user is not valid
	if(inputVal == ""){
		let p1 = document.createElement("p");
		p1.textContent = "Please enter a value.";
		document.body.appendChild(p1);
		return true; 
	}

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


// gets decimal value, calls corresponding conversion function depending on positive or negative
function convertDecimaltoBinary(){ 
	// have to reset these arrays every time a different input is retrieved
	var binary = []; 
	var negBinary = [];
	  
	// Selecting the input element and get its value   
	var inputVal = document.getElementById("decVal").value;
	if(validityCheck(inputVal)){
		return;
	}
	// Convert string to int
	var inputValNum = Number(inputVal);
	
	// Inputted DECIMAL value is positive
	if(inputValNum >= 0){ 
		var binaryArr = posDecToBinary(inputValNum, binary); //12
		binaryArr = lengthenOutput(binaryArr);
		console.log("Binary array: " + binaryArr);
		
		// convert array into string that can be outputted  
		var stringbinary = binaryArr.join("");
		  
		// Output what the decimal converted to Binary will be
	    let p1 = document.createElement("p");
		p1.textContent = "+" + inputVal + " is " + stringbinary + " in binary.";
		
		
		var e = document.getElementById("addValuesHere").querySelector("p"); 
		document.getElementById("addValuesHere").removeChild(e);
		document.getElementById("addValuesHere").appendChild(p1);

	  }
	
	  // The inputted DECIMAL value is negative
	  else{ 
		  // convert the positive version of the neg input to binary	  
		  var binaryArr = posDecToBinary(inputValNum*(-1), binary); // need to make negative input value a positive so multiply by -1 
		  binaryArr = lengthenOutput(binaryArr);
		  
		  //Twos Complement Binary Representation
		  var negBinaryArr = negDecToBinary(binaryArr, negBinary);
		  
		  // convert array into string  
		  var negStringBinary = negBinaryArr.join("");
		  
		  let p2 = document.createElement("p");
		  p2.textContent = inputVal + " is " + negStringBinary + " in Two's Complement binary";
		  var e = document.getElementById("addValuesHere").querySelector("p"); 
		  document.getElementById("addValuesHere").removeChild(e);
		  document.getElementById("addValuesHere").appendChild(p2);	
	  }
	
}

function posDecToBinary(decValue, binary) {
	let origValue = decValue;
	
	while(decValue > 0){
		let Remainder = decValue % 2 ;
		binary.unshift(Remainder);	
		decValue = decValue / 2;
		decValue = Math.floor(decValue);  
  }

  return binary;
}

//Two's Complement Representation of Negative Numbers
function negDecToBinary(binaryArr, negBinary){
	
	//Flipping bits of user inputted number ALREADY in positive binary
	for(let i = 0 ; i < binaryArr.length ;  ++i ){
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
	let carryOver = 0 ;
	for(let i =  negBinary.length -1 ; i > 0; --i  ){
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



// Used for POSITIVE binary to decimal conversions
function convertPosBinToDecimal(){
	// Selecting the input element and get its value
	let decVal = 0; 
    let binVal = document.getElementById("binaryVal").value;
	if(validityCheck(binVal)){
		return;
	}
	let tempNum = 0; // so string can be converted to int
	
	// remove all spaces from user input
	binVal = spaceRemover(binVal);
		
	//traverse through
	for(let i = 0 ; i < binVal.length ; ++i){
		//convert char to an integer value
		tempNum = Number(binVal.charAt(i) );
		//Add correct powers of 2 based on placement on 1s in binary string
		decVal = decVal + (tempNum * Math.pow(2, binVal.length-1-i) );
	}
	
	//Create paragraph element containing the conversion to 
	let p3 = document.createElement("p");
	p3.textContent = binVal + " is " + decVal + " in decimal form.";
	var e = document.getElementById("addValuesHere2").querySelector("p"); 
	document.getElementById("addValuesHere2").removeChild(e);
	document.getElementById("addValuesHere2").appendChild(p3);
	return decVal; 
}


//Used for Twos Complemenmt conversion of binary to decimal
function convertTwosComptoDecimal(){
// 	var TCVal = document.getElementById("TwosCompVal").value;
	let TCVal = document.getElementById("binaryVal").value;
	if(validityCheck(TCVal)){
		return;
	}
	// Selecting the input element and get its value
	let decVal = 0; 
	let tempNum = 0; // so string can be converted to int

	// remove all spaces from user input
	TCVal = spaceRemover(TCVal);
		
	//traverse through - Adding correct powers of 2 based on placement on 1s in binary string
	for(let i = 0 ; i < TCVal.length ; ++i){
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
	var e = document.getElementById("addValuesHere2").querySelector("p"); 
	document.getElementById("addValuesHere2").removeChild(e);
	document.getElementById("addValuesHere2").appendChild(p3);
	return decVal; 
}

//Code by Adam Tayabali
