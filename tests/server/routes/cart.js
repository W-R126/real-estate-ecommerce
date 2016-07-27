// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

describe('Carts Route', function () {

    var app, Cart, agent, cart;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        Cart = db.model('building');
        agent = supertest.agent(app);
    });

    var cartInfo = {
      demo: 'great'
    };

    beforeEach('Create a building', function (done) {
      return Cart.create(cartInfo)
      .then(createdBuilding => {
          cart = createdBuilding;
          done()
      })
      .catch(done);
    });

    afterEach(function(){
      return db.sync({force: true});
    });

  describe('/api/carts', function () {

      it('GET all', function (done) {
        agent
        .get('/api/carts')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.be.instanceof(Array);
          expect(res.body).to.have.length(1);
          done();
        });
      });

      it('GET one', function (done) {
        agent
        .get('/api/buildings/' + building.id)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.title).to.equal(building.title);
          done();
        });
      });

  });

});
