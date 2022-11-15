<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <title>F122571 Wedding Php</title>
    <link rel="stylesheet" href="wedding.css">
</head>
<body>
    <div>
        <form id="form">
            <br><br><br><br>
            <span>♥WELCOME TO WEDDING VENUE PARADISE♥</span><br>
            <label for="partysize" id="label">Party Size</label><br>
            <input type="number" id="partysize" name="partysize" value="1" min="1" required><br>
            <label for="startdate" id="label">Select Start Date </label><br>
            <input type="date" id="startdate" name="startdate" value="2022-01-01"><br>
            <label for="enddate" id="label">Select End Date</label><br>
            <input type="date" id="enddate" name="enddate" value="2022-01-01" required><br>
            <label for="grade" id="label">Select Catering Grade</label><br>
            <select id="grade" name="grade">
                <option value="1">Catering grade 1</option>
                <option value="2">Catering grade 2</option>
                <option value="3">Catering grade 3</option>
                <option value="4">Catering grade 4</option>
                <option value="5">Catering grade 5</option>
            </select><br><br>
            <button id="check" type="submit">Check Venue Availability</button>
            <br><br>
        </form>
        <br><br><br><br><br><br><br><br>
        <div id="result"></div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="weddingAjaxScript.js"></script>
</body>
</html>