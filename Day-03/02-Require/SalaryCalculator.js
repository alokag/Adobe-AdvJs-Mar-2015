define([],function(){
    function SalaryCalculator(defaults){
        var _data = defaults;

        this.get = function(attrName){
            return _data[attrName];
        };
        this.set = function(attrName, value){
            _data[attrName] = value;
            //trigger change notifications
            var listeners = _eventListeners[attrName];

            for(var i=0; i<listeners.length;i++){
                var listener = listeners[i]
                if (typeof listener === "function")
                    listener.call(this);
            }
        };

        var _eventListeners = {  };

        this.addListener = function(attrName, listenerFn){
            _eventListeners[attrName] = _eventListeners[attrName] || [];
            _eventListeners[attrName].push(listenerFn);
        };

        this.removeListener = function(attrName){
            //fill in the blanks
        }

        //this.onSalaryChange = null;
    }
    SalaryCalculator.prototype.calculate = function(){
        var gross = this.get('basic') + this.get('hra') + this.get('da');
        var net = gross * ((100-this.get('tax'))/100);
        this.set('salary', net);
        /*if (typeof this.onSalaryChange === "function")
            this.onSalaryChange();*/
    };
    return SalaryCalculator;
});
