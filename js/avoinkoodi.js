'use strict';

(function ($) {
  var $projects = $("#projects");
  $projects.html("<tr><td colspan='4'>Ladataan sisältöä...</td></tr>");
  var $eduprojects = $("#eduprojects");
  $eduprojects.html("<tr><td colspan='4'>Ladataan sisältöä...</td></tr>");
  var $municipalityprojects = $("#municipalityprojects");
  $municipalityprojects.html("<tr><td colspan='4'>Ladataan sisältöä...</td></tr>");
	
	// Load projects

    $.getJSON("projects.json", function(data) {
        $projects.html("");
        data.projects.sort(function(a, b) {
            var ownerA = a.owner.toLowerCase();
            var ownerB = b.owner.toLowerCase();
            return ownerA.localeCompare(ownerB);
        });

        var content = data.projects.map(function (project) {
            var codeUrl = '-',
                serviceUrl = '-',
                demoUrl = '-';

            if (project.code_url.length > 1) {
                codeUrl = "<a href='" + $("<td>").text(project.code_url).html() + "'>Näytä lähdekoodi &raquo;</a>";
            }

            if (project.service_url.length > 1) {
                serviceUrl = "<a href='" + $("<td>").text(project.service_url).html() + "'>Siirry palveluun &raquo;</a>";
            }
            if (project.demo_url.length > 1) {
            demoUrl = "<a href='" + $("<td>").text(project.demo_url).html() + "'>Siirry demoon &raquo;</a>";
            }

            return "<tr>" +
                    "<td>" + $("<td>").text(project.owner).html() + "</td>" +
                    "<td>" + $("<td>").text(project.project).html() + "</td>" +
                    "<td>" + codeUrl + "</td>" +
                    "<td>" + serviceUrl + "</td>" +
                    "<td>" + demoUrl + "</td>" +
                    "</tr>";
        });

        $projects.html(content.join(""));
    });

    $.getJSON("eduprojects.json", function(data) {
        $eduprojects.html("");
        data.eduprojects.sort(function(a, b) { 
            var ownerA = a.owner.toLowerCase();
            var ownerB = b.owner.toLowerCase();
            return ownerA.localeCompare(ownerB);
        });

        var content = data.eduprojects.map(function (project) {
            var codeUrl = '-',
                serviceUrl = '-',
                demoUrl = '-';

            if (project.code_url.length > 1) {
                codeUrl = "<a href='" + $("<td>").text(project.code_url).html() + "'>Näytä lähdekoodi &raquo;</a>";
            }

            if (project.service_url.length > 1) {
                serviceUrl = "<a href='" + $("<td>").text(project.service_url).html() + "'>Siirry palveluun &raquo;</a>";
            }
            if (project.demo_url.length > 1) {
            demoUrl = "<a href='" + $("<td>").text(project.demo_url).html() + "'>Siirry demoon &raquo;</a>";
            }

            return "<tr>" +
                    "<td>" + $("<td>").text(project.owner).html() + "</td>" +
                    "<td>" + $("<td>").text(project.project).html() + "</td>" +
                    "<td>" + codeUrl + "</td>" +
                    "<td>" + serviceUrl + "</td>" +
                    "<td>" + demoUrl + "</td>" +
                    "</tr>";
        });

        $eduprojects.html(content.join(""));
    });

  
    $.getJSON("municipalityprojects.json", function(data) {
        $municipalityprojects.html("");
        data.municipalityprojects.sort(function(a, b) { 
            var ownerA = a.owner.toLowerCase();
            var ownerB = b.owner.toLowerCase();
            return ownerA.localeCompare(ownerB);
        });

        var content = data.municipalityprojects.map(function (project) {
            var codeUrl = '-',
                serviceUrl = '-',
                demoUrl = '-';

            if (project.code_url.length > 1) {
                codeUrl = "<a href='" + $("<td>").text(project.code_url).html() + "'>Näytä lähdekoodi &raquo;</a>";
            }

            if (project.service_url.length > 1) {
                serviceUrl = "<a href='" + $("<td>").text(project.service_url).html() + "'>Siirry palveluun &raquo;</a>";
            }
            if (project.demo_url.length > 1) {
            demoUrl = "<a href='" + $("<td>").text(project.demo_url).html() + "'>Siirry demoon &raquo;</a>";
            }

            return "<tr>" +
                    "<td>" + $("<td>").text(project.owner).html() + "</td>" +
                    "<td>" + $("<td>").text(project.project).html() + "</td>" +
                    "<td>" + codeUrl + "</td>" +
                    "<td>" + serviceUrl + "</td>" +
                    "<td>" + demoUrl + "</td>" +
                    "</tr>";
        });

        $municipalityprojects.html(content.join(""));
    });

  // Register events

	$('.menuicon').click(function() {
	   $( '.menu-container' ).toggleClass('opened'); 
	});
	
	$('#mainmenu a').click(function(){
	  $('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top - 50
	  }, 500); 
  
	  return false;
	});

	$('.share-link').click(function(ev) {
		window.open(this.href, 'share', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
		ev.preventDefault();
		return false;
	});

	// Get FB shares

	$.get('http://graph.facebook.com/?id=http://www.avoinkoodi.fi',
		function(data) {
			if (data.shares) {
				$('#fb-share-count').text(data.shares);			
			}
		}
	);

	// Get G+ shares

	$.ajax({
		type: 'POST',
		url: 'https://clients6.google.com/rpc',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify([{
	    'method': 'pos.plusones.get',
	    'id': 'p',
	    'params':{
        'nolog': true,
        'id': 'http://www.avoinkoodi.fi/',
        'source': 'widget',
        'userId': '@viewer',
        'groupId': '@self'
        },
	    'jsonrpc': '2.0',
	    'key': 'p',
	    'apiVersion': 'v1'
		}]),
		success: function(data) {
			var plusOnes = data[0].result.metadata.globalCounts.count;
			if (plusOnes) {
				$('#gplus-share-count').text(plusOnes);
			}
		}
    });
})(jQuery);
