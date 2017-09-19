// Include your views
include( 'Javascript/Views/MainView.js');
include( 'Javascript/Services/Requests.js');
include( 'Javascript/Devices/Lights.js');
include( 'Javascript/Devices/Curtains.js');
include( 'Javascript/Devices/Fan.js');

// Init application with view config
MAF.application.init( {
	views: [
		{ id: 'MyView', viewClass: MainView },
		{ id: 'About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'MyView', // Declare what view to be loaded when opening the app
	settingsViewId: 'About' // Declare what view is opened when a used loads the settings
} );
