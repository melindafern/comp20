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

<?php
    echo "<div>";
    //establish connection info
    $server = "localhost";
    $userid = "utw00lrxbefdm";
    $pw = "&1811d%tg)5*";
    $db= "db1qqwlgoegd0p";

    // Create connection
    $conn = new mysqli($server, $userid, $pw );

    //select database
    $conn->select_db($db);
    
        //check connection
        if ($conn->connect_error) {
            echo $conn->connect_error;
        }

    $sql = "select * from menu_items";
    // echo "<br />The query is: " . $sql ."<br />";
    $result = $conn->query($sql);
    
    echo "<form method='get' action ='process.php' onsubmit = 'return validateForm()'>
        <table border = 0 cellpadding = 3>";
    while($row = $result->fetch_assoc()) {
        $id = $row["id"];
        $itemName = $row["itemName"];
        $cost = $row["cost"];
        $image = $row["image"];
        console.log($image);
        echo "<tr>"
        . "<th>" . $itemName . " $" . $cost . "<th>" . 
        "<img src='$image' alt='image' width=100px>"
        . "<th>
                <select name='$id'>
                    <option value='0'>0</option>   
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                </select>
            <th>
        <tr><br />";
    }
    echo "</table>";

     //close the connection 
     $conn->close();

     // echo "success - 2!";
     echo "</div>";
    ?>
    
    <label for='name'>First and Last Name</label> <input type='text' id='name' name='name'> <br />
    <label for='special'>Special Instructions</label> <input type='text' id='special' name='special'> <br />
    <input type ='submit'>
    </form>

    <h4>Cafe Hours: 7pm-2pm daily</h4>

</body>
<script>
    //form elements
    const form = document.getElementsByTagName("form")[0];
    
    //array of select option for each form item
    const itemQuant = [form["0"], form["1"], form["2"], form["3"]];
    
    //name that the customer inputs
    const name = document.getElementsByName("name");

    // Function: validateForm()
	// Purpose: 
	// Description:
	// Input: N/a
	// Output: 
    function validateForm() {
        if (itemQuant[0].value == 0 && itemQuant[1].value == 0 && itemQuant[2].value == 0 && itemQuant[3].value == 0){
            alert("Please order at least one item from the menu.");
            return false;
        }
        if(name[0].value == ""){
            alert("Please input a name for your order.");
            return false;
        }
        if(!openTime()){
            alert("We are not currently taking orders. Please refer to our open hours below.");
            return false;
        }
    }

    // Function: openTime()
	// Purpose: 
	// Description:
	// Input: N/a
	// Output: 
    function openTime() {
        console.log("operating");
        // var now = new Date();
        // var hours = now.getHours();
        // var minutes = now.getMinutes();
        var hours = 20;
        var minutes = 15;
        // CHANGE THIS LATER!!
        //no earlier than 18:45PM and no later than 13:45PM
        if((hours <= 17) && (hours >= 14)){
            return false;
        }
        else if (hours == 18) {
            if (minutes < 45) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (hours == 13) {
            if (minutes > 45) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    }

</script>
</html>