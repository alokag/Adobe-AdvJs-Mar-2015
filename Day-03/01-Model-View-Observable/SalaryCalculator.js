function createAccessor(defaultValue){
    var data = defaultValue;
    return function(value){
        if (typeof value === "undefined") return data;
        data = value;
    }


}

function SalaryCalculator(){

    this.basic = createAccessor(0);
    this.hra = createAccessor(0)
    this.da = createAccessor(0);
    this.tax = createAccessor(0)
    this.salary = createAccessor(0);

    function triggerChange(attrName){
        //trigger the respective events;
    }
}

SalaryCalculator.prototype.calculate =  function(){
        var gross = this.basic() + this.hra() + this.da();
        var net = gross * ((100-this.tax())/100);
        this.salary(net);
    }
