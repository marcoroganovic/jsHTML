var { 
  describe, isTrue, isFalse, equal, 
  arraysEqual, objectsEqual, nodesEqual, run 
} = Assert;


isTrue(true, "it should pass since argument is true");

run("#container");
