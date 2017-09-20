var MainMenuView = new MAF.Class({
    ClassName: 'MainMenuView',
    Extends: MAF.system.FullscreenView,

    initialize: function () {
        this.parent();
    },

    initView: function() {
        this.setStyle( 'backgroundColor', 'rgba( 0, 0, 0, 0.8 )' );
    },

    createView: function () {

        var backButton = new MAF.control.BackButton({
            label: $_('BACK')
        }).appendTo(this);

        var MainMenuGrid = this.elements.elementGrid = new MAF.element.Grid({
            rows: 1,
            columns: 3,
            styles: {
                width: this.width,
                height: this.height - backButton.outerHeight,
                vOffset: backButton.outerHeight
            },
            cellCreator: function () {
                var cell = new MAF.element.GridCell({
                    styles: this.getCellDimensions(),
                    events: {
                        onSelect: function () {
                            MAF.application.loadView(cell.title.getText(), {});
                        },
                        onFocus: function () {
                            this.animate({
                                backgroundColor: 'red',
                                duration: 0.3,
                                scale: 1.2
                            });

                            this.title.animate({
                                duration: 0.3,
                                color: 'black'
                            });
                        },
                        onBlur: function () {

                            this.animate({
                                backgroundColor: null,
                                duration: 0.3,
                                scale: 1.0
                            });
                            this.title.animate({
                                duration: 0.3,
                                color: 'white'
                            });
                        }
                    }
                });

                cell.title = new MAF.element.Text({
                    styles: {
                        width: cell.width,
                        height: cell.height,
                        color: 'white',
                        fontSize: 30,
                        anchorStyle: 'center',
                        wrap: true
                    }
                }).appendTo(cell);

                return cell;
            },
            cellUpdater: function (cell, data) {
                cell.title.setText(data.title);
            }
        }).appendTo(this);
    },

    updateView: function () {
        this.elements.elementGrid.changeDataset([
            {title: $_('ScenarioEditor')},
            {title: $_('ManageView')},
            {title: $_('BrowseView')}
        ], true);
    },
});