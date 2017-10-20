/**
 * testchart module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart'], 
     function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function testchartContentViewModel() {
        var self = this;
        self.threeDValue = ko.observable('off');

        /* chart data */
        var pieSeries = [{name: "Series 1", items: [42]},
                         {name: "Series 2", items: [55]},
                         {name: "Series 3", items: [36]},
                         {name: "Series 4", items: [10]},
                         {name: "Series 5", items: [5]}];
        
        this.pieSeriesValue = ko.observableArray(pieSeries);
    }
    
    return testchartContentViewModel;
});
