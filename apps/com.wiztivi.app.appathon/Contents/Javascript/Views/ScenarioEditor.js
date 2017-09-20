var selectedCell = undefined;
var sliderGrid = undefined;
var selectedDevice = undefined;

var ScenarioEditor = new MAF.Class( {
    Classname: 'ScenarioEditor',
    Extends: MAF.system.FullscreenView,

    initialize: function() {
        this.parent();
    },

    initView: function() {
        this.setStyle( 'backgroundColor', 'rgba( 0, 0, 0, 0.8 )' );
    },

    createView: function() {

        new MAF.control.BackButton( {
            label: $_( 'BACK' ),
            styles: {
                vOffset: 50,
                paddingLeft: 50
            }
        } ).appendTo( this );

        this.elements.slider = new MAF.element.SlideCarousel( {
            visibleCells: 4,
            subCells: 2,
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
                            selectedDevice = this.title.getText();
                            this.title.setText('SELECTED!');
                            MAF.application.loadView('ActionSelectionView', {device : selectedDevice});
                        },

                        onFocus: function() {
                            this.title.animate( {
                                scale: 1.3,
                                duration: 0.3
                            } );

                            this.setStyle(
                                'backgroundColor',
                                'red'
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
        this.elements.slider.changeDataset( [
            { title: $_( 'Forest Curtains' ) },
            { title: $_( 'Philips Motion Sensor' ) },
            { title: $_( 'Sonos PLAY:1 Black' ) },
            { title: $_( 'Doorbird RVS' ) },
            { title: $_( 'Philips Hue' ) },
            { title: $_( 'Nuki Smart Lock' ) },
            { title: $_( 'Dyson Pure Hot&Cool' ) },
            { title: $_( 'Siemens Coffemachine' ) },
            { title: $_( 'Netgear Arlo Pro Duo' ) },
            { title: $_( 'Siemens Fridge iQ500' ) }
        ], true );
    }
});
