var simonView;
var MainView = new MAF.Class( {
    ClassName: 'MainView',
    Extends: MAF.system.FullscreenView,

    initialize: function() {
        this.parent();
    },

    createView: function() {

        simonView = this;


        this.tabIOTEvents = [];

        this.launchButton = new MAF.control.TextButton({
            label: $_('Start new game'),
            styles: {
                width: this.width,
                height: 40,
                vOffset: this.height - 40
            },
            textStyles: {
                anchorStyle: 'center'
            },
            events: {
                onSelect: function () {
                    launchGame();
                    this.toggleDisabled();
                }
            }

        }).appendTo( this );

        // Create a Grid, by adding it into the view.controls object and
        // setting guid focus will be remembered when returning to the view

        this.grid = new MAF.control.Grid( {
            guid: 'myControlGrid',
            rows: 2,
            columns: 2,
            styles: {
                width: this.width / 2,
                height: this.height / 2,
                vOffset: (this.height - (this.height / 2)) / 2,
                hOffset: this.width / 4
            },
            cellCreator: function() {
                // Create cells for the grid
                var cell = new MAF.control.GridCell( {
                    styles: this.getCellDimensions(),
                    events: {
                        onSelect: function () {
                            simonView.tabIOTEvents[this.getCellIndex()]();
                            userSequence.push(this.getCellIndex());
                            checkLastElement();
                        }
                    }
                } );

                cell.title = new MAF.element.Text( {
                    styles: {
                        width: cell.width,
                        height: cell.height,
                        color: '#F1F1F1',
                        fontSize: 30,
                        anchorStyle: 'center',
                        wrap: true
                    }
                } ).appendTo( cell );

                return cell;
            },
            cellUpdater: function( cell, data ) {
                // Update cell when change dataset has been called
                cell.title.setText( data.title );
            }
        } ).appendTo( this );

        this.grid.hide();


        this.tabIOTEvents[0] = function() {
            console.log("LIGHT");
        };
        this.tabIOTEvents[1] = function() {
            console.log("OVEN");
        };
        this.tabIOTEvents[2] = function() {
            console.log("DOORLOCK");
        };
        this.tabIOTEvents[3] = function() {
            console.log("CURTAIN");
        };

    },

    // When view is created or returning to view the view is updated
    updateView: function() {
        if ( !this.firstTime ) {
            this.firstTime = true;

            // Update grid with an example dataset
            this.grid.changeDataset( [
                { title: $_( 'LIGHT' ) },
                { title: $_( 'OVEN' ) },
                { title: $_( 'DOORLOCK' ) },
                { title: $_( 'CURTAIN' ) }
            ], true );
        }
    }
} );

var userSequence = [];
var sequence = [];
var turn = 1;

var launchGame = function() {

    sequence = [];

    launchTurn();

    console.log("Game Launched");
};

var launchTurn = function() {
    simonView.grid.hide();
    sequence.push(Math.floor(Math.random()*4));
    var timeout = 2000 - (Math.min(Math.floor((sequence.length - 1) / 5), 3) * 500);

    for(var i = 0, c = sequence.length ;  i < c ; i++) {
        setTimeout(function(index) {
            simonView.tabIOTEvents[sequence[index]]();

        }, timeout * (i+1), i);
    }
    setTimeout(playerTurn, timeout * sequence.length + 500);
};

var playerTurn = function() {
    userSequence = [];
    simonView.grid.show();
    simonView.grid.focus();

};

var checkLastElement = function() {
    var lastElement = userSequence.length -1;
    if(userSequence[lastElement] !== sequence[lastElement]) {
        console.log("PERDU");
        resetGame();
    } else {
        console.log("GOOD");
        if(userSequence.length === sequence.length) {
            launchTurn();
        }
    }
};

var resetGame = function() {
    userSequence = [];
    sequence = [];
    turn = 1;
    simonView.grid.hide();
    simonView.launchButton.toggleDisabled();
    simonView.launchButton.focus();
};
