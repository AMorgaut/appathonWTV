var ScenarioDetailView = new MAF.Class( {
	ClassName: 'ScenarioDetailView',

	// Extend a FullscreenView instead of SidebarView
	// Extends: MAF.system.FullscreenView,

    Extends: MAF.system.SidebarView,

	// Set background color of the view on initialize of the class
	initView: function() {
		console.log('init detail view');
		this.setStyle( 'backgroundColor', 'rgba( 0, 0, 0, 0.8 )' );
	},

	createView: function() {
        var section = currentScenario.section;

		console.log('create detail view');
		new MAF.control.BackButton( {
			label: $_( 'BACK' ),
			styles: {
				vOffset: 50, paddingLeft: 50
			}
		} ).appendTo( this );

		this.title = new MAF.element.Text({
			label: currentScenario.name,
			styles: {
				height: 40, width: 400,
				vOffset: 200, hOffset: ( this.width - 400 ) / 2,
				textAlign: 'leftCenter'

			},
			textStyles: {
				fontSize: 35
			}
		} ).appendTo(this);

		this.description = new MAF.element.Text({
			label: currentScenario.description,
			styles: {
				height: 200, width: 800,
				vOffset: 300, hOffset: ( this.width - 400 ) / 2,
				textAlign: 'leftCenter'

			},
			textStyles: {
				fontSize: 35
			}
		} ).appendTo(this);

		var react = function(data) {
			console.log(data.state.presence);
			if (data.state.presence && MotionSensor.getActive()) {
				Lights.switchOn(6, undefined, 65535, 254, false);
			} else {
				Lights.switchOff(6);
				setTimeout(Lights.switchOf, 1000, 6);
			}
		};

		var onSelect = function() {
			if (!MotionSensor.getActive()) {
				MotionSensor.setActive(true);
				MotionSensor.reactOn(react);
			} else {
				MotionSensor.setActive(false);
				setTimeout(Lights.switchOff, 3000, 6);
			}
		};

		this.actionButton = new MAF.control.TextButton( {
			guid: 'scenarioActionButton',
			label: section.actionLabel,
			view: currentScenario.view || null,
			styles: {
				height: 80, width: 450,
				vOffset: this.height - 100, hOffset: ( this.width - 450 ) / 2,
				borderRadius: 10
			},
			textStyles: {
				fontSize: 35,
				anchorStyle: 'center'
			},
			events: {
				onFocus: function () {
					// console.log(ScenarioDetailView);
				},
				onSelect: function() {
					currentScenario.action();
				}
			}
		} ).appendTo( this );
	},

	// After the update view the focus view is called
	focusView: function() {
		console.log('focus detail view');
		// update the current scenario
		var scenario = currentScenario;
        var section = scenario.section;
		this.title.setText(scenario.label);
		this.description.setText(scenario.description);
        scenario.actionButton = this.actionButton;
		this.actionButton.setText(section.actionLabel);
	}
} );
