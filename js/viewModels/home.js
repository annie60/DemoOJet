/**
 * home module
 */
define(['ojs/ojcore', 'knockout','jquery', 'StudentFactory', 'ojs/ojmodule', 'ojs/ojmoduleanimations',
    'ojs/ojanimation','ojs/ojlistview','ojs/ojselectcombobox', 'ojs/ojpagingcontrol', 
    'ojs/ojpagingtabledatasource'
], function (oj, ko,$, StudentFactory) {
    /**
     * The view model for the main content view template
     */
    function homeContentViewModel() {
        var self = this;
        //Creates a collection of students
         self.studentCollection = ko.observable(StudentFactory.createStudentCollection());
                self.studentCollection().fetch();
                self.datasource = ko.observable(new oj.PagingTableDataSource(
                        new oj.CollectionTableDataSource(self.studentCollection())));
        
        //helpers for sorting functionality
        //TODO: Add more sorting criteria
        var criteriaMap = {};
        criteriaMap['back'] = {key: 'name', direction: 'descending'};
        criteriaMap['default'] = {key: 'name', direction: 'ascending'};

       self.currentSort = ko.observable("default");
       self.handleSortCriteriaChanged = function(event, ui)
        {
            if (ui.option !== 'value' )
            {
                return;
            }

            var criteria = criteriaMap[ui.value];
            self.datasource().sort(criteria);
        };
                
        //Helping function  for attributes on style
        function getAngleValue(transValue) {
            var rotateSection = "";
            if (transValue.includes('rotateY')) {
                rotateSection = transValue.substr(transValue.indexOf('rotateY') + 8);
                rotateSection = rotateSection.substr(0, rotateSection.length - 1);
            }
            return rotateSection;
        }
 
        self.optionClick = function (id) {
            //Determines element to be flip
            var elem = document.getElementById("animatable"+id);
            var elemBackside = elem.getElementsByClassName('info');
            var pixelsOnRotate = getAngleValue(elemBackside[0].style.transform);
            // Determine startAngle and endAngle
            var valueFront = true;
            if (pixelsOnRotate !== "0deg" && pixelsOnRotate !== "") {
                valueFront = false;
            }

            var startAngle = valueFront ? '0deg' : '180deg';
            var endAngle = valueFront ? '180deg' : '0deg';

            // Animate the element
            oj.AnimationUtils['flipOut'](elem, {'flipTarget': 'children',
                'persist': 'all',
                'startAngle': startAngle,
                'endAngle': endAngle});

        };
        
    }
    
    return new homeContentViewModel;
});
