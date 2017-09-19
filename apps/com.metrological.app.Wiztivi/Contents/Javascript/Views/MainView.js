var currentScenario = null;
var MainView = new MAF.Class( {
    ClassName: 'MainView',

    Extends: MAF.system.SidebarView,

    createView: function() {

        var vPos = 0;

        Sections.forEach(function (section, sectionIdx) {
            new MAF.element.Text({
                label: section.name,
                styles: {
                    height: 40, width: 400,
                    vOffset: vPos, hOffset: ( this.width - 400 ) / 2
                }
            } ).appendTo(this);

            vPos += 50;
            (section.scenarios || []).forEach(function( scenario, buttonIdx ) {
                
                scenario.section = section;
                scenario.action = section.action.bind(section, scenario);
                
                // Generate a unique name for the view.controls and the guid
                scenario.id = 'scenario' + (sectionIdx + 1) * buttonIdx;

                this.controls[ scenario.id ] = new MAF.control.TextButton( {
                    guid: scenario.id,
                    label: scenario.name,
                    // view: scenario.view || null,
                    styles: {
                        height: 80, width: 450,
                        vOffset: vPos, hOffset: ( this.width - 450 ) / 2,
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
                            return MAF.application.loadView( 'ScenarioDetailView' );
                        }
                    }
                } ).appendTo( this );
                vPos += 100;
            }, this );
        }, this);

    }
} );
