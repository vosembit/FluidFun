        $(document).ready(function () {
            GetData();
            GetNews();
        });
        function GetNews() {
           setTimeout(GetData, 10000);
        }
        function GetData() {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var data_all = 'https://api.thingspeak.com/channels/262211/fields/1.json?start=2019-10-05%2000:00:00&offset=3';
            var data_today = 'https://api.thingspeak.com/channels/262211/fields/1.json?start=' + date + '%2000:00:00&offset=3';
            var data_age = 'https://api.thingspeak.com/channels/262211/fields/1/last_data_age.json';
            $.ajax({
                url: data_all,
                type: 'GET',
                contentType: "application/json",
                success: function (data, textStatus, xhr) {
                    $.each(data, function (i, item) {
                        if (i == 'feeds') {
                            var users = 0;
                            var ubound = item.length;
                            for (var i = 0; i < item.length; i++) {
                                var s = parseInt(item[i].field1);
                                users = users + s;
                            }
                            var last_time = new Date(item[ubound - 1].created_at);
                            var last_date = last_time.getHours() + ':' + last_time.getMinutes();
                            $('#lastent_val').text(item[ubound - 1].field1);
                            $('#lastent_time').text(last_date);
                            $('#ent_size').text(ubound);
                            $('#all_users').text(users);
                        }
                    });
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
            $.ajax({
                url: data_today,
                type: 'GET',
                contentType: "application/json",
                success: function (data, textStatus, xhr) {
                    $.each(data, function (i, item) {
                        if (i == 'feeds') {
                            var users_t = 0;
                            for (var i = 0; i < item.length; i++) {
                                var s = parseInt(item[i].field1);
                                users_t = users_t + s;
                            }
                            $('#all_users_today').text(users_t);
                        }
                    });
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
            $.ajax({
                url: data_age,
                type: 'GET',
                contentType: "application/json",
                success: function (data, textStatus, xhr) {
                    var age = parseInt(data.last_data_age);
                    $('#last_session_age').text((age / 60).toFixed());
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
            setTimeout(GetData, 60000);
        }


        //последняя запись
        //https://api.thingspeak.com/channels/262211/fields/1/last.json

        //время с момента последней публиации
        //https://api.thingspeak.com/channels/262211/fields/1/last_data_age.json

        //все записи
        //https://api.thingspeak.com/channels/262211/fields/1.json?results=100

        //все записи с 05.10.2019
        //https://api.thingspeak.com/channels/262211/fields/1.json?start=2019-10-05%2000:00:00&offset=3
