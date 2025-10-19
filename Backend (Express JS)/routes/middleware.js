module.exports = {
    timeStamp: function() {
        let date_ob = new Date();


        let date = ("0" + date_ob.getDate()).slice(-2);
      
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      
        let year = date_ob.getFullYear();
      
        let hours = date_ob.getHours();
        if (hours<10) {
          hours = ("0" + hours).slice(-2);
        }
        
        let minutes = date_ob.getMinutes();
        if (minutes<10) {
          minutes = ("0" + minutes).slice(-2);
        }
        
        let seconds = date_ob.getSeconds();
        if (seconds<10) {
          seconds = ("0" + seconds).slice(-2);
        }
      
        let timeS = year + "" + month + "" + date + "" + hours + "" + minutes + "" + seconds

        return timeS;
    z}
}

