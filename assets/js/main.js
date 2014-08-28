$(function() {
  var email_data = [{}, {}], // Array of objects (columns) which graphs pull email data from
      root_url = "http://localhost:8000",
      API = {
        CLIENT_ID: "uuty35eu3mfsbqtdc63p7233",
        CLIENT_SECRET: "JPCquFKDbT2P7unmXg9K37jn",
        AUTH_CODE: getParameterByName('code'),
        ACCESS_TOKEN: getParameterByName('access_token'),
        MESSAGES: null,
        AUTH_URL: "https://vrapi.verticalresponse.com/api/v1/oauth/authorize?client_id=uuty35eu3mfsbqtdc63p7233&redirect_uri=http://localhost:8000/index.html",
        ACCESS_TOKEN_URL: "https://vrapi.verticalresponse.com/api/v1/oauth/access_token?client_id=uuty35eu3mfsbqtdc63p7233&client_secret=JPCquFKDbT2P7unmXg9K37jn&redirect_uri=http://localhost:8000/index.html",
        MESSAGES_URL: "https://vrapi.verticalresponse.com/api/v1/messages?type=standard&message_type=email&status=delivered",
        STATS_URL: "https://vrapi.verticalresponse.com/api/v1/messages/emails/"
      };

  if (!API.AUTH_CODE && !API.ACCESS_TOKEN) {
    // No auth code present, send to auth URL
    $('body').html("<center><h1>Authenticating...</h1></center>");
    window.location = API.AUTH_URL;
  } else if (API.AUTH_CODE) {
    $('body').html("<center><h1>Reticulating splines...</h1></center>");
    // Auth code is present, get access token
    var get_access_token_url = API.ACCESS_TOKEN_URL + '&code=' + API.AUTH_CODE;
    $.get(get_access_token_url, function (data) {
      window.location = root_url + "/index.html?access_token=" + data.access_token;
    });
  } else if (API.ACCESS_TOKEN) {
    // Access token is present, fire up the app
    getMessages();
  }

  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function getMessages () {
    $.ajax({
      url: API.MESSAGES_URL + '&access_token=' + API.ACCESS_TOKEN
    })
      .done(function (data) {
        API.MESSAGES = data.items.map(function (message) {
          return message.attributes;
        });
        populateMessageDropdowns(data.items);
      });
  }

  function populateMessageDropdowns (messages) {
    var dropdowns = $('.select-message');
    dropdowns.each(function() {
      var dropdown = $(this);
      messages.forEach(function(message) {
        var messageName = message.attributes.name,
            messageId = message.attributes.id;
        dropdown.append("<option value='" + messageId + "'>" + messageName + "</option>")
      });
    });
  }

  $('.select-message').change(function (event) {
    var dropdown = $(this),
        column = dropdown.attr('data-column'),
        selectedMessageId = parseInt(dropdown.val()),
        message = _.where(API.MESSAGES, {"id": selectedMessageId})[0];

    if (message) {
      $($('.dataMessageName')[column]).html(message.name);
      $($('.dataMessageSubject')[column]).html(message.subject);
    }

    fetchLists(selectedMessageId, function (lists) {
      lists.forEach(function (list) {
        var listsContainer = $($('.dataMessageLists')[column]);
        listsContainer.append(list.name + "<span class='listSize'></span>");
      });
    });

    fetchStats(selectedMessageId, function (stats) {
      // Got stats
      console.log('Got stats', stats);
      updateDonut('opens', parseInt(column) + 1, stats.opens, stats.open_rate, stats.reach);
      updateDonut('clicks', parseInt(column) + 1, stats.clicks, stats.click_rate, stats.reach);
      updateDonut('bounces', parseInt(column) + 1, stats.bounces, stats.bounce_rate, stats.reach);
      updateDonut('unsub', parseInt(column) + 1, stats.unsubscribes, stats.unsubscribe_rate, stats.reach);
    });
  });

  function fetchStats (emailId, callback) {
    var stats_url = API.STATS_URL + emailId + '/stats?access_token=' + API.ACCESS_TOKEN;
    $.get(stats_url)
      .done(function (data) {
        callback(data.attributes);
      });
  }

  function fetchLists (emailId, callback) {
    var lists_url = API.STATS_URL + emailId + '/lists?access_token=' + API.ACCESS_TOKEN;
    $.get(lists_url)
      .done(function (data) {
        callback(data.items.map(function (list) {
          return list.attributes;
        }));
      });
  }

  function updateDonut (donutName, column, value, percent, reach) {
    var donut = d3.select("#donut_" + donutName + "_" + column.toString() + " g"),
        donutText = {
          'opens':'Opens',
          'bounces': 'Bounces',
          'unsub': 'Unsubs',
          'clicks': 'Clicks'
        },
        arc = d3.svg.arc()
          .innerRadius(70)
          .outerRadius(100)
          .startAngle(0)
          .endAngle( (2*Math.PI)*(value/100) );

    donut
      .append("path")
          .attr("d", arc)
          .attr("class", "arc");

    donut
      .append("text")
        .attr("x", 0)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style({'fill':'#444444' , 'font-size':'24px'})
        .text( percent + "%");

    donut
      .append("text")
        .attr("x", 0)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .style({'fill':'#848484' , 'font-size':'18px'})
        .text(donutText[donutName]);

    donut
      .append("text")
          .attr("x", 0)
          .attr("y", 37)
          .attr("text-anchor", "middle")
          .style({'fill':'rgb(126, 126, 126)' , 'font-size':'12px', 'font-family': 'Arial'})
          .text(value + "/" + reach);
  }

});