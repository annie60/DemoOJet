define(['ojs/ojcore', 'ojs/ojmodel', 'ojs/ojcollectiontabledatasource'], function (oj) {

    var StudentFactory = {
        
        //TODO: Change to the working URL of your REST
        resourceUrl: "https://apex.oracle.com/pls/apex/semanai_admin/semanai/alumnos/",
        
        //Create a single student instance
        createStudentModel: function () {
            var self = this;
            var Student = oj.Model.extend({
                urlRoot: self.resourceUrl,
                idAttribute: "id",
                parse: function(response){
                    return {
                        //TODO: This needs to be update according the attribute you have in your REST
                        id: response['matricula'],
                        name: response['nombre'],
                        career: response['carrera'],
                        semester : response['semestre'],
                        email : response['email']
                    };
                } 
            });
            return new Student();
        },
        //Create student collection
        createStudentCollection: function () {
            var self = this;
            var Students = oj.Collection.extend({
                url: self.resourceUrl,
                model: self.createStudentModel(),
                comparator: "id",
                parse: function(response){ 
                    //This is assuming the JSON response is on standard pagination reference,meaning 
                    //it only needs the portion of the 'items' in the response
                    return response.items;
                }
            });
            return new Students();
        }
    };
    return StudentFactory;
});