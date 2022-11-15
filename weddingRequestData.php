<?php
$servername = "sci-mysql";
$username = "coa123wuser";
$password = "grt64dkh!@2FD";
$dbname = "coa123wdb";
$venueDetailsArray=array();
$date= trim($_POST['date']);
$partysize = trim($_POST['partysize']);
$cateringgrade = trim($_POST['grade']);
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
$sql="SELECT  v.name,v.capacity,v.licensed,c.cost,v.weekend_price,v.weekday_price,COUNT(vb.booking_date) number_of_bookings
FROM venue v
INNER JOIN catering c
	on v.venue_id = c.venue_id
INNER JOIN venue_booking vb
	ON v.venue_id = vb.venue_id
WHERE c.grade =$cateringgrade
and v.capacity >=$partysize
and NOT EXISTS(SELECT vb.venue_id FROM venue_booking vb
                 WHERE vb.booking_date = '$date'
                 AND vb.venue_id = v.venue_id)
GROUP BY v.venue_id,v.capacity,v.licensed,c.cost,v.weekend_price,v.weekday_price
ORDER BY c.venue_id ASC
";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0){
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

 $data["name"]= $row["name"];
 $data["capacity"]= $row["capacity"];
  $data["licensed"]= $row['licensed'];
 $data["weekend_price"]= $row["weekend_price"];
  $data["weekday_price"]= $row["weekday_price"];
 $data["number_of_bookings"]= $row["number_of_bookings"];
 $data['cost']=$row['cost'];
 $data['date']=$date;
 $venueDetailsArray[] = $data;
}
}
echo json_encode($venueDetailsArray);
mysqli_close($conn);
?>