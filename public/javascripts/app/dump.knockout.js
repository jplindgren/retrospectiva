ko.bindingHandlers.dumb = {
	init: function(element, valueAccessor, allBindingsAccessor, viewmodel, bindingContext){
		var context = valueAccessor();
		var allBindings = allBindingsAccessor();

		var pre = document.create('pre');
		element.append(pre);

		var dumpJSON = ko.computed({
			read: function(){
				return ko.toJSON(context, null, 2);
			},
			disposeWhenNodeIsRemoved: element
		});	

		ko.applyBindingsToNode(pre, { text: dumpJSON } );

	}
};