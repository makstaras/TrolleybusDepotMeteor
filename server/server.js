Meteor.methods({
    'submitPost': function(title, body) {
       // console.log(title);
       // console.log(body);
        Blogs.insert({
            title: title,
            body: body,
           // comment: comment
        });
    },

'submitTrol': function(name, kind, mark) {
       // console.log(title);
       // console.log(body);
        Trol.insert({
            name: name,
            kind: kind,
            mark: mark,
        });
    },

   'submitWork': function(date, name, route, trolley) {
       // console.log(title);
       // console.log(body);
        Work.insert({
            date: date,
            name: name,
            route: route,
            trolley: trolley,
           // comment: comment
        });
    },

    'delete': function(id, title) {
        CalEvent.remove({
            _id: id
        });
    },

    'saveCalEvent': function(ce) {
        CalEvent.insert(ce);
    },
    'updateTitle': function(id, title) {
        return CalEvent.update({
            _id: id
        }, {
            $set: {
                title: title
            }
        });
    },
    'moveEvent': function(reqEvent) {
        return CalEvent.update({
            _id: reqEvent._id
        }, {
            $set: {
                start: reqEvent.start,
                end: reqEvent.end
            }
        })
    }
});


Meteor.startup(function() {
    if (Meteor.users.find().fetch().length === 0) {
        var users = [{
            name: 'Користувач',
            email: 'cs@home.com',
            roles: ['view-projects']
        }, {
            name: 'Адміністратор',
            email: 'admin@home.com',
            roles: ['admin']
        }];
        _.each(users, function(userData) {
            var userid = Accounts.createUser({
                email: userData.email,
                password: 'mytest1',
                roles: ['view-projects'],
                username: userData.email,
                profile: {
                    name: userData.name
                }
            })
            Meteor.users.update({
                _id: userid
            }, {
                $set: {
                    'emails.0.verified': true
                }
            });
            Roles.addUsersToRoles(userid, ['view-projects']);
        })
    }
})