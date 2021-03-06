if (Meteor.isClient) {

    Template.dialog.events({

        'click .closeDialog': function(evt, tmpl) {
            Session.set('editing_event', null);
        },
        'click .updateTitle': function(evt, tmpl) {
            var title = tmpl.find('#title').value;
            Meteor.call('updateTitle', Session.get('editing_event'), title);
            Session.set('editing_event', null);
        },
        'click .delete': function(evt, tmpl) {
            var title = tmpl.find('#title').value;
            Meteor.call('delete', Session.get('editing_event'), title);
            Session.set('editing_event', null);
        }

    });
    Template.main.helpers({
        editing_event: function() {
            return Session.get('editing_event');
        }
    });
    Template.dialog.helpers({
        title: function() {
            var ce = CalEvent.findOne({
                _id: Session.get('editing_event')
            });
            return ce.title;
        }
    });
    Template.dialog.rendered = function() {
        if (Session.get('editDialog')) {
            var calevent = CalEvent.findOne({
                _id: Session.get('editing_event')
            });
            if (calevent) {
                $('#title').val(calevent.title);
            }
        }
    }
    Template.main.rendered = function() {
        var calendar = $('#calendar').fullCalendar({
            dayClick: function(date, allDay, jsEvent, view) {
                var calendarEvent = {};
                calendarEvent.start = date;
                calendarEvent.end = date;
                calendarEvent.title = 'Техогляд';
                calendarEvent.owner = Meteor.userId();
                Meteor.call('saveCalEvent', calendarEvent);
            },
            eventClick: function(calEvent, jsEvent, view) {
                Session.set('editing_event', calEvent._id);
                $('#title').val(calEvent.title);
            },
            eventDrop: function(reqEvent) {
                Meteor.call('moveEvent', reqEvent);
            },
            events: function(start, end, callback) {
                var calEvents = CalEvent.find({}, {
                    reactive: false
                }).fetch();
                callback(calEvents);
            },
            editable: true,
            selectable: true
        }).data().fullCalendar;
        Deps.autorun(function() {
            CalEvent.find().fetch();
            if (calendar) {
                calendar.refetchEvents();
            }
        })
    }




    Template.blog.events({
        'submit #blogForm': function(e) {
            e.preventDefault();
            var title = $('#blogTitle').val();
            var body = $('#blogBody').val();
            if (title.length && body.length) {
                Meteor.call('submitPost', title, body)
            }
        }
    })

    Template.listblogs.blogs = function() {
        return Blogs.find();
    }


    Template.listblogs.events({
        'click .deletePost': function(evt, tmpl) {
            Blogs.remove(this._id);
        }

    });


//USERPOST
    Template.userpost.blogs = function() {
        return Blogs.find();
    }

Template.userpost.events({
        'submit #blogForm': function(e) {
            e.preventDefault();
            var comment = $('#blogComment').val();
            if (comment.length) {
                Meteor.call('submitComment', comment)
            }
        }
    })



    // WORK TROLLEYBUSES
  
}