class Validator {
  validateUpperLimit(inputData) {
    let errorMsg = "";
    if(!inputData) {
      errorMsg +="Please enter a value for Upper Limit.\n";
    }
    if(isNaN(parseInt(inputData))) {
      errorMsg +="Upper Limit needs to be a number.\n";
    }
    if((parseInt(inputData) < 0)) {
      errorMsg +="Upper Limit needs to be positive.\n";
    }
    if(errorMsg.length === 0){
      return true;
    } else {
      alert(errorMsg);
      return false;
    }
  }
}

export default Validator;
