// Include mocks
include( 'Javascript/Sections.js');
include( 'Javascript/Scenarios.js');

include( 'Javascript/Services/Requests.js');
include( 'Javascript/Devices/Lights.js');

// Include your views
include( 'Javascript/Views/MainView.js');
include( 'Javascript/Views/ScenarioDetailView.js');
include( 'Javascript/Views/DevicesListView.js');
include( 'Javascript/Views/CreateView.js');
include( 'Javascript/Views/BrowseView.js');
include( 'Javascript/Views/MainMenuView.js');

// Init application with view config
MAF.application.init( {
	views: [
		{ id: 'MainView', viewClass: MainView },
		{ id: 'ScenarioDetailView', viewClass: ScenarioDetailView },
		{ id: 'MainMenuView', viewClass: MainMenuView },
        { id: 'CreateView', viewClass: CreateView },
        { id: 'ManageView', viewClass: BrowseView },
        { id: 'DevicesListView', viewClass: DeviceListView },
		{ id: 'About', viewClass: MAF.views.AboutBox } // Use standard About view

	],
	defaultViewId: 'MainView',
	settingsViewId: 'About'
} );
