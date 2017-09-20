include(' Javascript/Devices/Devices.js');
include(' Javascript/Views/ScenarioEditorBis.js');
var selectedAction = undefined;

var ActionSelectionBis = new MAF.Class( {
    Classname: 'ActionSelectionBis',
    Extends: MAF.system.FullscreenView,

    initialize: function() {
        this.parent();
    },

    initView: function() {
        this.setStyle( 'backgroundColor', 'rgba( 0, 0, 0, 0.8 )' );
    },

    createView: function() {

        selectedDevice = this.persist.device;
        new MAF.control.BackButton( {
            label: $_( 'BACK' ),
            styles: {
                vOffset: 50,
                paddingLeft: 50
            }
        } ).appendTo( this );

        this.elements.slider = new MAF.element.SlideCarousel( {
            visibleCells: 4,
            subCells: 1,
            focusIndex: 1,
            slideDuration: 0.3,
            styles: {
                width: this.width + 80,
                height: 600,
                hOffset: 49,
                vAlign: 'bottom',
                vOffset: 100
            },

            cellCreator: function() {
                var cell = new MAF.element.SlideCarouselCell( {
                    styles: Object.merge(
                        { backgroundColor: '#000000' },
                        this.getCellDimensions()
                    ),
                    events: {

                        onSelect: function() {
                            selectedAction = this.title.getText();
                            this.title.setText('SELECTED!');
                            MAF.application.loadView('CreateView', {device2: selectedDevice, action2: selectedAction});
                        },

                        onFocus: function() {
                            this.title.animate( {
                                scale: 1.3,
                                duration: 0.3
                            } );

                            this.setStyle(
                                'backgroundColor',
                                '01A0E2'
                            );
                            selectedCell = this.getCellDataIndex();
                        },
                        onBlur: function() {
                            this.title.animate( {
                                scale: 1,
                                duration: 0.3
                            } );

                            this.setStyle( 'backgroundColor', '#000000' );
                        }
                    }
                } );

                cell.title = new MAF.element.Text( {
                    styles: {
                        width: cell.width,
                        textAlign: 'center',
                        vAlign: 'center',
                        color: '#F1F1F1',
                        fontSize: 32
                    }
                } ).appendTo( cell );
                return cell;
            },

            cellUpdater: function( cell, data ) {
                cell.title.setText( data.title );
            },
            events: {
                onDatasetChanged: function() {
                    this.getCurrentCell().focus();
                }
            }
        }).appendTo( this );

        sliderGrid = this.elements.slider;
    },

    updateView : function() {
    },

    setOnSelectEvent : function(slider) {
        if (slider) {
            slider.forEach(function (element) {
                element.events.onSelect(function () {
                    sliderGrid.forEach(function (element) {
                        if (element !== selectedCell) {
                            element.hide();
                        }
                    });
                });

            });
        }
    },

    focusView: function() {
        var actions = getDeviceActions(selectedDevice);
        var act = new Array();
        actions.forEach(function(action) {
            act.push({title: action.label})
        });
        this.elements.slider.changeDataset(act, true);
    }
});

function getDeviceActions(device) {
    return Devices[device].actions;
}
