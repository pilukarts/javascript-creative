refresh(dc, width, height) // Sample code by Jim Bumgardner
{
  dc.clearRect(0,0,width,height);
  
  dc.fillStyle='#000';
  var nbr_circles = 200;
  var deviation = 5/8.0;
  
  var phi = (Math.sqrt(5)+1)/2 - 1;            // golden ratio
  var golden_angle = phi*2*Math.PI;            // golden angle
  
  var lg_rad = width * .45;
  var lg_area = Math.pow(lg_rad,2)*Math.PI;
  
  var mean_area = lg_area / nbr_circles;
  
  var min_area = mean_area * (1-deviation);
  var max_area = mean_area * (1+deviation);
  
  var cum_area = 0;
  
  var fudge = .87; // Fudge factor, since our circles don't actually fill up space entirely.
  
  var cx = width/2;
  var cy = height/2;
  
  for (var i = 1; i <= nbr_circles; ++i) {
    dc.beginPath();
  
    var angle = i*golden_angle;
  
    var ratio = i / nbr_circles;
    var sm_area = min_area + ratio * (max_area - min_area);
    var sm_rad = Math.sqrt( sm_area / Math.PI );
  
    cum_area += sm_area;
  
    var spiral_rad = Math.sqrt( cum_area / Math.PI );
    var x = cx + Math.cos(angle) * spiral_rad;
    var y = cy + Math.sin(angle) * spiral_rad;
    dc.arc(x, y, sm_rad * fudge, 0, 2*Math.PI, false);
    dc.fill();
  }