<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Two Owls Cafe</title>
<style type='text/css'>
    html,body,select {font-size: 25px;}
</style>
</head>

<body>
    <h1>Two Owls Cafe</h1>
    Your order form has been submitted. <br />
</body>

<?php
    //hotdog $5
    $item1 = $_REQUEST["1"];
    $item1Total= $item1*5;
    //fries $3
    $item2 = $_REQUEST["2"];
    $item2Total= $item2*3;
    //cheesey $5
    $item3 = $_REQUEST["3"];
    $item3Total= $item3*5;
    //milkshake $7
    $item4 = $_REQUEST["4"];
    $item4Total= $item4*7;

    $subtotal = $item1Total + $item2Total + $item3Total + $item4Total;
    $tax = round($subtotal*.0625, 2);
    $total = $subtotal + $tax;

    $str = "$item1 Hotdog(s): $$item1Total.00<br/ >";
    $str .= "$item2 French Fries: $$item2Total.00<br/ >";
    $str .= "$item3 Cheese Fries: $$item3Total.00<br/ >";
    $str .= "$item4 Milkshake(s): $$item4Total.00<br/ >";
    $str .= "Subtotal: $$subtotal.00<br/ >";
    $str .= "Tax: $$tax<br />";
    $str .= "Total: $$total<br />";
    $str .= "Your order will be ready for pickup at";

    echo $str;
?>

<script>
    function pickupTime() {
		var now = new Date();
		var date = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		if ((minutes + 15) >= 60) {
			minutes = (minutes + 15) - 60;
			hours = hours + 1;
		}
		else {
			minutes = minutes + 15;
		}
		var time = hours + ":" + minutes;
		return time;
	}
    var time = pickupTime();
    document.write(time);
</script>

</html>
