// Include mocks
include( 'Javascript/Sections.js');
include( 'Javascript/Scenarios.js');

// Include your views
include( 'Javascript/Views/MainView.js');
include( 'Javascript/Views/ScenarioDetailView.js');

// Init application with view config
MAF.application.init( {
	views: [
		{ id: 'MyView', viewClass: MainView },
		{ id: 'ScenarioDetailView', viewClass: ScenarioDetailView },
		{ id: 'About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'MyView', // Declare what view to be loaded when opening the app
	settingsViewId: 'About' // Declare what view is opened when a used loads the settings
} );
