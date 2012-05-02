var unique = function(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found,
        x, y;

    for ( x = 0; x < origLen; x++ ) {
        found = undefined;
        for ( y = 0; y < newArr.length; y++ ) {
            if ( origArr[x] === newArr[y] ) {
                found = true;
                break;
            }
        }
        if ( !found) newArr.push( origArr[x] );
    }
    return newArr;
};

function drawUniqueSubPoints(r, uniqueSubPoints) {

    /*
     * For a circle with origin(j,k), radius r, and theta t:
     * x(t) = r cos(t) + j
     * y(t) = r sin(t) + j
     *
     */

    var xOrigin = 310;
    var yOrigin = 250;
    var radius = 200;
    var theta = 360 / uniqueSubPoints.length;
    var angle = 0;

    for (var i = 0; i < uniqueSubPoints.length; i++) {

        var xOffset = radius * Math.cos(angle) + xOrigin;
        var yOffset = radius * Math.sin(angle) + yOrigin;

        r.circle(xOffset, yOffset, 50)
            .attr({fill: '#7a3e48'})
            .node.onclick = function () {
                r.clear();
            };

        r.text(xOffset, yOffset, uniqueSubPoints[i])
            .attr({
                font:'12px  "Lucida Sans Unicode", "Lucida Grande", sans-serif',
                fill:"#eecd86"
            });

        angle += (theta * 4);
    }
}

function showSubPoints(r, points) {
    var subPoints = $.map(points, function (point) {
        return point.name
            .slice(0, point.name
                .lastIndexOf('.'));
    });

    drawUniqueSubPoints(r, unique(subPoints));
}

function drawUniquePoints(r, uniquePoints, points) {
    r.circle(310, 250, 100)
        .attr({fill: '#7a3e48'})
        .node.onclick = function () {
            showSubPoints(r, points);
        };

    r.text(310, 250, uniquePoints[0])
        .attr({
            font:'24px  "Lucida Sans Unicode", "Lucida Grande", sans-serif',
            fill:"#eecd86"
        })
        .node.onclick = function () {
            showSubPoints(r, points);
        };
}

function launchCay(r) {
    r.clear();

    var client = $.reefClient({
        'server':'http://69.164.158.23:7889',
        'error_div':$('#error_div'),
        'auto_login':{
            'name':'guest', 'password':'guest'
        }
    });

    client.getPoints()
        .done(function (points) {
            var pointNames = $.map(points, function (point) {
                return point.name
                    .slice(0, point.name
                        .indexOf('.'));
            });

            drawUniquePoints(r, unique(pointNames), points);
        });
}

$(document).ready(function() {
    var r = new Raphael("container", 620, 700);

    function launchButton(r) {
        r.rect(210, 185, 200, 50, 5)
            .attr({fill: '#7a3e48'})
            .node.onclick = function() {
                launchCay(r);
            };

        r.text(310, 212, "Launch Cay")
            .attr({
                font:'24px  "Lucida Sans Unicode", "Lucida Grande", sans-serif',
                fill:"#eecd86"
            })
            .node.onclick = function() {
                launchCay(r);
            };
    }

    launchButton(r);
});
