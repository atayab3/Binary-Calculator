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
		var binaryArr = posDecToBinary(inputValNum, binary);
		console.log("Binary array: " + binaryArr);
		// convert array into string that can be outputted  
		var stringbinary = binaryArr.join("");
		  
		// Output what the decimal converted to Binary will be
	    let p1 = document.createElement("p");
		p1.textContent = "+" + inputVal + " is " + stringbinary + " in binary.";
		document.body.appendChild(p1);

	  }
	  else{ // The input value is negative
		  var binaryArr = posDecToBinary(inputValNum*(-1), binary);
		  console.log("Twos comp binary array: " + binaryArr);
		  
		  //Twos Complement Binary Representation
		  var negBinaryArr = TwosComp(binaryArr, negBinary);
		  
		  // convert array into string  
		  var negStringBinary = negBinaryArr.join("");
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
	alert(negBinary);
	if(negBinary[0] == 0){
		negBinary.unshift(1);
	}
	if(negBinary[negBinary.length-1] == 0){
		negBinary.pop();
		negBinary.push(1);
	}
	return negBinary;
}

//Sign and Magnitude Representation of Negative Numbers
function SignAndMag(){
	
}
