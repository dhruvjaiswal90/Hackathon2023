(function ($, elementor) {
	"use strict";

	var ElementsKit_Pro = {

		init: function () {

			var widgets = {
				'elementskit-blog-posts.default': ElementsKit_Pro.BlogPosts,
			};
			$.each(widgets, function (widget, callback) {
				elementor.hooks.addAction('frontend/element_ready/' + widget, callback);
			});
		},



    
        

		BlogPosts: function ($scope) {
			var navigation_container = $scope.find('.ekit-blog-post-pagination-container');
			var id = $scope.data('id');
			var container = {
				'items' : '#post-items--' + id,
				'nagivation' : '#post-nagivation--' + id,
			}

			$scope.on('click', '.ekit-blog-post-pagination-container a.page-numbers', function(e){
				e.preventDefault();
				var link = $(this).attr('href');

				$.ajax({
					url: link,
				}).done(function(result) {
					var content = $( result );
					var HTMLitems = content.find(container.items).html();
					var HTMLnagivation = content.find(container.nagivation).html();

					if('loadmore' == navigation_container.data('ekit-blog-post-style')){
						$scope.find(container.items).append(HTMLitems);
					}else{
						$scope.find(container.items).html(HTMLitems);
					}

					$scope.find(container.nagivation).html(HTMLnagivation);
				});
			});
        },
        
        BlogPostsMasonry: function($scope){


        }

	};
	$(window).on('elementor/frontend/init', ElementsKit_Pro.init);


}(jQuery, window.elementorFrontend));
