var products = [
    {id :6, name : "Pen", units : 50, cost : 60, category : 3},
    {id :8, name : "Hen", units : 60, cost : 40, category : 3},
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

print("Filter", function(){
    print("Default filter [products cost > 50]", function(){
        function filter(){
            var result = [];
            for(var i=0; i<products.length; i++)
                if (products[i].cost > 50)
                    result.push(products[i]);
            return result;
        }
        var costlyProducts = filter();
        console.table(costlyProducts);
    });
     print("Generalized filter [any list by any criteria]", function(){
        function filter(list, criteriaFn){
            var result = [];
            for(var i=0; i<list.length; i++)
                if (criteriaFn(list[i]) === true)
                    result.push(list[i]);
            return result;
        }
         var costlyProductCriteria = function(p){
             return p.cost > 50;
         }
         /*var affordableProductCriteria = function(p){
             return !costlyProductCriteria(p);
         }*/
         /*function negate(criteriaFn){
             return function(p){
                 return !criteriaFn(p);
             }
         }*/

         function negate(criteriaFn){
             return function(){
                 return !criteriaFn.apply(this,arguments);
             }
         }
         var affordableProductCriteria = negate(costlyProductCriteria);

         print("Costly products [ cost > 50]", function(){

            var costlyProducts = filter(products, costlyProductCriteria);
            console.table(costlyProducts);
         });

         print("Affordable products [ !coslty ]", function(){

            var affordableProducts = filter(products,affordableProductCriteria);
            console.table(affordableProducts);
         });

          var productCriteriaByCategory1 = function(p){
                 return p.category === 1;
             }
           /*var productCriteriaByCategory2 = function(p){
                 return !productCriteriaByCategory1(p)
             }*/
          var productCriteriaByCategory2 = negate(productCriteriaByCategory1);

          print("Category 1 products [ category = 1]", function(){
            var category1Products = filter(products, productCriteriaByCategory1);
            console.table(category1Products);
         });
         print("Category 2 products [ !(category === 1)]", function(){
            var category2Products = filter(products, productCriteriaByCategory2);
            console.table(category2Products);
         });

    });

});

print("GroupBy", function(){
    function groupBy(list, keySelectorFn){
        var result = {};
        for(var i=0; i<list.length; i++){
            var key = keySelectorFn(list[i]);
            if (typeof result[key] === "undefined")
                result[key] = [];
            result[key].push(list[i]);
        }
        return result;
    }
    print("By Category", function(){
        var keySelectorByCategory = function(p){ return p.category; };
        var productsByCategory = groupBy(products, keySelectorByCategory);
        for(var key in productsByCategory){
            print("Key - " + key, function(){
                console.table(productsByCategory[key]);
            })
        }
    });
    print("By Cost", function(){
        var keySelectorByCost = function(p){ return p.cost > 50 ? "costly" : "affordable" };
        var productsByCost = groupBy(products, keySelectorByCost);
        for(var key in productsByCost){
            print("Key - " + key, function(){
                console.table(productsByCost[key]);
            })
        }
    });

});


print("Memoize", function(){
    function memoize(fn){
        var cache = {};

        return function(){
            var key = JSON.stringify(arguments);
            cache[key] = cache[key] || fn.apply(this,arguments);
            /*if (typeof cache[key] === "undefined")
                cache[key] = fn.apply(this,arguments);;*/
            return cache[key];
        }
    }

    var add = function(x,y){
        console.log("processing add for ", x ,"  and " , y);
        return x + y;
    }

    var cachedAdd = memoize(add);
    console.log(cachedAdd(100,200));
    console.log(cachedAdd(300,400));
    console.log(cachedAdd(100,200));
    console.log(cachedAdd(300,400));
});
