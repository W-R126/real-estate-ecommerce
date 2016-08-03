app.factory('SearchFactory', function($http){
  var SearchFactoryObj = {};

  SearchFactoryObj.getTypes = function(){
    return $http.get('/api/buildings/types/')
    .then(types => types.data);
  }
  SearchFactoryObj.getStyles = function(){
    return $http.get('/api/buildings/styles/')
    .then(types => types.data);
  }

  SearchFactoryObj.searchFields = function(obj){
    return $http.get('/api/buildings/', {params:obj})
    .then(buildings => buildings.data);
  }

  return SearchFactoryObj;
})
