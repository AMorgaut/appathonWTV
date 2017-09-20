Theme.set({
    BaseFocus: {
        styles: {
            backgroundColor: '#0000ff'
        }
    }
});


var simonView;
var SimonView = new MAF.Class( {
    ClassName: 'MainView',
    Extends: MAF.system.FullscreenView,

    initialize: function() {
        this.parent();
    },

    createView: function() {

        simonView = this;
        this.tabIOTEvents = [];

        this.observeImage = new MAF.element.Image({
            src: "Images/observeIcon.png",
            autoShow: false,
            styles: {
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                vOffset: (this.height - IMAGE_SIZE) / 2,
                hOffset: (this.width - IMAGE_SIZE) / 2,
                opacity: 0
            }

        }).appendTo(this);

        this.observeAnim = new MAF.element.Image({
            src: "Images/observeIcon.png",
            autoShow: false,
            styles: {
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                vOffset: (this.height - IMAGE_SIZE) / 2,
                hOffset: (this.width - IMAGE_SIZE) / 2,
                opacity: 0
            }

        }).appendTo(this);

        this.facepalmImage = new MAF.element.Image({
            src: "Images/facepalmIcon.png",
            autoShow: false,
            styles: {
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                vOffset: (this.height - IMAGE_SIZE) / 2,
                hOffset: (this.width - IMAGE_SIZE) / 2,
                opacity: 0
            }
        }).appendTo(this);

        this.thumbUpImage = new MAF.element.Image({
            src: "Images/thumbUpIcon.png",
            autoShow: false,
            styles: {
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                vOffset: (this.height - IMAGE_SIZE) / 2,
                hOffset: (this.width - IMAGE_SIZE) / 2,
                opacity: 0
            }
        }).appendTo(this);

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

        this.scoreLabel = new MAF.element.Text({
            styles: {
                width: 500,
                height: 150,
                hOffset: (this.width - 500) / 2,
                vOffset: (this.height / 4) - 200,
                color: '#6666ff',
                fontSize: 50,
                anchorStyle: 'center',
                wrap: true,
            }
        }).appendTo(this);

        this.grid = new MAF.control.Grid( {
            guid: 'myControlGrid',
            rows: 2,
            columns: 2,
            styles: {
                width: this.width / 2,
                height: this.height / 2,
                vOffset: this.height / 4,
                hOffset: this.width / 4,
                opacity: 0
            },
            cellCreator: function() {
                // Create cells for the grid
                var cell = new MAF.control.GridCell( {
                    styles: this.getCellDimensions(),
                    events: {
                        onSelect: function () {
                            simonView.tabIOTEvents[this.getCellIndex()]();
                            userSequence.push(this.getCellIndex());
                            if(checkLastElement()) {
                                this.title.animate({
                                    scale: 2,
                                    duration: 0.15,
                                    events: {
                                        onAnimationEnded: function() {
                                            this.animate({
                                                scale: 1,
                                                duration: 0.15
                                            });
                                        }
                                    }
                                });
                            }
                        },
                        onFocus: function() {
                            this.title.animate({
                                duration: 0.5,
                                scale: 1.2
                            });
                        },
                        onBlur: function() {
                            this.title.animate({
                                duration: 0.5,
                                scale: 1
                            });
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
        this.scoreLabel.hide();

        this.tabIOTEvents[0] = function() {
            console.log("BLUE LIGHT");
            Lights.switchOn(1, undefined, 46920, 254, false);
            setTimeout(Lights.switchOff, 2000, 1);
        };
        this.tabIOTEvents[1] = function() {
            console.log("FAN");
            Fan.startFan();
            setTimeout(Fan.stopFan, 3500);
        };
        this.tabIOTEvents[2] = function() {
            console.log("RED LIGHT");
            Lights.switchOn(3, undefined, 65535, 254, false);
            setTimeout(Lights.switchOff, 2000, 3);
        };
        this.tabIOTEvents[3] = function() {
            console.log("CURTAIN");
            Curtains.openCurtains();
             setTimeout(Curtains.closeCurtains, 1000);
             setTimeout(Curtains.stopCurtains, 2000);
        };

    },

    // When view is created or returning to view the view is updated
    updateView: function() {
        if ( !this.firstTime ) {
            this.firstTime = true;

            // Update grid with an example dataset
            this.grid.changeDataset( [
                { title: $_( 'BLUE LIGHT' ) },
                { title: $_( 'FAN' ) },
                { title: $_( 'RED LIGHT' ) },
                { title: $_( 'CURTAIN' ) }
            ], true );
        }
        this.scoreLabel.setText(turn);
    }
} );

var userSequence = [];
var sequence = [];
var turn = 1;
var IMAGE_SIZE = 300;

var launchGame = function() {
    sequence = [];
    simonView.scoreLabel.show();
    launchTurn();
    console.log("Game Launched");
};

var launchTurn = function() {
    simonView.thumbUpImage.animate({
        opacity: 0,
        duration: 0.5
    });
    simonView.observeImage.animate({
        opacity: 1,
        duration: 0.5,
        events: {
            onAnimationEnded: function() {
                simonView.observeAnim.animate({
                    opacity: 1,
                    duration: 0
                });
            }
        }
    });
    sequence.push(2);//Math.floor(Math.random()*4));
    var timeout = 3000;// - (Math.min(Math.floor((sequence.length - 1) / 5), 3) * 750);

    setTimeout(playObject, 500, 0);

    for(var i = 1, c = sequence.length ;  i < c ; i++) {
        setTimeout(playObject, timeout * (i+1), i);
    }
    setTimeout(playerTurn, timeout * sequence.length + 500);
};

var playObject = function(index) {
    simonView.tabIOTEvents[sequence[index]]();
    simonView.observeAnim.animate({
        duration: 0,
        opacity: 1,
        events: {
            onAnimationEnded: function() {
                simonView.observeAnim.animate({
                    duration: 1,
                    scale: 2,
                    opacity: 0,
                    events: {
                        onAnimationEnded: function () {
                            simonView.observeAnim.animate({
                                duration: 0,
                                scale: 1,
                                opacity: 0
                            });
                        }
                    }
                });
            }
        }
    });

};

var playerTurn = function() {
    userSequence = [];
    simonView.observeAnim.animate({
        opacity: 0,
        duration: 0
    });
    simonView.observeImage.animate({
        opacity: 0,
        duration: 0.5
    });
    simonView.grid.show();
    simonView.grid.animate({
        opacity: 1,
        duration: 0.5,
        events: {
            onAnimationEnded: function() {
                simonView.grid.focus();
                simonView.grid.focusCell(0);
            }
        }
    });
};

var checkLastElement = function() {
    var lastElement = userSequence.length -1;
    if(userSequence[lastElement] !== sequence[lastElement]) {
        console.log("PERDU");
        resetGame();
        return false;
    } else {
        console.log("GOOD");
        if(userSequence.length === sequence.length) {
            turn += 1;
            simonView.scoreLabel.setText(turn);
            Lights.flickerAll(25500, 2, 800);
            simonView.grid.animate({
                opacity: 0,
                duration: 0.5,
                events: {
                    onAnimationEnded: function() {
                        simonView.grid.hide();
                    }
                }
            });
            simonView.thumbUpImage.animate({
                opacity: 1,
                duration: 0.5
            });
            setTimeout(launchTurn, 5000);
        }
        return true;
    }
};

var resetGame = function() {
    userSequence = [];
    sequence = [];
    simonView.scoreLabel.hide();
    simonView.grid.animate({
        opacity: 0,
        duration: 0.5,
        events: {
            onAnimationEnded: function () {
                simonView.grid.hide();
                simonView.scoreLabel.setText("Oh noes, you lost ! You scored " + turn + " point"+ (turn > 1 ? "s" : ""));
                simonView.scoreLabel.show();
                turn = 1;
                simonView.facepalmImage.animate({
                    opacity: 1,
                    duration: 0.5
                });
            }
        }
    });

    Lights.flickerAll(65535, 2, 800);
    setTimeout(function() {
        simonView.facepalmImage.animate({
            opacity: 0,
            duration: 0.5
        });
        simonView.launchButton.toggleDisabled();
        simonView.launchButton.focus();
        simonView.scoreLabel.hide();
        simonView.scoreLabel.setText(turn);
    }, 5000);
};
