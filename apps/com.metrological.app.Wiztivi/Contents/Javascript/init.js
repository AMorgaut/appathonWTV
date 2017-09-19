// Include mocks
include( 'Javascript/Sections.js');
include( 'Javascript/Scenarios.js');

include( 'Javascript/Services/Requests.js');
include( 'Javascript/Devices/Curtains.js');
include( 'Javascript/Devices/Lights.js');

// Include your views
include( 'Javascript/Views/MainView.js');
include( 'Javascript/Views/ScenarioDetailView.js');
include( 'Javascript/Views/DevicesListView.js');
include( 'Javascript/Views/CreateView.js');
include( 'Javascript/Views/BrowseView.js');
include( 'Javascript/Views/MainMenuView.js');
include( 'Javascript/Views/ScenarioEditor.js');
include( 'Javascript/Views/ActionSelectionView.js');

// Init application with view config
MAF.application.init( {
	views: [
		{ id: 'MainView', viewClass: MainView },
        { id: 'ActionSelectionView', viewClass: ActionSelectionView },
		{ id: 'ScenarioDetailView', viewClass: ScenarioDetailView },
		{ id: 'MainMenuView', viewClass: MainMenuView },
        { id: 'ScenarioEditor', viewClass: ScenarioEditor },
        { id: 'ManageView', viewClass: BrowseView },
        { id: 'DevicesListView', viewClass: DeviceListView },
        { id: 'About', viewClass: MAF.views.AboutBox }, // Use standard About view
        { id: 'CreateView', viewClass: CreateView }
	],
	defaultViewId: 'MainView',
	settingsViewId: 'About'
} );
