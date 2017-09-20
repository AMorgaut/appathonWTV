var DeviceListView = new MAF.Class( {
    ClassName: 'DeviceListView',
    Extends: MAF.system.FullscreenView,

    initialize: function() {
        this.parent();
    },

    initView: function() {
        this.setStyle( 'backgroundColor', 'rgba( 0, 0, 0, 0.8 )' );
    },

    createView: function() {

        var backButton = new MAF.control.BackButton( {
            label: $_('BACK')
        } ).appendTo( this );

        var gridView = this.elements.elementGrid = new MAF.element.Grid( {
            rows: 2,
            columns: 2,
            styles: {
                width: this.width,
                height: this.height - backButton.outerHeight,
                vOffset: backButton.outerHeight
            },
            cellCreator: function() {
                var cell = new MAF.element.GridCell( {
                    styles: this.getCellDimensions(),
                    events:{
                        onSelect: function() {
                            log( 'onSelect function GridCell', this.getCellIndex() );
                        },
                        onFocus: function() {
                            var cellIndex = this.getCellIndex();

                            if ( 1 === cellIndex || 2 === cellIndex ) {
                                this.animate( {
                                    backgroundImage: 'Images/focus.png',
                                    backgroundRepeat: 'repeat-x',
                                    duration: 0.3,
                                    scale: 1.2
                                } );
                            } else {
                                this.animate( {
                                    backgroundColor: 'white',
                                    duration: 0.3,
                                    scale: 1.2
                                } );

                                this.title.animate( {
                                    duration: 0.3,
                                    color: 'black'
                                } );
                            }
                        },
                        onBlur: function () {
                            var cellIndex = this.getCellIndex();

                            if ( 1 === cellIndex || 2 === cellIndex ) {
                                this.animate( {
                                    backgroundImage: null,
                                    duration: 0.3,
                                    scale: 1.0
                                } );
                            } else {
                                this.animate( {
                                    backgroundColor: null,
                                    duration: 0.3,
                                    scale: 1.0
                                } );
                                this.title.animate( {
                                    duration: 0.3,
                                    color: 'white'
                                });
                            }
                        }
                    }
                } );

                cell.title = new MAF.element.Text( {
                    styles: {
                        width: cell.width,
                        height: cell.height,
                        color: 'white',
                        fontSize: 30,
                        anchorStyle: 'center',
                        wrap: true
                    }
                } ).appendTo( cell );

                return cell;
            },
            cellUpdater: function( cell, data ) {
                cell.title.setText( data.title );
            }
        } ).appendTo( this );
    },

    updateView: function() {
        this.elements.elementGrid.changeDataset( [
            { title: $_('Cell1') },
            { title: $_('Cell2') },
            { title: $_('Cell3') },
            { title: $_('Cell4') }
        ], true );
    },
   /*     var helloChange = function() {
            ourText.setText("Oh hello there !");
        };


        var ourText = new MAF.element.Text( {
            label: $_('HelloWorld'),
            styles:{
                width: this.width,
                height: this.height,
                fontSize: 60,
                anchorStyle: 'center'
            }
        } ).appendTo( this );

        // Create a Text button with a select event
        var textButton = new MAF.control.TextButton( {
            label: $_('Texte initial'),
            styles: {
                width: 400,
                height: 60,
                anchorStyle : 'center',
                hOffset: (this.width - 400) / 2,

                vOffset: (this.height + 100) / 2
            },
            textStyles: { anchorStyle: 'center' },
            events: {
                onSelect: function() {
                    this.setText('COUCOU');
                    helloChange();
                    log('onSelect function TextButton');
                }
            }
        } ).appendTo( this );
    },*/    
} );
