var savedAction = undefined;
var savedDevice = undefined;
var count = 0;

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
                            count++;
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
                        fontSize: 20,
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
        if (this.persist.device && this.persist.action) {
            savedDevice = this.persist.device;
            savedAction = this.persist.action;
            this.elements.elementGrid.changeDataset([
                {
                    title: this.persist.device + " - " + this.persist.action,
                    label: 'DevicesListView'
                },
                {
                    title: 'Philips Hue - Switch on lights',
                    label: 'DevicesListView'
                },
                {
                    title: $_('Add another reaction'),
                    label: 'DevicesListView'
                }
            ], true);
        } else if (savedDevice !== undefined && savedAction !== undefined && this.persist.device && this.persist.action) {
            this.elements.elementGrid.changeDataset([
                {
                    title: savedDevice + " - " + savedAction,
                    label: 'DevicesListView'
                },
                {
                    title: this.persist.device + " - " + this.persist.action,
                    label: 'DevicesListView'
                },
                {
                    title: $_('Add another reaction'),
                    label: 'DevicesListView'
                }
            ], true);
        } else {
            this.elements.elementGrid.changeDataset([
                {
                    title: 'Doorbird DVS - Unlock door',
                    label: 'DevicesListView'
                },
                {
                    title: 'Philips Hue - Switch on lights',
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