'use strict';
/* globals module inject chai */
var expect = chai.expect;

describe('User Control for Admin', function () {

  /*------------------
      CONFIGURATION
  /------------------*/

  beforeEach(module('FullstackGeneratedApp'));

  describe('controller `TodoEditCtrl`', function () {

    var $scope, Todo, $state, todo;
    beforeEach(inject(function ($controller, $rootScope, _$state_, $q) {
      // a new scope object we can manipulate directly
      $scope = $rootScope.$new();
      // a fake resolved `todo` (doesn't rely on your state resolve)
      todo = { id: '456' };
      // a fake `Todo` factory (doesn't rely on your `Todo` factory)
      // `update` method returns a promise for an object with an id
      Todo = {
        update: chai.spy(function (id, todo) {
          return $q.when(todo);
        })
      };
      // replace `$state.go` with a func that sets a `_mockUrl` property
      $state = _$state_;
      $state.go = function () {
        $state._mockUrl = $state.href.apply($state, arguments);
      };
      // instantiate the controller and inject our test objects
      $controller('TodoEditCtrl', {
        $scope: $scope,
        todo: todo,
        Todo: Todo,
        $state: $state
      });
    }));

    /*------------------
        TEST SPECS
    /------------------*/

    it('places an injected `todo` on the scope', function(){
      expect($scope.todo).to.equal(todo);
    });

    describe('`.keepChanges` scope method', function () {

      it('uses the `Todo` factory', function () {
        // if you are curious how this is being used,
        // check out line 4 of todo.edit.html
        $scope.keepChanges();
        expect(Todo.update).to.have.been.called.once.with($scope.todo.id, $scope.todo);
      });

      it("goes to the todo's detail state after it has been updated", function () {
        $scope.keepChanges();
        // don't transition yet; the `update` promise hasn't settled!
        expect($state._mockUrl).not.to.equal('/todos/456');
        // use `$state.go` to make this work.
        // We modified `$state.go` to change `$state._mockUrl`
        // instead of actually transitioning to a new state.
        $scope.$digest(); // makes settled $q promise call handler
        expect($state._mockUrl).to.equal('/todos/456');
      });

    });

  });

  /*------------------
      CONFIGURATION
  /------------------*/

  describe('state', function () {

    var Todo, $state, $rootScope, $injector;
    beforeEach(inject(function ($q, _$state_, _$rootScope_, _$injector_) {
      $state = _$state_;
      $rootScope = _$rootScope_;
      $injector = _$injector_;
      // a fake Todo factory (doesn't rely on your Todo factory)
      // `getOne` method returns a promise for object with an `id`
      Todo = {
        getOne: chai.spy(function (id) {
          return $q.when({ id: id });
        })
      };
    }));

    /*------------------
        TEST SPECS
    /------------------*/

    it('url compiles correctly', function () {
      var url = $state.href('todos.edit', {id: '123'});
      expect(url).to.equal('/todos/123/edit');
    });

    it('resolves with a specific `todo` from the `Todo` factory', function (done) {
      // check that `todos.edit` state resolve's `todo` property is set
      var todoEditState = $state.get('todos.edit');
      var fn = todoEditState.resolve.todo;
      expect(fn).to.be.a('function');
      // inject our test objects into the resolve function and capture return
      var uniqueId = {};
      var result = $injector.invoke(fn, null, {
        Todo: Todo,
        $stateParams: { id: uniqueId }
      });
      // check the `Todo` factory was used in the func to fetch a specific todo
      expect(Todo.getOne).to.have.been.called.once.with(uniqueId);
      // check that the function returned the right thing
      result.then(function(todo){
        expect(todo).to.eql({ id: uniqueId });
      }).catch(done);
      // test framework stuff: makes settled $q promise call handler
      $rootScope.$digest();
      done();
    });

  });

});
