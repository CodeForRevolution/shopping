*This project is about dropdown list on hovering the the dropdown list will appear and clicking on the item that list will be disappear 

*first thing first we have taken a toggle variable which will store the bollean value wheather to show dropdown item or not acording to true or false  intially it will false because we dont want to show list when render the app it wil appear on hover

*so we have taken two event in react mouseon and onclick which will show the item list by making tooggle to true when the showdropdown wil call

*onclick we are taking for mobile app becuase they dont support hover

*we also making the stoppropagation method to stop the propagation to the parent element

*when use will click on other part of document rather than drop down list it will call the hidedropdown function which wil make the toggle to false and hide the dropdown list 

*in jsx we are using conditional redering according to the the toggle 

*App supports responsive design because i have element 4 media query according to the width
