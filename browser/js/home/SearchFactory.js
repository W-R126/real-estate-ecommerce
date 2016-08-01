app.factory('SearchFactory', function($http){
  var SearchFactoryObj = {};

  SearchFactoryObj.getTypes = function(){
    return $http.get('/api/buildings/types/')
    .then(function(types){return types.data});
  }
  SearchFactoryObj.getStyles = function(){
    return $http.get('/api/buildings/styles/')
    .then(function(types){return types.data});
  }

  SearchFactoryObj.searchFields = function(obj){
    console.log("SearchFactory obj: ", obj);
    return $http.get('/api/buildings/', {params:obj})
    .then(buildings=>buildings.data);
  }

  return SearchFactoryObj;
})
