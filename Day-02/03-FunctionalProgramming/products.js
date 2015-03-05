var products = [
    {id :6, name : "Pen", units : 50, cost : 60, category : 2},
    {id :8, name : "Hen", units : 60, cost : 40, category : 1},
    {id :3, name : "Den", units : 70, cost : 80, category : 2},
    {id :4, name : "Ten", units : 30, cost : 30, category : 1},
    {id :9, name : "Ken", units : 20, cost : 50, category : 2},
    {id :2, name : "Zen", units : 90, cost : 20, category : 1}
]

/*
Sort
Filter
Min
Max
Sum
Every
Any
GroupBy
*/

function print(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

print("Default list", function(){
    console.table(products);
});

print("Sort", function(){
    print("Default sort [products by id]", function(){
        function sort(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++){
                    var left = products[i],
                        right = products[j];
                    if (left.id > right.id){
                        products[i] = products[j];
                        products[j] = left;
                    }
                }
        }
        sort();
        console.table(products);
    });
    print("Generalized sort [any list by any attribute]", function(){
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++){
                    var left = list[i],
                        right = list[j];
                    if (left[attrName] > right[attrName]){
                        list[i] = list[j];
                        list[j] = left;
                    }
                }
        }
        print("By cost", function(){
            sort(products, "cost");
            console.table(products);
        });
        print("By units", function(){
            sort(products, "units");
            console.table(products);
        });

    });
    print("Generalized sort [any list by any value]", function(){
        function sort(list, comparerFn){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++){
                    var left = list[i],
                        right = list[j];
                    if (comparerFn(left, right) > 0){
                        list[i] = list[j];
                        list[j] = left;
                    }
                }
        }
        print("By value [cost * units]", function(){
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1;
                if (p1Value === p2Value) return 0;
                return 1;
            }
            sort(products, productComparerByValue);
            console.table(products);
        });


    });
});

