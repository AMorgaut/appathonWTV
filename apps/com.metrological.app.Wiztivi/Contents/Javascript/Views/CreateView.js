var CreateView = new MAF.Class({
    ClassName: 'CreateView',
    Extends: MAF.system.FullscreenView,

    initialize: function () {
        this.parent();
    },

    createView: function () {

        var backButton = new MAF.control.BackButton({
            label: $_('BACK')
        }).appendTo(this);


        var helloChange = function() {
            ourText.setText("Oh hello there !");
        };

        var ourText = new MAF.element.Text({
            label: $_('Create'),
            styles: {
                width: this.width,
                height: this.height,
                fontSize: 60,
                anchorStyle: 'center'
            }
        }).appendTo(this);

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

    updateView: function () {

    }
});