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
		var hOffset =  ( this.width - 450 ) / 2;

		console.log('create detail view');
		new MAF.control.BackButton( {
			label: $_( 'BACK' ),
			styles: {
				vOffset: 50, paddingLeft: 50
			}
		} ).appendTo( this );

		this.scenarioTitle = new MAF.element.Text({
			label: currentScenario.name,
			styles: {
				height: 40, width: 200,
				vOffset: 130, hOffset: hOffset
			},
			textStyles: {
				fontSize: 70
			}
		} ).appendTo(this);

		this.splashImage = new MAF.element.Image( {
			src: 'Images/light.png',
			styles: {
				opacity: 0.45,
				width: 225,
				height: 225,
				hOffset: (this.width - 225)/2,
				vOffset: 200
			}
		} ).appendTo( this );

		this.description = new MAF.element.Text({
			label: currentScenario.description,
			styles: {
				height: 200, width: 450,
				vOffset: 460, hOffset: hOffset,
				textAlign: 'leftCenter',
				wrap: true
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

		var onButtonSelect = function() {
			if (!MotionSensor.getActive()) {
				MotionSensor.setActive(true);
				MotionSensor.reactOn(react);
			} else {
				MotionSensor.setActive(false);
				setTimeout(Lights.switchOff, 3000, 6);
			}
		};

		this.enableButton = new MAF.control.TextButton( {
			guid: 'scenarioEnableButton',
			label: 'Enable',
			view: currentScenario.view || null,
			styles: {
				height: 80, width: 450,
				vOffset: this.height - 300,
				hOffset: hOffset,
				borderRadius: 10,
				backgroundColor: " #99e699"
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
					onButtonSelect();
					if (MotionSensor.getActive()) {
						this.setText('Disable');
					} else {
						this.setText('Enable');
					}
					//onButtonSelect();
				}
			}
		} ).appendTo( this );

		this.editButton = new MAF.control.TextButton( {
			guid: 'scenarioEditButton',
			label: 'Edit',
			view: currentScenario.view || null,
			styles: {
				height: 80, width: 450,
				vOffset: this.height - 200,
				hOffset: hOffset,
				borderRadius: 10,
				backgroundColor: " #ffe066"
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
					//onButtonSelect();
				}
			}
		} ).appendTo( this );

		this.publishButton = new MAF.control.TextButton( {
			guid: 'scenarioPublishButton',
			label: 'Publish',
			view: currentScenario.view || null,
			styles: {
				height: 40, width: 450,
				vOffset: this.height - 100,
				hOffset: hOffset,
				borderRadius: 10,
				backgroundColor: "#99ccff"
			},
			textStyles: {
				anchorStyle: 'center'
			},
			events: {
				onFocus: function () {
					// console.log(ScenarioDetailView);
				},
				onSelect: function() {
					//onButtonSelect();
				}
			}
		} ).appendTo( this );

		this.deleteButton = new MAF.control.TextButton( {
			guid: 'scenarioDeleteButton',
			label: 'Delete',
			view: currentScenario.view || null,
			styles: {
				height: 40, width: 450,
				vOffset: this.height - 50,
				hOffset: hOffset,
				borderRadius: 10,
				backgroundColor: "#ff8080"
			},
			textStyles: {
				anchorStyle: 'center'
			},
			events: {
				onFocus: function () {
					// console.log(ScenarioDetailView);
				},
				onSelect: function() {
					onButtonSelect();
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
		this.scenarioTitle.setText(scenario.label);
		this.description.setText(scenario.description);
        //scenario.actionButton = this.actionButton;
		//this.actionButton.setText(section.actionLabel);
	}
} );
