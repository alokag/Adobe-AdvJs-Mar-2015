define(['jquery', 'text!calculatorTemplate.html'], function($, calculatorTemplate){
    function SalaryCalculatorView(calculator){
        var $root = this.$root = $("<div></div>");

        calculator.addListener('salary', function(){
             $("#divResult", $root).html(this.get('salary'));
        });

        calculator.addListener('basic', function(){
            $("#txtBasic", $root).val(this.get('basic'));
        });

        calculator.addListener('hra', function(){
            $("#txtHra", $root).val(this.get('hra'));
        });

        calculator.addListener('da', function(){
            $("#txtDa", $root).val(this.get('da'));
        });

        calculator.addListener('tax', function(){
            $("#rangeTax", $root).val(this.get('tax'));
            $("#spanTax", $root).text(this.get('tax') + '%');
        });

        $root.on("change", "#txtBasic",function(){
            calculator.set('basic', this.value.toNumber());
        });
        $root.on("change", "#txtHra",function(){
            calculator.set('hra', this.value.toNumber());
        });
        $root.on("change", "#txtDa",function(){
            calculator.set('da', this.value.toNumber());
        });
        $root.on("change", "#rangeTax",function(){
            calculator.set('tax', this.value.toNumber());
        });
        $root.on("click", "#btnCalculate",function(){
            calculator.calculate();
        });

        this.render = function(){
            $root.html(calculatorTemplate);
        }

    }
    return SalaryCalculatorView;
});
