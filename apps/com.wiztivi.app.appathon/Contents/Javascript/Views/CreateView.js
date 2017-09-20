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

        var CreateViewGrid = this.elements.elementGrid = new MAF.element.Grid({
            rows: 1,
            columns: 3,
            styles: {
                width: this.width,
                height: 200 - backButton.outerHeight,
                vOffset: backButton.outerHeight
            },
            cellCreator: function () {
                var cell = new MAF.element.GridCell({
                    styles: this.getCellDimensions(),
                    events: {
                        onSelect: function () {
                            MAF.application.loadView('ScenarioEditor', {});
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
        console.log(this.persist.device);
        console.log(this.persist.action);
        if (this.persist.device) {
            console.log("YEAH");
            this.elements.elementGrid.changeDataset([
                {
                    title: this.persist.device,
                    label: 'DevicesListView'
                },
                {
                    title: $_('Select a reaction'),
                    label: 'DevicesListView'
                },
                {
                    title: $_('Add another reaction'),
                    label: 'DevicesListView'
                }
            ], true);
        }
        else {
            this.elements.elementGrid.changeDataset([
                {
                    title: $_('Select an action'),
                    label: 'DevicesListView'
                },
                {
                    title: $_('Select a reaction'),
                    label: 'DevicesListView'
                },
                {
                    title: $_('Add another reaction'),
                    label: 'DevicesListView'
                }
            ], true);
        }
    },
});