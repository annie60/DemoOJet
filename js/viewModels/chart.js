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
        //TODO: Change to the working URL of your REST
        $.getJSON("https://apex.oracle.com/pls/apex/semanai_admin/semanai/semestres/",
                function (data) {
                    for (var i = 0; i < data.items.length; i++) {
                        //TODO: Finish getting all the attributes your REST is exposing
                        self.students().push({
                            id: data.items[i]['semestre'],
                            label: data.items[i]['semestre'],
                            value: data.items[i]['total'],
                            style: "color: "+handler.getValue(Math.round(Math.random()*3)),
                            shortDesc: "Total students: "+data.items[i]['total']+" of semester:" + data.items[i]['semester']
                        });
                        //CHALLENGE: Create a new REST with the groups of careers
                        
                        self.pictoChartItems().push({
                            name : "Total with semester: "+data.items[i]['semester'],
                            shape: 'human',
                            count: data.items[i]['total'],
                            color: colors[i] //This is not going to work for more than 5 groups
                            //TODO: Make it get colors dinamically, not restricted to 5 groups
                        });
                    }
                }).then(
                function () { //Since it returns a promise we need to listen when it is done

                    self.isDone(true);
                    
                });
        
    }

    return new chartContentViewModel;
});
