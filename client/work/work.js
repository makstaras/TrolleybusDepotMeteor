if(Meteor.isClient){
	 Template.work.events({
        'submit #wForm': function(e) {
            e.preventDefault();
            var date = $('#wDate').val();
            var name = $('#wName').val();
            var route = $('#wRoute').val();
            var trolley = $('#wTrol').val();
            if (date.length && name.length && route.length && trolley.length) {
                Meteor.call('submitWork', date, name, route, trolley)
            }
        }
    })

	Template.work.works = function() {
        return Work.find();
    }

    Template.work.events({
        'click .deleteWork': function(evt, tmpl) {
            Work.remove(this._id);
        }
	})
}