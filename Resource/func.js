// 	document.getElementById("getDecBtn").addEventListener("click", 
// 														  () => 
// 														  {posDecToBinary(decValue)}
// 														 ) ;

document.getElementById("getDecBtn").addEventListener("click", getInput ) ;
//global variables


function getInput(){ 
	// have to reset these arrays every time a different input is retrieved
	var binary = []; 
	var negBinary = [];
	  // Selecting the input element and get its value 
      var inputVal = document.getElementById("decVal").value;
	  //- Convert string to int
	  var inputValNum = Number(inputVal);
	
	  if(inputValNum >= 0){ // Input value is positive
		var binaryArr = posDecToBinary(inputValNum, binary); //12
		binaryArr = lengthenOutput(binaryArr);
		console.log("Binary array: " + binaryArr);
		// convert array into string that can be outputted  
		var stringbinary = binaryArr.join("");
// 		stringbinary = lengthenOutput(stringbinary);
		  
		// Output what the decimal converted to Binary will be
	    let p1 = document.createElement("p");
		p1.textContent = "+" + inputVal + " is " + stringbinary + " in binary.";
		document.body.appendChild(p1);

	  }
	  else{ // The input value is negative
		  var binaryArr = posDecToBinary(inputValNum*(-1), binary); // need to make negative input value a positive so multiply by -1 
		  binaryArr = lengthenOutput(binaryArr);
		  console.log("Twos comp binary array: " + binaryArr);
		  
		  //Twos Complement Binary Representation
		  var negBinaryArr = TwosComp(binaryArr, negBinary);
		  
		  // convert array into string  
		  var negStringBinary = negBinaryArr.join("");
// 		  negStringBinary = lengthenOutput(negStringBinary);
		  
		  let p2 = document.createElement("p");
		  p2.textContent = inputVal + " is " + negStringBinary + " in Two's Complement";
		  document.body.appendChild(p2);	
	  }
	  
	
		

	
}

function posDecToBinary(decValue, binary) {
  var origValue = decValue;
  while(decValue > 0){
  var Remainder = decValue % 2 ;
//   alert(decValue);
   console.log(decValue); 
	if(Remainder == 1 | Remainder == 0){
	  binary.unshift(Remainder);	
	}
	decValue = decValue / 2;
	decValue = Math.floor(decValue);  
  }
//   alert("length of binary is " + binary.length);
  return binary;
}


//Two's Complement Representation of Negative Numbers
function TwosComp( binaryArr, negBinary ){
	 
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
// 	alert("got here");
	// ADDING 1 to the lowest bit
	var carryOver = 0 ;
	for(var i =  negBinary.length -1 ; i > 0; --i  ){
		if(i == negBinary.length-1){
		
			if(negBinary[i] == 0 ){ // FIX ME 
				negBinary.splice(i, 1, 1); // add index i, remove 1 element, and add a one
				break;
			}

			else{//(negBinary[i] == 1 ) {
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

function lengthenOutput(binaryArr){
	
	var extraNum = binaryArr.length % 4;
	var extraString ; 
	switch(extraNum){
		case 1: 
// 			extraString = "000";
			binaryArr.unshift(0);
			binaryArr.unshift(0);
			binaryArr.unshift(0);
			break;
		case 2:
// 			extraString = "00";
			binaryArr.unshift(0);
			binaryArr.unshift(0);
			break;
		case 3:
// 			extraString = "0";
			binaryArr.unshift(0);
			break;
		default:
// 			extraString = "";
			break;
	}
// 	binaryString = extraString+binaryString;
	
	
// 	return binaryString;
	return binaryArr;
		
		
}

//Sign and Magnitude Representation of Negative Numbers
function SignAndMag(){
	
}
