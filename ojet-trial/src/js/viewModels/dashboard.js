/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['accUtils',
        'knockout',
        'jquery',
        'ojs/ojarraydataprovider',
        'ojs/ojlabel',
        'ojs/ojselectsingle',
        'ojs/ojchart',
        'ojs/ojlistview',
        'ojs/ojlistitemlayout'
        ],
 function(accUtils, ko, $, ArrayDataProvider) {
    function DashboardViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      var self = this;

      self.name = ko.observable("Hola");

      //Populate a Data Provider Observable in the ViewModel
      var url = "js/store_data.json"; //defines the link to local data file
      //var url = "https://61a6276c-cf12-418a-88cb-a95d7a0c2d30.mock.pstmn.io/teamList"; //defines the link to local data file

      self.activityDataProvider = ko.observable(); //gets data for Activities list

      //get Activities objects from file using jQuery method and a method to return a Promise
      $.getJSON(url).then(function(data){
        //Create  variable for Activities list and populate using key attribute fetch
        var activitiesArray = data;
        console.log(activitiesArray);
        //self.activityDataProvider = new ArrayDataProvider(activitiesArray, { keyAttributes: 'id' });
        self.activityDataProvider(new ArrayDataProvider(activitiesArray, { keyAttributes: 'id' }));
        }
      );
      
      //10 Mar 2021 populate Team List using the mock server API on Postman
      var mock_url = "https://416da53f-7594-4160-8932-ed8bf1c1e3ce.mock.pstmn.io/teamDetails";
      self.teamDataProvider = ko.observable();
      //get Team objects from mock server API using jQuery method
      $.getJSON(mock_url).then(function(data) {
        //create variable for Team list and populate using key attribute fetch
        var teamListArray = data;
        console.log(teamListArray);
        self.teamDataProvider(new ArrayDataProvider(teamListArray, { keyAttributes: 'id' }));
        });

      //chart Type values array and ArrayDataProvider Observable
      var types = [
        { value: 'pie', label: 'Pie'},
        { value: 'bar', label: 'Bar' },
        { value: 'line', label: 'Line' },
        { value: 'area', label: 'Area' },
        { value: 'combo', label: 'Combo' }
      ];

      self.chartTypes = new ArrayDataProvider(types, { keyAttributes: 'value' });

      //chart selection observable and default value
      self.val = ko.observable();

      //chart data Array and ArrayDataProvider observable
      var chartData = [
        { "id": 0, "series": "Baseball", "group": "Group A", "value": 42},
        { "id": 1, "series": "Baseball", "group": "Group B", "value": 55},
        { "id": 2, "series": "Bicycling", "group": "Group A", "value": 34},
        { "id": 3, "series": "Bicycling", "group": "Group B", "value": 87},
        { "id": 4, "series": "Skiing", "group": "Group A", "value": 56},
        { "id": 5, "series": "Skiing", "group": "Group B", "value": 43},
        { "id": 6, "series": "Soccer", "group": "Group A", "value": 60},
        { "id": 7, "series": "Soccer", "group": "Group B", "value": 72},
      ];

      self.chartDataProvider = new ArrayDataProvider(chartData, { keyAttributes: 'id' });

      this.connected = () => {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return DashboardViewModel;
  }
);