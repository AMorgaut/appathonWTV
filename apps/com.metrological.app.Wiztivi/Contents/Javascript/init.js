// Include your views
include( 'Javascript/Views/MainView.js');
include( 'Javascript/Views/DevicesListView.js');
include( 'Javascript/Views/CreateView.js');
include( 'Javascript/Views/BrowseView.js');
include( 'Javascript/Views/MainMenuView.js');
include( 'Javascript/Views/ScenarioEditor.js');

// Init application with view config
MAF.application.init( {
	views: [
		{ id: 'MyView', viewClass: MainView },
		{ id: 'About', viewClass: MAF.views.AboutBox },
		{ id: 'MainMenuView', viewClass: MainMenuView },
        { id: 'ScenarioEditor', viewClass: ScenarioEditor },
        { id: 'ManageView', viewClass: BrowseView },
        { id: 'DevicesListView', viewClass: DeviceListView }

	],
	defaultViewId: 'MainMenuView',
	settingsViewId: 'About'
} );
