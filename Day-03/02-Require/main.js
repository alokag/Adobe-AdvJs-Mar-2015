require(['SalaryCalculator','SalaryCalculatorView','utils'],
        function(SalaryCalculator, SalaryCalculatorView){
            window.calculator = new SalaryCalculator({
                basic : 0,
                hra : 0,
                da : 0,
                tax : 0,
                salary : 0
            });

            var view1 = new SalaryCalculatorView(calculator);
            view1.render();

            var view2 = new SalaryCalculatorView(calculator);
            view2.render();

            $(function(){
                view1.$root.appendTo(document.body);
                view2.$root.appendTo(document.body);
            });
});
