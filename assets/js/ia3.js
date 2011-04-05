/**
 *	Theme Name:		iA³
 *	Theme URI:		http://informationarchitects.jp/
 *	Author:			Information Architects,Inc
 *	Version:		1.1.A
 **/

ia3 = {
	listeners: {
		hasInitialized: function() {
			$("*:first-child").addClass("firstChild");
			$("*:last-child").addClass("lastChild");
			twttr.anywhere(function(b) {
				b("a.twooser").hovercards({
					username: function(a) {
						return a.text;
					}
				});
				b("img.twooser").hovercards({
					username: function(a) {
						return a.alt;
					}
				});
			});
			$(document).trigger("CORE:HAS_RESIZED");
		},
		hasResized: function() {
			var b = $(document).width();
			if (b > 1024) {
				if (typeof $.fancybox == "function") {
					$(".containsGallery a,.eStore-thumbnail a, a.enlarge").fancybox();
				}
				if ($("#screen > header > form").length == 1) {
					$("#screen > header > form").remove();
				}
			} else {
				if (typeof $.fancybox == "function") {
					$(".containsGallery a,.eStore-thumbnail a, a.enlarge").unbind("click.fb");
				}
				if ($("#screen > header > form").length == 0) {
					$("#footerOne > li:nth-child(1) > form").clone().insertBefore("#screen > header > h1");
				}
				if (b > 595) {
					if ($("#screen > header > form fieldset").length == 2) {
						$("#screen > header > form fieldset:nth-child(2)").remove();
					}
				} else {
					if ($("#screen > header > form fieldset").length == 1) {
						$("#screen > header > form").append('<fieldset><label for="mobile-menu"></label><select id="mobile-menu"><option value="' + window.BASE_URL + '">Home</option></select><select id="mobile-lang"></select></fieldset>');
						$("#screen > header > nav > ul").each(function(f) {
							var a = $(this),
								e = f + 1;
							$("li li a", a).each(function() {
								if ($(this).parent().is("strong")) {
									$("#screen > header > form select:nth-of-type(" + e + ")").append('<option selected value="' + $(this).attr("href") + '">' + $(this).text() + "</option>");
								} else {
									$("#screen > header > form select:nth-of-type(" + e + ")").append('<option value="' + $(this).attr("href") + '">' + $(this).text() + "</option>");
								}
							});
						});
						$("#mobile-lang, #mobile-menu").change(function() {
							window.location.href = $(this).val();
						});
					}
				}
			}
		},
	}
};
$(document).bind("CORE:HAS_INITIALIZED", ia3.listeners.hasInitialized).bind("CORE:HAS_RESIZED", ia3.listeners.hasResized);
