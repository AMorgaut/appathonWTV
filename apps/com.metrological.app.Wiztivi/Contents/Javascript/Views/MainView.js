var currentScenario = null;
var MainView = new MAF.Class( {
    ClassName: 'MainView',

    Extends: MAF.system.SidebarView,

    createView: function() {

        var vPos = 0, hPos = ( this.width - 450 ) / 2;

        // add create scenario button
        this.controls[ 'createScenarioSelectButton' ] = new MAF.control.TextButton( {
            guid: 'createScenarioSelectButton',
            label: $_('Create new scenario'),
            // view: scenario.view || null,
            styles: {height: 40, width: 450, vOffset: vPos, hOffset: hPos, borderRadius: 10},
            textStyles: {anchorStyle: 'center'},
            events: {onSelect: function() {
                return MAF.application.loadView( 'CreateView' );
            }}
        } ).appendTo( this );
        vPos += 70;

        Sections.forEach(addSection, this);

        function addSection(section, sectionIdx) {
            section.id = 'section' + sectionIdx;

            new MAF.element.Text({
                label: section.name,
                styles: {
                    height: 40, width: 400,
                    vOffset: vPos, hOffset: ( this.width - 400 ) / 2
                }
            } ).appendTo(this);

            vPos += 50;
            console.log('section', section);
            this.currentSection = section;
            (section.scenarios || []).forEach(addScenario, this );
        }

        function addScenario( scenario, buttonIdx ) {

            var section = this.currentSection;
            scenario.section = section;
            scenario.action = section.action.bind(section, scenario);

            // Generate a unique name for the view.controls and the guid
            scenario.id = section.id + 'scenario' + buttonIdx;

            var textButton = new MAF.control.TextButton( {
                guid: scenario.id + 'selectButton',
                label: scenario.name,
                // view: scenario.view || null,
                styles: {
                    height: 80, width: 450,
                    vOffset: vPos, hOffset: hPos,
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
                        currentScenario = scenario;
                        console.log('scenario', scenario);
                        return MAF.application.loadView( section.view || 'ScenarioDetailView' );
                    }
                }
            } );
            this.controls[ scenario.id ] =textButton;
            textButton.appendTo( this );
            if (section.id === 'section0') {
                textButton.focus();
            }
            vPos += 100;
        }

    }
} );
