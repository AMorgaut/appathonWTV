var Sections = [
    {
        name: $_('My scenarios'),
        actionLabel: 'Edit',
        action: function edit(scenario) {
            Sections.alert('Edit "' + scenario.name + '"', 'Soon available.');
            // return MAF.application.loadView( 'EditView' );
        }
    },
    {
        name: $_('Installed'),
        actionLabel: 'Enable',
        action: function enable(scenario) {
            scenario.enabled = !scenario.enabled;

            if (scenario.enabled) {
                ScenarioPlayer.start(scenario);
                scenario.actionLabel = 'Disable';
            } else {
                ScenarioPlayer.stop(scenario);
                scenario.actionLabel = 'Enable';
            }

            scenario.actionButton.setText(scenario.actionLabel);

            Sections.alert(
                'Enable/Disable Scenario',
                '"' + scenario.title + '" has been ' + scenario.enabled ? 'enabled' : 'disabled'
            );
        }
    },
    {
        name: $_('Recommended'),
        actionLabel: 'Install',
        action: function install(scenario) {
            scenario.enabled = !scenario.enabled;
            scenario.actionLabel = scenario.enabled ? 'Disable' : 'Enable';
            scenario.actionButton.setText(scenario.actionLabel);
        }
    },
    {
        name: $_('With more devices'),
        actionLabel: 'Purchase Missing Devices',
        action: function purchase(scenario) {
            Sections.alert(
                'Send Command',
                'The missing devices for this scenario have been purchased. You will receive them soon.'
            );
        }
    }
];

Sections.alert = function (title, msg) {
    new MAF.dialogs.Alert( {
        title: title,
        message: msg,
        buttons: [ {
            label: $_( 'Close message' ),
            callback: function() { log( 'Closing Dialog' ); }
        } ]
    } ).show();
};



Sections.ButtonTypes = {
    EDIT: {
        label: 'Edit',
        action: function edit(scenario) {
            Sections.alert('Edit "' + scenario.name + '"', 'Soon available.');
            // return MAF.application.loadView( 'EditView' );
        }
    },
    ENABLE: {
        label: 'Enable',
        action: function enable(scenario) {
            scenario.enabled = !scenario.enabled;

            if (scenario.enabled) {
                ScenarioPlayer.start(scenario);
                this.label = 'Disable';
            } else {
                ScenarioPlayer.stop(scenario);
                this.label = 'Enable';
            }

            scenario.actionButton.setText(this.label);

            Sections.alert(
                'Enable/Disable Scenario',
                '"' + scenario.title + '" has been ' + scenario.enabled ? 'enabled' : 'disabled'
            );
        }
    },
    INSTALL: {
        label: 'Install',
        action: function install(scenario) {
            scenario.enabled = !scenario.enabled;
            scenario.actionLabel = scenario.enabled ? 'Disable' : 'Enable';
            scenario.actionButton.setText(scenario.actionLabel);
        }
    },
    PURCHASE: {
        label: 'Purchase Missing Devices',
        action: function purchase(scenario) {
            Sections.alert(
                'Send Command',
                'The missing devices for this scenario have been purchased. You will receive them soon.'
            );
        }
    },
    PUBLISH: {
        label: 'Publish',
        action: function edit(scenario) {
            Sections.alert('Publish "' + scenario.name + '"', 'Soon available.');
            // return MAF.application.loadView( 'EditView' );
        }
    },
    DELETE: {
        label: 'Delete',
        action: function edit(scenario) {
            Sections.alert('Delete "' + scenario.name + '"', 'Soon available.');
            // return MAF.application.loadView( 'EditView' );
        }
    }
};
