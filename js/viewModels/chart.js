/**
 * chart module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojtagcloud','ojs/ojpictochart'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function chartContentViewModel() {
        var self = this;
        self.students = ko.observableArray();
        self.isDone= ko.observable();
        self.pictoChartItems = ko.observableArray();
        
        self.visiblePictoItems = ko.computed(function () {
            if (self.isDone()) {
                
                return self.pictoChartItems();
            } else {
                return "";
            }
        }); 
        self.visibleStudents = ko.computed(function () {
            if (self.isDone()) {
                
                return self.students();
            } else {
                return "";
            }
        });
        var colors =["#267db3", "#ed6647", "#8561c8","#260dd0"];
         var handler = new oj.ColorAttributeGroupHandler({"0": "#267db3", "1": "#ed6647", "2": "#8561c8"});
        $.getJSON("https://apex.oracle.com/pls/apex/semanai_test/semanai/age",
                function (data) {
                    for (var i = 0; i < data.items.length; i++) {
                        self.students().push({
                            id: data.items[i]['age'],
                            label: data.items[i]['age'],
                            value: data.items[i]['total'],
                            style: "color: "+handler.getValue(Math.round(Math.random()*3)),
                            shortDesc: "Total students: "+data.items[i]['total']+" of age:" + data.items[i]['age']
                        });
                        self.pictoChartItems().push({
                            name : "Total with age: "+data.items[i]['age'],
                            shape: 'human',
                            count: data.items[i]['total'],
                            color: colors[i]
                        });
                    }
                }).then(
                function () {

                    self.isDone(true);
                    
                });
        
    }

    return new chartContentViewModel;
});
