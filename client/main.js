Template.blog.events({
	'submit #blogForm':function(e){
		e.preventDefault(); 
		var title = $('#blogTitle').val();
		var body = $('#blogBody').val();
		if(title.length && body.length){
			Meteor.call('submitPost',title,body)
		}
	}
})

Template.listblogs.blogs = function(){
	return Blogs.find(); 
}

Template.main.rendered = function(){
	var calendar = $('#calendar').fullCalendar({	
	})
}

Router.route('post',{
	path: '/post',	
});

Router.route('calendar',{
	path: '/calendar',	
});

Router.route('home',{
		
	path:'/:limit?',
	template: 'home',
	layoutTemplate: 'Layout',
	yieldTemplates: {
		'Aside' : {to: 'aside'},
		'Footer' : {to: 'footer'}
	},
	
	data: function() {
		var news = [{
			Project:'Information system on C++',
			Description:'with files'
			},{
			Project:'Information system on C#',
			Description:'DB - MySQL'
			},{
			Project:'Internet shop on PHP',
			Description:'pure php'
			}
		]
		return {news: news.slice(0,this.params.limit)};
	}
});



