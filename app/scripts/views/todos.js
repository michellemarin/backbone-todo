/*global BackboneTodo, Backbone, JST*/

var app = app || {};

(function () {
    'use strict';

    app.TodoView = Backbone.View.extend({

        //template: JST['app/scripts/templates/todos.ejs'],

        tagName: 'li',

        template: _.template( $('#item-template').html() ),

        events: {
          'click.toggle': 'togglecompleted',
          'dbclick label': 'edit',
          'click .destroy': 'clear',
          'keypress .edit': 'updateOnEnter',
          'blur .edit': 'close'
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
            this.$el.toggleClass('completed', this.model.get('completed') );
            this.toggleVisible();
            this.$input = this.$('.edit');
            return this;
        },

        toggleVisible: function () {
          this.$el.toggleClass('hidden', this.isHidden());
        },

        isHidden: function () {
          var isCompleted = this.model.get('completed');
          return (
            (!isCompleted && app.TodoFilter === 'completed')
            || (isCompleted && app.TodoFilter === 'active')
          );
        },

        togglecompleted: function () {
          this.model.toggle();
        },

        edit: function () {
          this.$el.addClass('editing');
          this.$input.focus();
        },

        close: function () {
          var value = this.$input.val().trim();

          if (value) {
            this.model.save({ title: value });
          } else {
            this.clear();
          }

          this.$el.removeClass('editing');
        },

        updateOnEnter: function( event ) {
          if(event.which === app.ENTER_KEY) {
            this.close();
          }
        },
        clear: function () {
          this.model.destroy();
        }

    });

})();
