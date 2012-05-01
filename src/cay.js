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

    xOrigin = 310;
    yOrigin = 212;
    radius = 200;
    theta = 360 / uniqueSubPoints.length;
    angle = 0;

    for (i = 0; i < uniqueSubPoints.length; i++) {

        xOffset = radius * Math.cos(angle) + xOrigin;
        yOffset = radius * Math.sin(angle) + yOrigin;

        r.circle(xOffset, yOffset, 50).attr({fill: '#7a3e48'}).node.onclick = function () {
            r.clear();
        };
        r.text(xOffset, yOffset, uniqueSubPoints[i])
            .attr({font:'12px  "Lucida Sans Unicode", "Lucida Grande", sans-serif', fill:"#eecd86"});

        angle += (theta * 4);
    }
}

function drawUniquePoints(r, uniquePoints, points) {
    r.circle(310, 212, 100).attr({fill: '#7a3e48'}).node.onclick = function () {

        var subPoints = $.map(points, function (point) {
            return point.name.slice(0, point.name.lastIndexOf('.'));
        });

        drawUniqueSubPoints(r, unique(subPoints));
    };
    r.text(310, 212, uniquePoints[0])
        .attr({font:'24px  "Lucida Sans Unicode", "Lucida Grande", sans-serif', fill:"#eecd86"});
}

$(document).ready(function() {
    var r = new Raphael("container", 619, 719),
        dashed = {fill: "none", stroke: "#666", "stroke-dasharray": "- "};

    function launchButton() {
        r.rect(210, 185, 200, 50, 5).attr({fill: '#7a3e48'}).node.onclick = function () {
            r.clear();

            var client = $.reefClient({
                'server':'http://69.164.158.23:7889',
                'error_div':$('#error_div'),
                'auto_login':{
                    'name':'guest', 'password':'guest'
                }
            });

            client.getPoints().done(function (points) {
                var pointNames = $.map(points, function (point) {
                    return point.name.slice(0, point.name.indexOf('.'));
                    //return point.name
                });

            drawUniquePoints(r, unique(pointNames), points);

                /*
                 if (pointNames.length > 0) {
                 $('#data_div').displayMeasurements({
                 'client':client,
                 'point_names':pointNames,
                 'polling':{'enabled':false, 'period':1000}
                 });
                 } */
            });
        };
        r.text(310, 212, "Launch Cay")
            .attr({font:'24px  "Lucida Sans Unicode", "Lucida Grande", sans-serif', fill:"#eecd86"});
    }

    launchButton();
});
