    Router.route('post', {
        path: '/post',
    });

    Router.route('userpost', {
        path: '/userpost',
    });

    Router.route('calendar', {
        path: '/calendar',
    });

    Router.route('maps',{
        path: '/maps',
    });

    Router.route('tr',{
        path: '/tr',
    });

    Router.route('gallery',{
        path: '/gallery',
    });

  Router.route('work',{
        path: '/work',
    });

    Router.route('home', {
        path: '/:limit?',
        template: 'home',
        layoutTemplate: 'Layout',
        yieldTemplates: {
            'Aside': {
                to: 'aside'
            },
            'Footer': {
                to: 'footer'
            }
        },

        data: function() {
            var news = [{
                Project: 'Одновагонні тролейбуси',
                Description: 'з 2 чи 3 дверима'
            }, {
                Project: 'Двовагонні тролейбуси',
                Description: 'з 4 дверима'
            }, {
                Project: 'Автобуси',
                Description: 'з 2 дверима'
            }]
            return {
                news: news.slice(0, this.params.limit)
            };
        }
    });