function getPrimeFinder(){
    var cache = {};
    function checkPrime(n){
       console.log("processing the algo for - ", n);
       if (n <= 3) return true;
       for(var i=2; i <= (n/2); i++)
           if (n % i === 0) return false;
       return true;
    }
    return function(n){
        if (typeof cache[n] === "undefined") cache[n] = checkPrime(n);
        return cache[n];
    }
}
