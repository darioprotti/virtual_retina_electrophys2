$(document).ready(function(){

	// Initialize neuron
	$('#submitSeed').on('click',function () {

		var myrng;
		randomSeed = $('#nameSeed').val().toUpperCase();
		if (randomSeed.length === 0) {
			myrng = new Math.seedrandom();
			$('#initMessage').html('You are now recording from a random neuron.');
		}
		else if (randomSeed[0] === ' ' || randomSeed[randomSeed.length-1] === ' ')
		{
			alert('The neuron ID cannot start or end with a white space. Please rename your neuron.');
			return;
		}
		else {
			myrng = new Math.seedrandom(randomSeed);
			$('#initMessage').html('You are now recording from a neuron with ID: "' + randomSeed + '"');
		}
		available_indexes.push(1);available_indexes.push(4);

		// Variables that are randomized for each seed
		prefDirectionAng = Math.round(myrng()*360);
		prefDirectionRad = Math.PI*prefDirectionAng/180;
		kappa = myrng()*2.5 + 0.5;
		amplitude = myrng()*150 + 50;
		offset = myrng()*20;

		// Estimate max firing rate for scale of tuning curve graph
		var maxFiringRates = [];
		for(var i=0;i<100;i++)
		{ maxFiringRates.push(poisson(amplitude*vonMises(prefDirectionRad,prefDirectionRad,kappa)+offset));}
		maxRate = Math.max.apply(null, maxFiringRates);

		labels = {
			categories: contrast,
			colors: colors,
			labelTitle: "Contrast",
			unit: "%",
			visible: true
		};

		clearData((maxRate1*1.25),labels);
		clearData1((maxRate1*1.25),labels);
		clearDataCtst((maxRate1*1.25),labels);
		clearData3((maxRate1*1.25),labels);
		clearData4((maxRate1*1.25),labels);
	});

	$("#directionDial").knob({
		'width': 80,
		'height': 80,
		'cursor': 1,
		'thickness': 0.5,
		'angleOffset': 90,
		'angleArc': 359,
		'bgColor': "hsl(0,0%,10%)",
		'fgColor': "hsl(0,0%,90%)",
		'min': 0,
		'max': 359,
		'displayInput': false,
		'step': 30,
		'draw' : function () {
			this.i.val( (360-this.cv)%360);
		},
		'change': function(v){changeDirection(v);}
	});

	$( "#accordion" ).accordion({
		collapsible: true,
		heightStyle: "content",
		beforeActivate: function(event, ui) {
			var newIndex = $(ui.newHeader).index('h3');
			if (jQuery.inArray(newIndex, available_indexes) == -1) {
				$('<div title="Initialise your neuron first"> Please initialise your '+
				'neuron first in the "Instructions" tab. If you don\'t want to use ' +
				'your name, any string will do; or if you want a random neuron ' +
				'just leave the box blank and press the "Initialise neuron" button.</div>')
				.dialog({
					modal:true,
					close: function(){$(this).dialog('destroy').remove();}
				});
				event.preventDefault();
			}
		}
			/*else {
				var currHeader,currContent;
				// The accordion believes a panel is being opened
				if (ui.newHeader[0]) {
					currHeader  = ui.newHeader;
					currContent = currHeader.next('.ui-accordion-content');
					// The accordion believes a panel is being closed
				} else {
					currHeader  = ui.oldHeader;
					currContent = currHeader.next('.ui-accordion-content');
				}
				// Since we've changed the default behavior, this detects the actual status
				var isPanelSelected = currHeader.attr('aria-selected') == 'true';
				// Toggle the panel's header
				currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));
				// Toggle the panel's icon
				currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);
				// Toggle the panel's content
				currContent.toggleClass('accordion-content-active',!isPanelSelected);
				if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }
			}
			return false; // Cancels the default action
		}*/
	});
});