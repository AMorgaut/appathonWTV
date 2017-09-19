// Include your views
include( 'Javascript/Views/MainView.js');
include( 'Javascript/Views/DevicesListView.js');
include( 'Javascript/Views/CreateView.js');
include( 'Javascript/Views/BrowseView.js');
include( 'Javascript/Views/MainMenuView.js');

// Init application with view config
MAF.application.init( {
	views: [
		{ id: 'MyView', viewClass: MainView },
		{ id: 'About', viewClass: MAF.views.AboutBox },
		{ id: 'MainMenuView', viewClass: MainMenuView },
        { id: 'CreateView', viewClass: CreateView },
        { id: 'ManageView', viewClass: BrowseView },
        { id: 'DevicesListView', viewClass: DeviceListView }

	],
	defaultViewId: 'MainMenuView',
	settingsViewId: 'About'
} );
