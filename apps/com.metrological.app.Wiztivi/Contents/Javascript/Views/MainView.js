var MainView = new MAF.Class( {
    ClassName: 'MainView',
    Extends: MAF.system.FullscreenView,

    initialize: function() {
        this.parent();
    },

    createView: function() {
        var helloChange = function() {
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
    },

    updateView: function() {}
} );