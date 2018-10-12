// OLD INTERFACE
class Shipping{
    constructor(){
        this.request = function (zipStart, zipEnd, weight) {
            return "Camisa: $75.00";
        };
    }
}

// NEW INTERFACE
class AdvancedShipping{
    constructor() {
        this.login = function (credentials) {};
        this.setStart = function(start) {};
        this.setDestination = function(destination) {};
        this.calculate = function(weight) { return "Camisa: $39.50"; };
    }
}

// ADAPTER INTERFACE
function ShippingAdapter(credentials) {
    var shipping = new AdvancedShipping();
 
    shipping.login(credentials);
 
    return {
        request: function(zipStart, zipEnd, weight) {
            shipping.setStart(zipStart);
            shipping.setDestination(zipEnd);
            return shipping.calculate(weight);
        }
    };
}
// log helper
 
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { swal(log); log = ""; }
    }
})();
 
function run() {
    var shipping = new Shipping();
    var credentials = {token: "30a8-6ee1"};
    var adapter = new ShippingAdapter(credentials);
 
    // original shipping object and interface
 
    var cost = shipping.request("78701", "10010", "2 lbs");
    log.add("Costo antiguo --> " + cost);
 
    // new shipping object with adapted interface
 
    cost = adapter.request("78701", "10010", "2 lbs");
 
    log.add("Nuevo costo --> " + cost);
    log.show();
}

//onclick="run(); return false"