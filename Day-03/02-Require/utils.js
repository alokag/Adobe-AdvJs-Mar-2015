define([], function(){
    String.prototype.toNumber = function(){
        return parseInt(this,10);
    }
});
