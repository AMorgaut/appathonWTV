var selectedCell = undefined;
var sliderGrid = undefined;
var selectedDevice = undefined;
var savedValue = 0;

var imagesValues = [
    'Images/forestCurtains.png',
    'Images/philipsMotionIcon.png',
    'Images/sonosPlay1Icon.png',
    'Images/doorbirdIcon.png',
    'Images/hueIcon.png',
    'Images/nukiLockIcon.png',
    'Images/dysonFan.png',
    'Images/siemensCoffeeIcon.png',
    'Images/netgearArloIcon.png',
    'Images/siemensFridgeIcon.png'
];

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
                                '#01A0E2'
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
                }).appendTo(cell);
                cell.icon = new MAF.element.Image({
                    styles: {
                        width: 100,
                        height: 100,
                        hOffset: (cell.width - 100) / 2,
                        vOffset: (cell.height - 250) / 2
                        //backgroundImage: imagesValues[0]
                    },
                    src: imagesValues[savedValue]
                }).appendTo(cell);
                savedValue++;
                return cell;
            },

            cellUpdater: function( cell, data ) {

                cell.title.setText( data.title );

                console.log(cell);
                console.log(data);
                cell.icon.src = data.src;
            },
            events: {
                    onDatasetChanged: function() {
                    //this.getCurrentCell().focus();
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
            {
                title: $_( 'Forest Curtains' ),
                src: 'Images/forestCurtains.png'
            },
            {
                title: $_( 'Philips Motion Sensor' ),
                src: 'Images/philipsMotionIcon.png'
            },
            {
                title: $_( 'Sonos Play 1' ),
                src: 'Images/sonosPlay1Icon.png'
            },
            {
                title: $_( 'Doorbird RVS' ),
                src: 'Images/doorbirdIcon.png'
            },
            {
                title: $_( 'Philips Hue' ),
                src: 'Images/hueIcon.png'
            },
            {
                title: $_( 'Nuki Smart Lock' ),
                src: 'Images/nukiLockIcon.png'
            },
            {
                title: $_( 'Dyson Pure Hot&Cool' ),
                src: 'Images/dysonFan.png'
            },
            {
                title: $_( 'Siemens Coffemachine' ),
                src: 'Images/siemensCoffeeIcon.png'
            },
            {
                title: $_( 'Netgear Arlo Pro Duo' ),
                src: 'Images/netgearArloIcon.png'
            },
            {
                title: $_( 'Siemens iQ500' ),
                src: 'Images/siemensFridgeIcon.png'
            }
        ], true );
    }
});
