/*global BackboneTodo, Backbone*/

var app = app || {};

(function () {
    'use strict';

    var Todos = Backbone.Collection.extend({

        model: app.Todo,

        //Save all of the todo items under tiny piza sevrer//
        // url: 'https://tiny-pizza-server.herokuapp.com/collections/michelle-backbone-todo',
        localStorage: new Backbone.LocalStorage("backbone-todo"),

        completed:function () {
          return this.where({completed: true});
        },

        remaining: function () {
          return this.where({completed: false});
        },

        nextOrder: function () {
          return this.length ? this.last().get('order') + 1 : 1;
        },

        comparator: 'order'

    });

    app.todos = new Todos();

})();
